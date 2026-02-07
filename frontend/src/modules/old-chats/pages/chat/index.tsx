"use client";

import {useCallback, useState, useMemo, useRef} from "react";
import { useRouter } from "next/navigation";
import isNil from "lodash-es/isNil";
import { useQueryClient } from "@tanstack/react-query";

import "@/modules/chats/pages/chat/index.scss";

import type { VirtuosoHandle } from 'react-virtuoso';
import { Virtuoso } from 'react-virtuoso';

import {
  getGetAllMessagesByLinearChatIdQueryKey,
  getGetGraphChatsListQueryKey,
  useGetAllMessagesByLinearChatId,
  useSendMessageToExistingLinearChat,
  useGetGraphChatById, useGetLinearChatById,
  //useGetMessageGraphByGraphChatId,
  //useCreateNewLinearChatAndSendMessage,
} from "@/api/rest-client";

import {
  GraphChatShortResponseDto,
  MessageCreateRequestDtoRole,
  MessageResponseDto,
  MessageResponseDtoRole,
  LinearChatTreeNode,
} from "@/api/rest-client/dto";

import ConditionalRender from "@/components/conditional-render";
import Textarea from "@/modules/chats/components/textarea";
import MessageItem from "@/modules/chats/pages/chat/components/message-item";
import CanvasView from "@/modules/chats/pages/chat/components/canvas-view";

import useActiveGraphChatId from "@/modules/chats/hooks/useActiveGraphChatId";
import useActiveLinearChatId from "@/modules/chats/hooks/useActiveLinearChatId";
import {Flex, TreeSelect, Button} from "antd";

// Define the TreeNode type for TreeSelect
type TreeNode = {
  title: string;
  value: string;
  children?: TreeNode[];
};


const Chat = () => {

  const router = useRouter();
  const [messageInput, setMessageInput] = useState<string>('');
  const [isCanvasView, setIsCanvasView] = useState<boolean>(false);

  const activeLinearChatId = useActiveLinearChatId();
  const activeGraphChatId = useActiveGraphChatId();

  // Use the detailed graph chat data that includes the tree structure
  const { data: activeGraphChat } = useGetGraphChatById(activeGraphChatId ?? 0, {
    query: { enabled: !!activeGraphChatId },
  });

  const { data: activeLinearChat } = useGetLinearChatById(activeLinearChatId ?? 0, {
    query: { enabled: !!activeLinearChatId },
  });
  const queryClient = useQueryClient();

  const graphChatsKey = getGetGraphChatsListQueryKey();
  const messagesKey =
      getGetAllMessagesByLinearChatIdQueryKey(activeLinearChatId);

  const { data: messages, isLoading } =
      useGetAllMessagesByLinearChatId(activeLinearChatId ?? 0, {
        query: { enabled: !isNil(activeLinearChatId) },
      });

  const { mutateAsync: sendMessage } =
      useSendMessageToExistingLinearChat({
        mutation: {
          onMutate: async ({ data }) => {
            await queryClient.cancelQueries({ queryKey: messagesKey });
            await queryClient.cancelQueries({ queryKey: graphChatsKey });

            const prevMessages =
                queryClient.getQueryData<MessageResponseDto[]>(messagesKey);
            const prevChats =
                queryClient.getQueryData<GraphChatShortResponseDto[]>(graphChatsKey);

            queryClient.setQueryData(graphChatsKey, (old?: GraphChatShortResponseDto[]) =>
                old?.map(chat =>
                    chat.id === activeGraphChatId
                        ? { ...chat, isLoadingLinearChatsCount: chat.isLoadingLinearChatsCount + 1 }
                        : chat
                )
            );

            const now = new Date().toISOString();
            const tempUserId = -Date.now();
            const tempAssistantId = tempUserId - 1;

            queryClient.setQueryData<MessageResponseDto[]>(messagesKey, old => [
              ...(old ?? []),
              {
                id: tempUserId,
                linearChatId: data.linearChatId,
                content: data.content,
                role: MessageResponseDtoRole.USER,
                createdAt: now,
                updatedAt: now,
              },
              {
                id: tempAssistantId,
                linearChatId: data.linearChatId,
                content: "",
                role: MessageResponseDtoRole.ASSISTANT,
                createdAt: now,
                updatedAt: now,
              },
            ]);

            return { prevMessages, prevChats };
          },

          onSuccess: (res) => {
            queryClient.setQueryData<MessageResponseDto[]>(messagesKey, old => {
              if (!old) return [];

              const updated = [...old];
              updated[updated.length - 2] = res.userMessage;
              updated[updated.length - 1] = res.assistantMessage;

              return updated;
            });
          },

          onError: (_, __, ctx) => {
            if (ctx?.prevMessages) {
              queryClient.setQueryData(messagesKey, ctx.prevMessages);
            }
            if (ctx?.prevChats) {
              queryClient.setQueryData(graphChatsKey, ctx.prevChats);
            }
          },

          onSettled: () => {
            void queryClient.invalidateQueries({ queryKey: graphChatsKey });
          },
        },
      });

  const handleSend = useCallback(async () => {
    if (!messageInput.trim() || isNil(activeLinearChatId)) return;

    await sendMessage({
      data: {
        linearChatId: activeLinearChatId,
        content: messageInput,
        role: MessageCreateRequestDtoRole.USER,
      },
    });

    setMessageInput("");
  }, [messageInput, activeLinearChatId, sendMessage]);

  const handleSendMessage = useCallback(async () => {
    if (!messageInput.trim() || isNil(activeLinearChatId)) return;

    await sendMessage({
      data: {
        linearChatId: activeLinearChatId,
        content: messageInput,
        role: MessageCreateRequestDtoRole.USER,
      },
    });

    setMessageInput("");
  }, [messageInput, activeLinearChatId, sendMessage]);

  const isLoadingLinearChat =useMemo(()=>{

    if(isNil(activeLinearChat)){
      return false;
    }

    return activeLinearChat?.isLoading;

  },[activeLinearChat]);

  const treeData = useMemo(() => {
    // Transform the linear chat tree data for TreeSelect
    // The linearChatsTree is already a tree structure, so we just need to map it
    const transformTreeData = (nodes: LinearChatTreeNode[]): TreeNode[] => {
      return nodes.map(node => ({
        title: node.title || `Chat ${node.id}`,
        value: node.id.toString(),
        children: node.children ? transformTreeData(node.children) : [],
      }));
    };

    return activeGraphChat?.linearChatsTree
      ? transformTreeData(activeGraphChat.linearChatsTree)
      : [];
  }, [activeGraphChat]);

  const handleTreeSelectChange = useCallback((value: string) => {
    if(!isNil(activeLinearChatId) && value!=activeLinearChatId.toString()){
      router.replace(`/chats/${activeGraphChatId}/${value}`,  { scroll: false });

    }
  },[activeLinearChatId, router, activeGraphChatId]);

  const virtuosoRef = useRef<VirtuosoHandle>(null);


  const initialTopMostItemIndex=useMemo(()=>{

    if(!isNil(messages)){

      return messages?.length - 1
    }

    return 0;

  },[messages]);

  const virtuosoItemContent = useCallback((index: number, messageEl:MessageResponseDto) => (
          <MessageItem
              key={messageEl.id}
              messageData={messageEl}
              graphChatId={activeGraphChatId}
              messageInput={messageInput}
              isLastMessage={index+1 === messages?.length}
          />
  ), [messages, activeGraphChatId, messageInput]);

  return (
      <div className="chat_page">
        <Flex align="center" justify="start" className="chat_header">
          <div className="chat_title">{activeGraphChat?.title}</div>

          {treeData.length > 0 && (
            <TreeSelect
              showSearch
              style={{ width: '500px', marginLeft: '20px' }}
              value={activeLinearChatId?.toString()}
              allowClear
              treeDefaultExpandAll
              onChange={handleTreeSelectChange}
              treeData={treeData}
            />
          )}

          <Button
            onClick={() => setIsCanvasView(!isCanvasView)}
            style={{ marginLeft: '20px' }}
            type={isCanvasView ? "default" : "primary"}
          >
            {isCanvasView ? "Назад к чату" : "Перейти к холсту"}
          </Button>
        </Flex>

        {isCanvasView ? <CanvasView/> : (
          <>
            <div
                className="messages_area"
            >
              <ConditionalRender condition={isLoading}>
                <div className="loading">Loading messages…</div>
              </ConditionalRender>

              <ConditionalRender condition={!isLoading && !!messages?.length}>
                <Virtuoso
                    ref={virtuosoRef}
                    className="message_list_wrapper"
                    data={messages}
                    initialTopMostItemIndex={initialTopMostItemIndex}
                    itemContent={virtuosoItemContent}
                />
              </ConditionalRender>
            </div>

            <Textarea
                value={messageInput}
                onChange={e => setMessageInput(e.target.value)}
                onSend={handleSend}
                isSendDisabled={!messageInput.trim() || isLoadingLinearChat}
            />
          </>
        )}
      </div>
  );
};

export default Chat;
