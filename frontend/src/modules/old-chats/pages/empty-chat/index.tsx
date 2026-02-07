'use client'
import React, {useCallback, useMemo, useState} from 'react';
import { useRouter } from 'next/navigation';
import '@/modules/chats/pages/empty-chat/index.scss';

import {
  getGetAllMessagesByLinearChatIdQueryKey,
  getGetGraphChatsListQueryKey,
  useCreateGraphChat,
  useGetCurrentUser
} from "@/api/rest-client";
import Textarea from "@/modules/chats/components/textarea";
import {useQueryClient} from "@tanstack/react-query";
import {Flex} from "antd";
import {isNil} from "lodash-es";
import ConditionalRender from "@/components/conditional-render";
import {GraphChatShortResponseDto, type MessageResponseDto, type MessagesPageResponseDto} from "@/api/rest-client/dto";
import {useSession} from "next-auth/react";

const EmptyChat = () => {
  const router = useRouter();
  const [messageInput, setMessageInput] = useState<string>('');

  const queryClient=useQueryClient();

  const getGraphChatsQueryKey = getGetGraphChatsListQueryKey();

  const {mutateAsync: createGraphChat, isPending: isPendingCreateGraphChat} = useCreateGraphChat({
    mutation: {
      onMutate: async () => {

        // Отменяем активные рефетчи, чтобы они не перезаписали наш стейт
        await queryClient.cancelQueries({ queryKey: getGraphChatsQueryKey });

        // Сохраняем текущий список чатов (на случай ошибки)
        const snapshotChats = queryClient.getQueryData<GraphChatShortResponseDto[]>(getGraphChatsQueryKey);

        queryClient.setQueryData<GraphChatShortResponseDto[]>(getGraphChatsQueryKey,
            (old) => [
              {
                id: Math.random() * -1,
                title: "Новый чат",
                createdAt: new Date().toISOString(),
                isLoadingLinearChatsCount: 1,
                rootLinearChatId: Math.random() * -1
              },
              ...(old || []),
            ]
        );

        // Возвращаем данные для отката
        return { snapshotChats };
      },

      onSuccess: (graphChatCreateResponseDto, variables, context) => {

        queryClient.setQueryData<GraphChatShortResponseDto[]>(getGraphChatsQueryKey, () => {

          return [{
              id: graphChatCreateResponseDto.graph.id,
              title: graphChatCreateResponseDto.graph.title,
              createdAt: graphChatCreateResponseDto.graph.createdAt,
              isLoadingLinearChatsCount: graphChatCreateResponseDto.graph.isLoadingLinearChatsCount,
              rootLinearChatId: graphChatCreateResponseDto.graph.rootLinearChatId
            },
            ...(context.snapshotChats || [])]

        });

        const getAllMessagesByLinearChatIdQueryKey=getGetAllMessagesByLinearChatIdQueryKey(graphChatCreateResponseDto.graph.rootLinearChatId);

        queryClient.setQueryData<MessageResponseDto[]>(getAllMessagesByLinearChatIdQueryKey, () => {
          return [graphChatCreateResponseDto.userMessage, graphChatCreateResponseDto.assistantPlaceholder]
        });
      },
      // Если мутация завершилась ошибкой, откатываем изменения
      onError: (err, variables, context) => {
        // В случае ошибки возвращаем старое значение
        if (context?.snapshotChats) {
          queryClient.setQueryData(getGraphChatsQueryKey, context.snapshotChats);
        }
      },

      // Всегда инвалидируем после завершения (успех или ошибка), чтобы синхронизироваться с сервером
      onSettled: () => {
        void queryClient.invalidateQueries({ queryKey: getGraphChatsQueryKey });
      },
    },

  });

  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(e.target.value);
  },[setMessageInput]);

  const handleSendMessage = useCallback(async () => {
    if (messageInput.trim()) {

      try {
        const graphChatCreateResponseDto = await createGraphChat({
            data:{
              firstMessageContent:messageInput
            }
        });

        router.push(`/chats/${graphChatCreateResponseDto.graph.id}/${graphChatCreateResponseDto.graph.rootLinearChatId}`);

        setMessageInput('');
      } catch (error) {
        console.error('Failed to create graph chat and send message:', error);
      }
    }
  },[messageInput, createGraphChat, router, setMessageInput, queryClient, getGraphChatsQueryKey]);

  const hasValidMessage = messageInput.trim().length > 0;

  const { data: session } = useSession();

  const userNameHelloText = useMemo(() => {

    if(!isNil(session)){
      return `Здравствуйте, ${session.userName}!`;
    }

    return undefined;

  },[session?.userName]);

  return (
    <div className="empty_chat_page">
      <Flex gap={24} vertical className='empty_chat_page_content'>
        <ConditionalRender condition={!isNil(userNameHelloText)}>
          <Flex vertical gap={10}>
            <p className='user_name_hello'>{userNameHelloText}</p>
            <p className='user_question'>Что будем делать сегодня?</p>
          </Flex>
        </ConditionalRender>
        <Textarea
            value={messageInput}
            onChange={handleMessageChange}
            onSend={handleSendMessage}
            isSendDisabled={!hasValidMessage || isPendingCreateGraphChat}
        />
      </Flex>
    </div>
  );
};

export default EmptyChat;