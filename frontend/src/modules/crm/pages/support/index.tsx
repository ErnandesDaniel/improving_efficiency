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
  Tooltip,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
  CalendarOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface SupportClient {
  id: number;
  name: string;
  phone: string;
  contract: string;
  premium: string;
  renewal: string;
  dr: string;
  updated: string;
  nextAction: string;
  status: string;
}

const supportData: SupportClient[] = [
  {
    id: 1,
    name: 'Васильев ...',
    phone: '+7 (116) 101-...',
    contract: '—',
    premium: '—',
    renewal: '06.01.2026',
    dr: '18.08.1977',
    updated: '01.12.2025',
    nextAction: '07.12.2025',
    status: 'Активный клиент',
  },
  {
    id: 2,
    name: 'Смирнова ...',
    phone: '+7 (999) 123-...',
    contract: '—',
    premium: '—',
    renewal: '01.06.2026',
    dr: '25.12.1985',
    updated: '22.12.2025',
    nextAction: '17.12.2025',
    status: 'Активный клиент',
  },
  {
    id: 3,
    name: 'Константи...',
    phone: '+7 (123) 456-...',
    contract: '—',
    premium: '—',
    renewal: '28.12.2025',
    dr: '15.05.1990',
    updated: '04.01.2026',
    nextAction: '08.12.2025',
    status: 'Активный клиент',
  },
  {
    id: 4,
    name: 'Фёдоров И...',
    phone: '+7 (855) 992-...',
    contract: '—',
    premium: '—',
    renewal: '20.02.2026',
    dr: '12.05.1994',
    updated: '11.12.2025',
    nextAction: '17.12.2025',
    status: 'Активный клиент',
  },
  {
    id: 5,
    name: 'Соловьёв ...',
    phone: '+7 (961) 314-...',
    contract: '—',
    premium: '—',
    renewal: '16.03.2026',
    dr: '09.02.1981',
    updated: '30.11.2025',
    nextAction: '17.12.2025',
    status: 'Активный клиент',
  },
];

const statsCards = [
  { title: 'Клиентов на сопровождении', value: '8' },
  { title: 'Сумма портфеля', value: '0 ₽' },
  { title: 'Продлений скоро', value: '1' },
  { title: 'Просрочено продление', value: '3' },
  { title: 'Потенциал допродаж', value: '0 ₽' },
  { title: 'Без контакта 30+ дней', value: '8' },
];

const columns = [
  {
    title: 'Клиент',
    dataIndex: 'name',
    key: 'name',
    render: (name: string, record: SupportClient) => (
      <div>
        <Text strong>{name}</Text>
        <br />
        <Text type="secondary" style={{ fontSize: 12 }}>
          {record.phone}
        </Text>
      </div>
    ),
  },
  {
    title: 'Договор',
    dataIndex: 'contract',
    key: 'contract',
  },
  {
    title: 'Премия',
    dataIndex: 'premium',
    key: 'premium',
  },
  {
    title: 'Продление',
    dataIndex: 'renewal',
    key: 'renewal',
  },
  {
    title: 'ДР',
    dataIndex: 'dr',
    key: 'dr',
  },
  {
    title: 'Обновлено',
    dataIndex: 'updated',
    key: 'updated',
  },
  {
    title: 'След. действие',
    dataIndex: 'nextAction',
    key: 'nextAction',
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Tag color="success">{status}</Tag>
    ),
  },
  {
    title: 'Действия',
    key: 'actions',
    render: () => (
      <Space>
        <Tooltip title="Добавить задачу">
          <Button type="text" icon={<CalendarOutlined />} size="small" />
        </Tooltip>
        <Tooltip title="Удалить">
          <Button type="text" icon={<DeleteOutlined />} size="small" danger />
        </Tooltip>
      </Space>
    ),
  },
];

export default function SupportPage() {
  return (
    <div className="support-page">
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2} style={{ margin: 0 }}>
            На сопровождении
          </Title>
        </Col>
        <Col>
          <Space>
            <Button icon={<UploadOutlined />}>Импортировать</Button>
            <Button type="primary" icon={<PlusOutlined />}>
              Добавить
            </Button>
          </Space>
        </Col>
      </Row>

      <Card style={{ marginBottom: 24 }}>
        <Space wrap>
          <Input
            placeholder="Поиск"
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
          />
          <Input placeholder="Статус" style={{ width: 120 }} />
          <Input placeholder="Продукт" style={{ width: 120 }} />
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
                <Text strong style={{ fontSize: 24 }}>
                  {card.value}
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card>
        <Table
          dataSource={supportData}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
}
