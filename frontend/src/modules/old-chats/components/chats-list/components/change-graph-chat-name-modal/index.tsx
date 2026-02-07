import {Form, Input, Modal} from "antd";
import React, {DispatchWithoutAction, useCallback, useEffect, useMemo} from "react";
import {getGetGraphChatsListQueryKey, useRenameGraphChatById} from "@/api/rest-client";
import {useQueryClient} from "@tanstack/react-query";
import {GraphChatShortResponseDto} from "@/api/rest-client/dto";

interface FormValues {
    newChatName: string;
}

const FORM_INITIAL_VALUES: FormValues={
    newChatName: '',
};

interface ChangeGraphChatNameProps {
  isOpen: boolean;
  onClose: DispatchWithoutAction;
  graphChatId: number;
  currentChatName: string;
}

const ChangeGraphChatName = ({ onClose, isOpen, graphChatId, currentChatName}: ChangeGraphChatNameProps) => {

    const [form] = Form.useForm<FormValues>();

    const queryClient=useQueryClient();

    const getGraphChatsQueryKey =getGetGraphChatsListQueryKey();

    const {newChatName} = Form.useWatch(({newChatName})=>({
        newChatName
    }), form) ?? {
        newChatName:'',
    };

    const { mutate: changeChatName, isPending: isPendingChangeChatName } = useRenameGraphChatById({
        mutation: {
            onMutate: async ({ id, data }) => {
                // Отменяем активные рефетчи, чтобы они не перезаписали наш стейт
                await queryClient.cancelQueries({ queryKey: getGraphChatsQueryKey });

                // Сохраняем текущий список чатов (на случай ошибки)
                const snapshotChats = queryClient.getQueryData<GraphChatShortResponseDto[]>(getGraphChatsQueryKey);

                // Оптимистично обновляем название в списке
                queryClient.setQueryData<GraphChatShortResponseDto[]>(getGraphChatsQueryKey, (old) => {
                    return old?.map(chat =>
                        chat.id === id ? { ...chat, title: data.title } : chat
                    );
                });

                // Возвращаем данные для отката
                return { snapshotChats };
            },
            onError: (err, variables, context) => {
                // В случае ошибки возвращаем старое название
                if (context?.snapshotChats) {
                    queryClient.setQueryData(getGraphChatsQueryKey, context.snapshotChats);
                }
            },
        }
    });

    const afterCloseCompletelyCallback=useCallback(()=>{
        if(newChatName!==currentChatName){
            form.setFieldValue('newChatName', currentChatName);
        }
    },[form, currentChatName, newChatName]);

    const changeChatNameOnClick=useCallback(()=>{

        const newChatName=form.getFieldValue('newChatName');

        changeChatName({
            id: graphChatId,
            data: { title: newChatName }
        });
        onClose();


    },[changeChatName, graphChatId, form, onClose]);

    const modalOkButtonProps= useMemo(()=>({
        disabled:isPendingChangeChatName || newChatName?.length ==0 || newChatName===currentChatName,
    }), [newChatName, isPendingChangeChatName, currentChatName]);

    useEffect(() => {
        if(isOpen){
            form.setFieldValue('newChatName', currentChatName);
        }
    },[currentChatName, form, isOpen]);

    return (

        <Modal
            open={isOpen}
            afterClose={afterCloseCompletelyCallback}
            title='Переименовать чат?'
            onOk={changeChatNameOnClick}
            onCancel={onClose}
            okText='Изменить'
            cancelText='Отмена'
            okButtonProps={modalOkButtonProps}
        >

            <Form form={form} initialValues={FORM_INITIAL_VALUES}>

                <Form.Item name='newChatName'>
                    <Input
                        placeholder="Введите новое название для чата..."
                    />
                </Form.Item>

            </Form>

        </Modal>

    )

}

export default ChangeGraphChatName;