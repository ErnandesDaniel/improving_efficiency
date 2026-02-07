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
  Avatar,
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

interface Lead {
  id: number;
  name: string;
  phone: string;
  source: string;
  added: string;
  nextAction: string;
  status: string;
  statusColor: string;
}

const leadsData: Lead[] = [
  {
    id: 1,
    name: 'Черных Е. А.',
    phone: '+7 (900) 100-00-17',
    source: '—',
    added: '11 янв.',
    nextAction: '—',
    status: 'Готов к сделке',
    statusColor: 'success',
  },
  {
    id: 2,
    name: 'Григорьева Е. И.',
    phone: '+7 (999) 567-89-01',
    source: 'Заявка с сайта',
    added: '3 янв.',
    nextAction: '—',
    status: 'Новый',
    statusColor: 'default',
  },
  {
    id: 3,
    name: 'Петрова М. А.',
    phone: '+7 (123) 456-78-90',
    source: 'Рекомендация',
    added: '2 янв.',
    nextAction: '—',
    status: 'Новый',
    statusColor: 'default',
  },
  {
    id: 4,
    name: 'Романов А. С.',
    phone: '+7 (999) 345-67-89',
    source: 'Заявка с сайта',
    added: '2 янв.',
    nextAction: '—',
    status: 'Новый',
    statusColor: 'default',
  },
  {
    id: 5,
    name: 'Лебедева О. Д.',
    phone: '+7 (999) 890-12-34',
    source: 'Социальные сети',
    added: '1 янв.',
    nextAction: '—',
    status: 'Новый',
    statusColor: 'default',
  },
  {
    id: 6,
    name: 'Орлова А. М.',
    phone: '+7 (123) 456-78-90',
    source: 'Холодный звонок',
    added: '1 янв.',
    nextAction: '—',
    status: 'Квалификация',
    statusColor: 'processing',
  },
  {
    id: 7,
    name: 'Волкова О. Н.',
    phone: '+7 (999) 567-89-01',
    source: 'Реклама',
    added: '21 дек.',
    nextAction: '—',
    status: 'Новый',
    statusColor: 'default',
  },
  {
    id: 8,
    name: 'Новикова М. И.',
    phone: '+7 (999) 345-67-89',
    source: 'Холодный звонок',
    added: '18 дек.',
    nextAction: '—',
    status: 'Новый',
    statusColor: 'default',
  },
];

const statsCards = [
  { title: 'Всего новых лидов', value: '192' },
  { title: 'С задачами', value: '192' },
  { title: 'Без задач', value: '0' },
];

const columns = [
  {
    title: 'Клиент',
    dataIndex: 'name',
    key: 'name',
    render: (name: string, record: Lead) => (
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
    title: 'Источник',
    dataIndex: 'source',
    key: 'source',
  },
  {
    title: 'Добавлен',
    dataIndex: 'added',
    key: 'added',
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
    render: (status: string, record: Lead) => (
      <Tag color={record.statusColor === 'success' ? 'green' : record.statusColor === 'processing' ? 'blue' : 'default'}>
        {status}
      </Tag>
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

export default function LeadsPage() {
  return (
    <div className="leads-page">
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12}>
          <Title level={2} style={{ margin: 0 }}>
            Новые клиенты
          </Title>
        </Col>
        <Col xs={24} sm={12}>
          <Space wrap>
            <Button icon={<UploadOutlined />}>Импортировать</Button>
            <Button type="primary" icon={<PlusOutlined />}>
              Добавить
            </Button>
          </Space>
        </Col>
      </Row>

      <Card style={{ marginBottom: 24 }}>
        <Space wrap size={[8, 8]}>
          <Input
            placeholder="Поиск"
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
          />
          <Input placeholder="Источник" style={{ width: 150 }} />
        </Space>
      </Card>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {statsCards.map((card, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {card.title}
              </Text>
              <div style={{ marginTop: 8 }}>
                <Text strong style={{ fontSize: 32 }}>
                  {card.value}
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card>
        <div style={{ overflowX: 'auto' }}>
          <Table
            dataSource={leadsData}
            columns={columns}
            rowKey="id"
            scroll={{ x: 800 }}
            size="small"
            pagination={{ pageSize: 10, size: 'small' }}
          />
        </div>
      </Card>
    </div>
  );
}
