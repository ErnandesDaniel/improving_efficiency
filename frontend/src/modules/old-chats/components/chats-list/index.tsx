'use client'
import React, {useCallback, useMemo} from 'react';
import { useRouter } from 'next/navigation';
import {

    useGetGraphChatsList
} from "@/api/rest-client";
import '@/modules/chats/components/chats-list/index.scss';

import ConditionalRender from "@/components/conditional-render";
import {Button, Flex, Form, Input} from 'antd';

import ChatItem from "@/modules/chats/components/chats-list/components/chat-item";

interface FormValues {
    searchChatName: string;
}

const FORM_INITIAL_VALUES: FormValues={
    searchChatName: '',
};

const GraphChatsList= () => {

  const router = useRouter();

  const [form] = Form.useForm<FormValues>();

  const {searchChatName} = Form.useWatch(({searchChatName})=>({
      searchChatName
  }), form) ?? {
      searchChatName:'',
  };

  const {data: graphChatsList, isLoading: isLoadingGraphChatsList} = useGetGraphChatsList();

  const handleNewChatClick = useCallback(() => {
    router.push('/chats');
  },[router]);

  const filteredGraphChatsList = useMemo(()=>graphChatsList?.filter((chat) =>
      chat?.title?.toLowerCase().includes(searchChatName?.toLowerCase())
  ),[graphChatsList, searchChatName]);

  return (

    <Form form={form} initialValues={FORM_INITIAL_VALUES} className="chats_list_block">

      <Flex vertical gap={16} className="chats_list_wrapper">
          <Button type="primary" onClick={handleNewChatClick}>
              Новый чат
          </Button>

          <Form.Item name='searchChatName' className='search_chat_name'>
              <Input
                  placeholder="Search chats..."
              />
          </Form.Item>

      <div className="chats_list">
          <ConditionalRender condition={isLoadingGraphChatsList}>
              <div className="loading">Loading chats...</div>
          </ConditionalRender>
          <ConditionalRender condition={!isLoadingGraphChatsList}>
              {
                  filteredGraphChatsList?.map((chat) => (<ChatItem key={chat.id} chatData={chat}/>))
              }

          </ConditionalRender>
      </div>

      </Flex>

    </Form>

  );
};

export default GraphChatsList;