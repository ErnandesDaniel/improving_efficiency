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
  PlusOutlined,
  ImportOutlined,
  CalendarOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import CrmLayout from '../../components/layout';
import './index.scss';

const { Title, Text } = Typography;

const statsData = [
  { label: 'Отказов за февраль 2026', value: '0' },
  { label: 'Упущенная премия за февраль 2026', value: '0 ₽' },
  { label: 'Конверсия в отказ', value: '0%' },
  { label: 'Больше всего отказов на этапе', value: '— (0)' },
];

const rejectionsData = [
  {
    key: '1',
    client: 'Андреев М...',
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
    key: '2',
    client: 'Алексеева...',
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
    key: '3',
    client: 'Павлова А...',
    phone: '+7 (999) 111-...',
    contract: '—',
    premium: '—',
    stage: 'Переговоры',
    reason: 'Дорого',
    updated: '16.01.2026',
    nextAction: '21.11.2025',
    status: 'Отказался',
  },
];

const columns = [
  {
    title: 'Клиент',
    dataIndex: 'client',
    key: 'client',
    render: (text: string, record: typeof rejectionsData[0]) => (
      <div>
        <Text strong>{text}</Text>
        <br />
        <Text type="secondary" className="rejections-page__phone">{record.phone}</Text>
      </div>
    ),
  },
  { title: 'Договор', dataIndex: 'contract', key: 'contract' },
  { title: 'Премия', dataIndex: 'premium', key: 'premium' },
  { title: 'Этап', dataIndex: 'stage', key: 'stage' },
  { title: 'Причина', dataIndex: 'reason', key: 'reason' },
  { title: 'Обновлено', dataIndex: 'updated', key: 'updated' },
  { title: 'След. действие', dataIndex: 'nextAction', key: 'nextAction' },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => <Tag className="rejections-page__status-tag">{status}</Tag>,
  },
  {
    title: 'Действия',
    key: 'actions',
    render: () => (
      <Flex gap="small">
        <Button icon={<CalendarOutlined />} size="small" />
        <Button icon={<DeleteOutlined />} size="small" danger />
      </Flex>
    ),
  },
];

export default function RejectionsPage() {
  return (
    <CrmLayout>
      <div className="rejections-page">
        <Flex className="rejections-page__header" justify="space-between" align="center">
          <Title level={3} className="rejections-page__title">Отказы</Title>
          <Flex gap="small">
            <Button icon={<ImportOutlined />}>Импортировать</Button>
            <Button type="primary" icon={<PlusOutlined />}>Добавить</Button>
          </Flex>
        </Flex>

        <Row gutter={[16, 16]} className="rejections-page__stats">
          {statsData.map((stat, index) => (
            <Col xs={12} sm={6} key={index}>
              <Card>
                <Text type="secondary" className="rejections-page__stat-label">{stat.label}</Text>
                <Title level={4} className="rejections-page__stat-value">{stat.value}</Title>
              </Card>
            </Col>
          ))}
        </Row>

        <Card className="rejections-page__table-card">
          <Table
            columns={columns}
            dataSource={rejectionsData}
            pagination={false}
          />
        </Card>
      </div>
    </CrmLayout>
  );
}
