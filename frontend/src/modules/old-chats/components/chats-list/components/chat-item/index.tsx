import clsx from "clsx";
import {Dropdown, type MenuProps, Modal} from "antd";
import React, {Fragment, MouseEvent as MouseEventType, useCallback, useMemo} from "react";
import {useRouter} from "next/navigation";
import {GraphChatShortResponseDto} from "@/api/rest-client/dto";
import {ItemType} from "antd/es/menu/interface";
import {useBoolean} from "usehooks-ts";
import {getGetGraphChatsListQueryKey, useDeleteGraphChatById, getGetAllMessagesByLinearChatIdQueryOptions} from "@/api/rest-client";
import {useQueryClient} from "@tanstack/react-query";
import ChangeGraphChatNameModal from "@/modules/chats/components/chats-list/components/change-graph-chat-name-modal";
import useActiveGraphChatId from "@/modules/chats/hooks/useActiveGraphChatId";
import '@/modules/chats/components/chats-list/components/chat-item/index.scss'

interface ChatItemProps {
    chatData:GraphChatShortResponseDto;
}

const ChatItem=({chatData}:ChatItemProps)=>{

    const router = useRouter();

    const activeGraphChatId=useActiveGraphChatId();

    const handleChatClick = useCallback( ()=>{
        router.push(`/chats/${chatData.id}/${chatData.rootLinearChatId}`);
    },[router, chatData.id, chatData.rootLinearChatId]);

    const onClickDropdownStopPropagation=useCallback((e: MouseEventType<HTMLDivElement, MouseEvent>)=>{
        e.stopPropagation()
    },[]);

    const {setTrue: openDeleteModal, setFalse:closeDeleteModal, value: isOpenDeleteModal}=useBoolean();

    const {setTrue: openChangeGraphChatNameModal, setFalse:closeDeleteChangeGraphChatNameModal, value: isOpenChangeGraphChatNameModal}=useBoolean();

    const onOpenDeleteChatModal=useCallback<Exclude<MenuProps['onClick'], undefined>>((event)=>{
        event.domEvent.stopPropagation();
        openDeleteModal();
    },[openDeleteModal]);

    const onOpenChangeGraphChatNameModal=useCallback<Exclude<MenuProps['onClick'], undefined>>((event)=>{
        event.domEvent.stopPropagation();
        openChangeGraphChatNameModal();
    },[openChangeGraphChatNameModal]);

    const items: ItemType[] =useMemo(()=> [
        {
            key: '1',
            label: 'Переименовать',
            onClick: onOpenChangeGraphChatNameModal
        },
        {
            key: '2',
            danger: true,
            label: 'Удалить',
            onClick: onOpenDeleteChatModal
        },
    ],[onOpenChangeGraphChatNameModal, onOpenDeleteChatModal]);

    const queryClient=useQueryClient();

    const getGraphChatsQueryKey =getGetGraphChatsListQueryKey();

    const { mutate: deleteGraphChat, isPending: isPendingDeleteGraphChat } = useDeleteGraphChatById({
        mutation: {
            onMutate: async ({id}) => {
                // Отменяем активные запросы, чтобы они не перезаписали наш оптимистичный стейт
                await queryClient.cancelQueries({ queryKey: getGraphChatsQueryKey });

                // Сохраняем текущий список чатов (на случай ошибки)
                const snapshotChats = queryClient.getQueryData<GraphChatShortResponseDto[]>(getGraphChatsQueryKey);

                // Оптимистично удаляем чат из списка прямо сейчас
                queryClient.setQueryData<GraphChatShortResponseDto[]>(getGraphChatsQueryKey, (old) => {
                    return old?.filter(chat => chat.id !== id);
                });

                // Возвращаем данные для отката
                return { snapshotChats };
            },
            onError: (err, variables, context) => {
                // Если сервер ответил ошибкой, возвращаем старый список чатов
                if (context?.snapshotChats) {
                    queryClient.setQueryData(getGraphChatsQueryKey, context.snapshotChats);
                }
            },
        }
    });

    const onDeleteChat=useCallback(()=>{

        deleteGraphChat({ id: chatData.id });

        closeDeleteModal();

        if (activeGraphChatId === chatData.id){
            router.push(`/chats`);
        }

    },[deleteGraphChat, closeDeleteModal, router, activeGraphChatId, chatData.id]);

    const getAllMessagesByLinearChatIdQueryOptions = useMemo(()=>getGetAllMessagesByLinearChatIdQueryOptions(
        chatData.rootLinearChatId
    ),[chatData.rootLinearChatId]);

    const prefetchLinearChatMessages = useCallback(() => {
        void queryClient.prefetchQuery({
            ...getAllMessagesByLinearChatIdQueryOptions,
        });
    },[queryClient, getAllMessagesByLinearChatIdQueryOptions,]);


    return (

        <Fragment>

            <div

                onMouseEnter={prefetchLinearChatMessages}
                key={chatData.id}
                className={clsx('chat_item',{
                    active_chat: activeGraphChatId === chatData.id,
                    loading_chat: chatData.isLoadingLinearChatsCount>0
                })}
                onClick={handleChatClick}
            >
                <span className="chat_title">{chatData.title}</span>
                {chatData.isLoadingLinearChatsCount>0 && <div className="loading_indicator"></div>}

                <Dropdown menu={{ items }} trigger={['click']}>
                    <div className="menu_dots_container" onClick={onClickDropdownStopPropagation}>
                        <div className="menu_dots">
                            <div className="menu_dot"></div>
                            <div className="menu_dot"></div>
                            <div className="menu_dot"></div>
                        </div>
                    </div>
                </Dropdown>
            </div>

            <Modal
                open={isOpenDeleteModal}
                title='Удалить чат?'
                onOk={onDeleteChat}
                onCancel={closeDeleteModal}
                okText='Удалить'
                cancelText='Отмена'
            />

            <ChangeGraphChatNameModal
                onClose={closeDeleteChangeGraphChatNameModal}
                isOpen={isOpenChangeGraphChatNameModal}
                graphChatId={chatData.id}
                currentChatName={chatData.title}
            />

        </Fragment>

    )
}

export default ChatItem;
