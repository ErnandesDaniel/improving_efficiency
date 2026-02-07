'use client';

import React from 'react';
import {
  Typography,
  Card,
  Table,
  Tag,
  Button,
  Flex,
  Row,
  Col,
} from 'antd';
import {
  SortAscendingOutlined,
} from '@ant-design/icons';
import CrmLayout from '../../components/layout';
import './index.scss';

const { Title, Text } = Typography;

const paymentsData = [
  {
    key: '1',
    amount: '+18 000 ₽',
    date: '31.12.2025',
    type: 'Бонус',
    contractTerm: '—',
    contractNumber: '—',
    premium: '—',
    percent: '—',
    product: 'Бонус',
    client: '—',
    payout: '31.01.2026',
  },
  {
    key: '2',
    amount: '5 500 ₽',
    date: '02.01.2026',
    type: 'Бонус',
    contractTerm: '—',
    contractNumber: '—',
    premium: '—',
    percent: '—',
    product: 'Бонус',
    client: '—',
    payout: '—',
  },
  {
    key: '3',
    amount: '8 500 ₽',
    date: '05.01.2026',
    type: 'Первичная',
    contractTerm: '—',
    contractNumber: '—',
    premium: '85 000 ₽',
    percent: '10%',
    product: 'Бонус',
    client: '—',
    payout: '—',
  },
  {
    key: '4',
    amount: '+15 000 ₽',
    date: '15.12.2025',
    type: 'Первичная',
    contractTerm: '—',
    contractNumber: '—',
    premium: '120 000 ₽',
    percent: '12.5%',
    product: 'Бонус',
    client: '—',
    payout: '15.01.2026',
  },
];

const columns = [
  {
    title: 'Сумма',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount: string) => (
      <Text className={amount.startsWith('+') ? 'payments-page__amount-positive' : ''}>
        {amount}
      </Text>
    ),
  },
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Тип комиссии',
    dataIndex: 'type',
    key: 'type',
    render: (type: string) => <Tag>{type}</Tag>,
  },
  {
    title: 'Срок договора',
    dataIndex: 'contractTerm',
    key: 'contractTerm',
  },
  {
    title: 'Номер договора',
    dataIndex: 'contractNumber',
    key: 'contractNumber',
  },
  {
    title: 'Премия',
    dataIndex: 'premium',
    key: 'premium',
  },
  {
    title: '%',
    dataIndex: 'percent',
    key: 'percent',
  },
  {
    title: 'Продукт',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: 'Клиент',
    dataIndex: 'client',
    key: 'client',
  },
  {
    title: 'Выплата',
    dataIndex: 'payout',
    key: 'payout',
  },
];

export default function PaymentsPage() {
  return (
    <CrmLayout>
      <div className="payments-page">
        <Flex className="payments-page__header" justify="space-between" align="center">
          <Title level={3} className="payments-page__title">Начисления</Title>
        </Flex>

        <Row gutter={[16, 16]} className="payments-page__stats">
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Text type="secondary">Премии</Text>
              <Title level={4} className="payments-page__stat-value">205 000 ₽</Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Text type="secondary">Комиссии</Text>
              <Title level={4} className="payments-page__stat-value">47 000 ₽</Title>
            </Card>
          </Col>
        </Row>

        <Flex className="payments-page__toolbar" justify="flex-end">
          <Button icon={<SortAscendingOutlined />} />
        </Flex>

        <Card className="payments-page__table-card">
          <Table
            columns={columns}
            dataSource={paymentsData}
            pagination={false}
          />
        </Card>
      </div>
    </CrmLayout>
  );
}
