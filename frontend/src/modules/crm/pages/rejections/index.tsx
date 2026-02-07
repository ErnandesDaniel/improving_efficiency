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

interface Rejection {
  id: number;
  name: string;
  phone: string;
  contract: string;
  premium: string;
  stage: string;
  reason: string;
  updated: string;
  nextAction: string;
  status: string;
}

const rejectionsData: Rejection[] = [
  {
    id: 1,
    name: 'Андреев М...',
    phone: '+7 (999) 444-...',
    contract: '—',
    premium: '—',
    stage: 'Согласова...',
    reason: 'Нет бюджета',
    updated: '11.01.2026',
    nextAction: '29.10.2025',
    status: 'Отказался',
  },
  {
    id: 2,
    name: 'Алексеева...',
    phone: '+7 (999) 101-...',
    contract: '—',
    premium: '—',
    stage: 'Отправлен...',
    reason: 'Выбрал конкуре...',
    updated: '02.01.2026',
    nextAction: '17.11.2025',
    status: 'Отказался',
  },
  {
    id: 3,
    name: 'Павлова А...',
    phone: '+7 (999) 111-...',
    contract: '—',
    premium: '—',
    stage: 'Переговоры',
    reason: 'Дорого',
    updated: '16.01.2026',
    nextAction: '21.11.2025',
    status: 'Отказался',
  },
  {
    id: 4,
    name: 'Сидоров И...',
    phone: '+7 (999) 222-...',
    contract: '—',
    premium: '—',
    stage: 'Отправлен...',
    reason: 'Дорого',
    updated: '14.01.2026',
    nextAction: '15.11.2025',
    status: 'Отказался',
  },
  {
    id: 5,
    name: 'Кириллова...',
    phone: '+7 (999) 333-...',
    contract: '—',
    premium: '—',
    stage: 'Переговоры',
    reason: 'Передумал',
    updated: '07.01.2026',
    nextAction: '01.11.2025',
    status: 'Отказался',
  },
  {
    id: 6,
    name: 'Егорова С....',
    phone: '+7 (999) 555-...',
    contract: '—',
    premium: '—',
    stage: 'Первый ко...',
    reason: 'Не выходит на с...',
    updated: '03.01.2026',
    nextAction: '17.12.2025',
    status: 'Отказался',
  },
];

const statsCards = [
  { title: 'Отказов за февраль 2026', value: '0' },
  { title: 'Упущенный доход за февраль 2026', value: '0 ₽' },
  { title: 'Конверсия в отказ', value: '0%' },
  { title: 'Больше всего отказов на этапе', value: '— (0)' },
];

const columns = [
  {
    title: 'Клиент',
    dataIndex: 'name',
    key: 'name',
    render: (name: string, record: Rejection) => (
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
    title: 'Сумма',
    dataIndex: 'premium',
    key: 'premium',
  },
  {
    title: 'Этап',
    dataIndex: 'stage',
    key: 'stage',
  },
  {
    title: 'Причина',
    dataIndex: 'reason',
    key: 'reason',
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
      <Tag color="default">{status}</Tag>
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

export default function RejectionsPage() {
  return (
    <div className="rejections-page">
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2} style={{ margin: 0 }}>
            Отказы
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
        <Space>
          <Input
            placeholder="Поиск"
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
          />
        </Space>
      </Card>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        {statsCards.map((card, index) => (
          <Col key={index} span={6}>
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
          dataSource={rejectionsData}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
}
