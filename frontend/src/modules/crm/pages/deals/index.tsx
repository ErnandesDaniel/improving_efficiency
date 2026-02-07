'use client';

import React from 'react';
import {
  Card,
  Button,
  Input,
  Table,
  Tag,
  Typography,
  Space,
  Row,
  Col,
  Select,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

interface Deal {
  id: number;
  client: string;
  product: string;
  amount: string;
  closePlan: string;
  nextAction: string;
  updated: string;
  stage: string;
  stageColor: string;
}

const dealsData: Deal[] = [
  {
    id: 1,
    client: 'Неизвестный клиент',
    product: 'Премиум 7+',
    amount: '36 000 ₽',
    closePlan: '4 февр.',
    nextAction: '—',
    updated: '20 янв.',
    stage: 'КП',
    stageColor: 'gold',
  },
  {
    id: 2,
    client: 'Неизвестный клиент',
    product: 'Солнышко 7+',
    amount: '24 000 ₽',
    closePlan: '28 янв.',
    nextAction: '—',
    updated: '21 янв.',
    stage: 'Оплата',
    stageColor: 'green',
  },
  {
    id: 3,
    client: 'Неизвестный клиент',
    product: 'Глория',
    amount: '15 000 ₽',
    closePlan: '23 янв.',
    nextAction: '—',
    updated: '21 янв.',
    stage: 'Подписание',
    stageColor: 'blue',
  },
  {
    id: 4,
    client: 'Неизвестный клиент',
    product: 'Гардия 7+',
    amount: '18 000 ₽',
    closePlan: '24 янв.',
    nextAction: '—',
    updated: '20 янв.',
    stage: 'Оформление',
    stageColor: 'cyan',
  },
  {
    id: 5,
    client: 'Неизвестный клиент',
    product: 'Гранде',
    amount: '48 000 ₽',
    closePlan: '11 февр.',
    nextAction: '—',
    updated: '19 янв.',
    stage: 'Переговоры',
    stageColor: 'purple',
  },
];

const statsCards = [
  { title: 'Цель на месяц', value: '—' },
  { title: 'Прогноз до конца месяца', value: '5 940 ₽' },
  { title: 'Продано с начала недели', value: '0 ₽' },
  { title: 'КП отправлено / в работе', value: '0 / 1' },
  { title: 'Средний цикл сделки', value: '—' },
];

const columns = [
  {
    title: 'Клиент',
    dataIndex: 'client',
    key: 'client',
  },
  {
    title: 'Продукт',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: 'Сумма',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'План закрытия',
    dataIndex: 'closePlan',
    key: 'closePlan',
  },
  {
    title: 'След. действие',
    dataIndex: 'nextAction',
    key: 'nextAction',
  },
  {
    title: 'Обновлена',
    dataIndex: 'updated',
    key: 'updated',
  },
  {
    title: 'Этап воронки',
    dataIndex: 'stage',
    key: 'stage',
    render: (stage: string, record: Deal) => (
      <Tag color={record.stageColor}>{stage}</Tag>
    ),
  },
];

export default function DealsPage() {
  return (
    <div className="deals-page">
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2} style={{ margin: 0 }}>
            Сделки
          </Title>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />}>
            Создать
          </Button>
        </Col>
      </Row>

      <Card style={{ marginBottom: 24 }}>
        <Space wrap>
          <Input
            placeholder="Поиск"
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
          />
          <Tag closable color="blue">
            Только открытые
          </Tag>
          <Select placeholder="Продукт" style={{ width: 120 }} />
          <Select placeholder="Прогноз" style={{ width: 120 }} />
          <Select placeholder="Обновлена" style={{ width: 120 }} />
          <Select placeholder="Этап воронки" style={{ width: 150 }} />
          <Button icon={<FilterOutlined />} />
        </Space>
      </Card>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        {statsCards.map((card, index) => (
          <Col key={index} span={4}>
            <Card>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {card.title}
              </Text>
              <div style={{ marginTop: 8 }}>
                <Text strong style={{ fontSize: 18 }}>
                  {card.value}
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card>
        <Table
          dataSource={dealsData}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
}
