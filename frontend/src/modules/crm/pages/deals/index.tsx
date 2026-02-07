'use client';

import React, { useState } from 'react';
import {
  Typography,
  Button,
  Card,
  Table,
  Tag,
  Space,
  Row,
  Col,
  Input,
  Select,
  Badge,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import CrmLayout from '../../components/layout';

const { Title, Text } = Typography;
const { Option } = Select;

interface Deal {
  key: string;
  client: string;
  product: string;
  amount: number;
  closeDate: string;
  nextAction: string;
  updated: string;
  stage: string;
  stageColor: string;
}

const dealsData: Deal[] = [
  {
    key: '1',
    client: 'Неизвестный клиент',
    product: 'Премиум 7+',
    amount: 36000,
    closeDate: '4 февр.',
    nextAction: '',
    updated: '20 янв.',
    stage: 'КП',
    stageColor: 'gold',
  },
  {
    key: '2',
    client: 'Неизвестный клиент',
    product: 'Солнышко 7+',
    amount: 24000,
    closeDate: '28 янв.',
    nextAction: '',
    updated: '21 янв.',
    stage: 'Оплата',
    stageColor: 'orange',
  },
  {
    key: '3',
    client: 'Неизвестный клиент',
    product: 'Глория',
    amount: 15000,
    closeDate: '23 янв.',
    nextAction: '',
    updated: '21 янв.',
    stage: 'Подписание',
    stageColor: 'purple',
  },
  {
    key: '4',
    client: 'Неизвестный клиент',
    product: 'Гардиа 7+',
    amount: 18000,
    closeDate: '24 янв.',
    nextAction: '',
    updated: '20 янв.',
    stage: 'Оформление',
    stageColor: 'blue',
  },
  {
    key: '5',
    client: 'Неизвестный клиент',
    product: 'Гранде',
    amount: 48000,
    closeDate: '11 февр.',
    nextAction: '',
    updated: '19 янв.',
    stage: 'Переговоры',
    stageColor: 'cyan',
  },
];

const columns = [
  {
    title: 'Клиент',
    dataIndex: 'client',
    key: 'client',
    ellipsis: true,
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
    render: (amount: number) => `${amount.toLocaleString()} ₽`,
  },
  {
    title: 'План закрытия',
    dataIndex: 'closeDate',
    key: 'closeDate',
  },
  {
    title: 'След. действие',
    dataIndex: 'nextAction',
    key: 'nextAction',
    render: (action: string) => action || '—',
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
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <CrmLayout>
      <div style={{ maxWidth: 1200 }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <Title level={3} style={{ margin: 0 }}>
            Сделки
          </Title>
          <Button type="primary" icon={<PlusOutlined />} size="large">
            Создать
          </Button>
        </div>

        {/* Filters */}
        <Space style={{ marginBottom: 24 }} wrap>
          <Input
            placeholder="Поиск"
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
          />
          <Select
            defaultValue="open"
            style={{ width: 150 }}
            suffixIcon={<FilterOutlined />}
          >
            <Option value="open">Только открытые</Option>
            <Option value="all">Все сделки</Option>
            <Option value="closed">Закрытые</Option>
          </Select>
          <Select placeholder="Продукт" style={{ width: 120 }}>
            <Option value="premium">Премиум</Option>
            <Option value="sunny">Солнышко</Option>
            <Option value="gloria">Глория</Option>
          </Select>
          <Select placeholder="Прогноз" style={{ width: 120 }}>
            <Option value="high">Высокий</Option>
            <Option value="medium">Средний</Option>
            <Option value="low">Низкий</Option>
          </Select>
          <Select placeholder="Обновлена" style={{ width: 120 }}>
            <Option value="today">Сегодня</Option>
            <Option value="week">Неделя</Option>
            <Option value="month">Месяц</Option>
          </Select>
          <Select placeholder="Этап воронки" style={{ width: 140 }}>
            <Option value="kp">КП</Option>
            <Option value="payment">Оплата</Option>
            <Option value="signing">Подписание</Option>
          </Select>
          <Button icon={<ArrowUpOutlined />} />
        </Space>

        {/* Stats Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Text type="secondary">Цель на месяц</Text>
              <Title level={4} style={{ margin: '8px 0 0 0' }}>
                —
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Text type="secondary">
                Прогноз до конца месяца{' '}
                <Badge status="processing" style={{ marginLeft: 4 }} />
              </Text>
              <Title level={4} style={{ margin: '8px 0 0 0' }}>
                5 940 ₽
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Text type="secondary">Продано с начала месяца</Text>
              <Title level={4} style={{ margin: '8px 0 0 0' }}>
                0 ₽
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Text type="secondary">КП отправлено / в работе</Text>
              <Title level={4} style={{ margin: '8px 0 0 0' }}>
                0 / 1
              </Title>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Text type="secondary">Средний цикл сделки</Text>
              <Title level={4} style={{ margin: '8px 0 0 0' }}>
                —
              </Title>
            </Card>
          </Col>
        </Row>

        {/* Table */}
        <Card>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dealsData}
            pagination={false}
          />
        </Card>
      </div>
    </CrmLayout>
  );
}
