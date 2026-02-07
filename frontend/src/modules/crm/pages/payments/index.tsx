'use client';

import React from 'react';
import {
  Card,
  Typography,
  Row,
  Col,
  Table,
  Tag,
  Button,
  Space,
} from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface Payment {
  id: number;
  amount: string;
  date: string;
  type: string;
  contractTerm: string;
  contractNumber: string;
  premium: string;
  percent: string;
  product: string;
  client: string;
  payment: string;
}

const paymentsData: Payment[] = [
  {
    id: 1,
    amount: '+18 0...',
    date: '31.12.2025',
    type: 'Бонус',
    contractTerm: '—',
    contractNumber: '—',
    premium: '—',
    percent: '—',
    product: 'Бонус',
    client: '—',
    payment: '31.01.2026',
  },
  {
    id: 2,
    amount: '5 500 ₽',
    date: '02.01.2026',
    type: 'Бонус',
    contractTerm: '—',
    contractNumber: '—',
    premium: '—',
    percent: '—',
    product: 'Бонус',
    client: '—',
    payment: '',
  },
  {
    id: 3,
    amount: '8 500 ₽',
    date: '05.01.2026',
    type: 'Первичная',
    contractTerm: '—',
    contractNumber: '—',
    premium: '85 000 ₽',
    percent: '10%',
    product: 'Бонус',
    client: '—',
    payment: '',
  },
  {
    id: 4,
    amount: '+15 0...',
    date: '15.12.2025',
    type: 'Первичная',
    contractTerm: '—',
    contractNumber: '—',
    premium: '120 000 ₽',
    percent: '12.5%',
    product: 'Бонус',
    client: '—',
    payment: '15.01.2026',
  },
];

const statsCards = [
  { title: 'Премии', value: '205 000 ₽' },
  { title: 'Комиссии', value: '47 000 ₽' },
];

const columns = [
  {
    title: 'Сумма',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount: string) => (
      <Text style={{ color: amount.startsWith('+') ? '#52c41a' : 'inherit' }}>
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
    dataIndex: 'payment',
    key: 'payment',
  },
];

export default function PaymentsPage() {
  return (
    <div className="payments-page">
      <Title level={2} style={{ marginBottom: 24 }}>
        Начисления
      </Title>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {statsCards.map((card, index) => (
          <Col key={index} xs={24} sm={12} md={6}>
            <Card>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {card.title}
              </Text>
              <div style={{ marginTop: 8 }}>
                <Text strong style={{ fontSize: 24 }}>
                  {card.value}
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card
        extra={
          <Button.Group>
            <Button icon={<ArrowUpOutlined />} />
            <Button icon={<ArrowDownOutlined />} />
          </Button.Group>
        }
      >
        <div style={{ overflowX: 'auto' }}>
          <Table
            dataSource={paymentsData}
            columns={columns}
            rowKey="id"
            scroll={{ x: 1000 }}
            size="small"
            pagination={{ pageSize: 10, size: 'small' }}
          />
        </div>
      </Card>
    </div>
  );
}
