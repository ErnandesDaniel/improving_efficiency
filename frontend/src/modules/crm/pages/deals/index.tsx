'use client';

import React, { useState } from 'react';
import {
  Typography,
  Button,
  Card,
  Table,
  Tag,
  Flex,
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
import './index.scss';

const { Title, Text } = Typography;

const statusFilterOptions = [
  { value: 'open', label: 'Только открытые' },
  { value: 'all', label: 'Все сделки' },
  { value: 'closed', label: 'Закрытые' },
];

const productFilterOptions = [
  { value: 'premium', label: 'Премиум' },
  { value: 'sunny', label: 'Солнышко' },
  { value: 'gloria', label: 'Глория' },
];

const forecastFilterOptions = [
  { value: 'high', label: 'Высокий' },
  { value: 'medium', label: 'Средний' },
  { value: 'low', label: 'Низкий' },
];

const updatedFilterOptions = [
  { value: 'today', label: 'Сегодня' },
  { value: 'week', label: 'Неделя' },
  { value: 'month', label: 'Месяц' },
];

const stageFilterOptions = [
  { value: 'kp', label: 'КП' },
  { value: 'payment', label: 'Оплата' },
  { value: 'signing', label: 'Подписание' },
];

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
      <div className="deals-page">
        <Flex className="deals-page__header" justify="space-between" align="center">
          <Title level={3} className="deals-page__title">Сделки</Title>
          <Button type="primary" icon={<PlusOutlined />} size="large">
            Создать
          </Button>
        </Flex>

        <Flex className="deals-page__filters" wrap gap="small">
          <Input
            placeholder="Поиск"
            prefix={<SearchOutlined />}
            className="deals-page__search-input"
          />
          <Select
            defaultValue="open"
            suffixIcon={<FilterOutlined />}
            className="deals-page__filter-select"
            options={statusFilterOptions}
          />
          <Select
            placeholder="Продукт"
            className="deals-page__filter-select deals-page__filter-select--small"
            options={productFilterOptions}
          />
          <Select
            placeholder="Прогноз"
            className="deals-page__filter-select deals-page__filter-select--small"
            options={forecastFilterOptions}
          />
          <Select
            placeholder="Обновлена"
            className="deals-page__filter-select deals-page__filter-select--small"
            options={updatedFilterOptions}
          />
          <Select
            placeholder="Этап воронки"
            className="deals-page__filter-select deals-page__filter-select--medium"
            options={stageFilterOptions}
          />
          <Button icon={<ArrowUpOutlined />} />
        </Flex>

        <Row gutter={[16, 16]} className="deals-page__stats">
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Text type="secondary">Цель на месяц</Text>
              <Title level={4} className="deals-page__stat-value">—</Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Text type="secondary">
                Прогноз до конца месяца
                <Badge status="processing" className="deals-page__badge" />
              </Text>
              <Title level={4} className="deals-page__stat-value">5 940 ₽</Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Text type="secondary">Продано с начала месяца</Text>
              <Title level={4} className="deals-page__stat-value">0 ₽</Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Text type="secondary">КП отправлено / в работе</Text>
              <Title level={4} className="deals-page__stat-value">0 / 1</Title>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="deals-page__stats">
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Text type="secondary">Средний цикл сделки</Text>
              <Title level={4} className="deals-page__stat-value">—</Title>
            </Card>
          </Col>
        </Row>

        <Card className="deals-page__table-card">
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
