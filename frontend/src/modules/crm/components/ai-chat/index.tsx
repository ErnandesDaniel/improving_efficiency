'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  Input,
  Button,
  Avatar,
  Typography,
  Flex,
  Tabs,
  Tag,
  List,
  Divider,
} from 'antd';
import {
  SendOutlined,
  RobotOutlined,
  UserOutlined,
  BulbOutlined,
  LineChartOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Virtuoso } from 'react-virtuoso';
import './index.scss';

const { Text, Title } = Typography;
const { TextArea } = Input;

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface InsightCard {
  id: string;
  type: 'focus' | 'plan' | 'risk';
  title: string;
  items: string[];
}

const mockInsights: InsightCard[] = [
  {
    id: '1',
    type: 'focus',
    title: 'Сфокусируйся сегодня:',
    items: [
      'Павлов — напомнить об оплате, это 50 000 ₽',
      'Лебедева — договориться о встрече, сделка зависла',
      'Отправь коммерческое предложение 2 новым клиентам',
    ],
  },
  {
    id: '2',
    type: 'plan',
    title: 'Чтобы закрыть месяц в плане, нужно:',
    items: [
      'Закрыть все сделки на оформлении (145 000 ₽)',
      'Или привлечь 2 новых клиента со средним чеком 40 000 ₽',
    ],
  },
  {
    id: '3',
    type: 'risk',
    title: 'Риск:',
    items: [
      '3 сделки на этапе КП могут не успеть закрыться до конца месяца (цикл 14 дней, осталось 12)',
    ],
  },
];

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Добрый день, Иван!\n\nДо плана осталось 170 000 ₽, а прогноз по открытым сделкам — 95 000 ₽.\nНе хватает 75 000 ₽.',
    timestamp: new Date(),
  },
];

export default function AIChat() {
  const [activeTab, setActiveTab] = useState('assistant');
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const virtuosoRef = useRef<any>(null);

  useEffect(() => {
    if (virtuosoRef.current && messages.length > 0) {
      virtuosoRef.current.scrollToIndex({
        index: messages.length - 1,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Понял! Я помогу составить коммерческое предложение. Что именно вам нужно включить?',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const renderMessage = (index: number, message: Message) => (
    <Flex
      key={message.id}
      className={`ai-chat__message ai-chat__message--${message.role}`}
      gap="small"
      align="flex-start"
    >
      <Avatar
        className="ai-chat__avatar"
        icon={message.role === 'assistant' ? <RobotOutlined /> : <UserOutlined />}
        style={{
          backgroundColor: message.role === 'assistant' ? '#1890ff' : '#722ed1',
        }}
      />
      <div className="ai-chat__message-content">
        <Text className="ai-chat__message-text">{message.content}</Text>
        <Text className="ai-chat__timestamp" type="secondary">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </div>
    </Flex>
  );

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'focus':
        return <BulbOutlined className="ai-chat__insight-icon ai-chat__insight-icon--focus" />;
      case 'plan':
        return <LineChartOutlined className="ai-chat__insight-icon ai-chat__insight-icon--plan" />;
      case 'risk':
        return <WarningOutlined className="ai-chat__insight-icon ai-chat__insight-icon--risk" />;
      default:
        return null;
    }
  };

  return (
    <Card className="ai-chat" bordered={false}>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className="ai-chat__tabs"
        items={[
          {
            key: 'assistant',
            label: (
              <Flex gap="small" align="center">
                <RobotOutlined />
                <span>Ассистент</span>
              </Flex>
            ),
            children: (
              <Flex vertical className="ai-chat__content">
                <div className="ai-chat__messages">
                  <Virtuoso
                    ref={virtuosoRef}
                    data={messages}
                    itemContent={renderMessage}
                    className="ai-chat__virtuoso"
                    followOutput="smooth"
                  />
                </div>
                <Divider className="ai-chat__divider" />
                <Flex className="ai-chat__input-area" gap="small">
                  <TextArea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Помоги составить коммерческое предложение..."
                    className="ai-chat__input"
                    autoSize={{ minRows: 1, maxRows: 4 }}
                    onPressEnter={(e) => {
                      if (!e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                  />
                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={handleSend}
                    className="ai-chat__send-button"
                  />
                </Flex>
              </Flex>
            ),
          },
          {
            key: 'curator',
            label: (
              <Flex gap="small" align="center">
                <UserOutlined />
                <span>Куратор</span>
              </Flex>
            ),
            children: (
              <Flex vertical className="ai-chat__insights">
                {mockInsights.map((insight) => (
                  <Card
                    key={insight.id}
                    className="ai-chat__insight-card"
                    size="small"
                  >
                    <Flex gap="small" align="center" className="ai-chat__insight-header">
                      {getInsightIcon(insight.type)}
                      <Text strong>{insight.title}</Text>
                    </Flex>
                    <List
                      size="small"
                      dataSource={insight.items}
                      renderItem={(item) => (
                        <List.Item className="ai-chat__insight-item">
                          <Text>• {item}</Text>
                        </List.Item>
                      )}
                    />
                  </Card>
                ))}
              </Flex>
            ),
          },
        ]}
      />
    </Card>
  );
}
