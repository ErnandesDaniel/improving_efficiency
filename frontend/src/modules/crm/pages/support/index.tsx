'use client';

import React from 'react';
import {
  Typography,
  Card,
  Table,
  Tag,
  Button,
  Flex,
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
  { label: 'Клиентов на сопровождении', value: '8' },
  { label: 'Сумма портфеля', value: '0 ₽' },
  { label: 'Продлений скоро', value: '1' },
  { label: 'Просрочено продление', value: '3' },
  { label: 'Потенциал допродаж', value: '0 ₽' },
  { label: 'Без контакта 30+ дней', value: '8' },
];

const supportData = [
  {
    key: '1',
    client: 'Васильев ...',
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
    key: '2',
    client: 'Смирнова ...',
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
    key: '3',
    client: 'Константи...',
    phone: '+7 (123) 456-...',
    contract: '—',
    premium: '—',
    renewal: '28.12.2025',
    dr: '15.05.1990',
    updated: '04.01.2026',
    nextAction: '08.12.2025',
    status: 'Активный клиент',
  },
];

const columns = [
  {
    title: 'Клиент',
    dataIndex: 'client',
    key: 'client',
    render: (text: string, record: typeof supportData[0]) => (
      <div>
        <Text strong>{text}</Text>
        <br />
        <Text type="secondary" className="support-page__phone">{record.phone}</Text>
      </div>
    ),
  },
  { title: 'Договор', dataIndex: 'contract', key: 'contract' },
  { title: 'Премия', dataIndex: 'premium', key: 'premium' },
  { title: 'Продление', dataIndex: 'renewal', key: 'renewal' },
  { title: 'ДР', dataIndex: 'dr', key: 'dr' },
  { title: 'Обновлено', dataIndex: 'updated', key: 'updated' },
  { title: 'След. действие', dataIndex: 'nextAction', key: 'nextAction' },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => <Tag color="success" className="support-page__status-tag">{status}</Tag>,
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

export default function SupportPage() {
  return (
    <CrmLayout>
      <div className="support-page">
        <Flex className="support-page__header" justify="space-between" align="center">
          <Title level={3} className="support-page__title">На сопровождении</Title>
          <Flex gap="small">
            <Button icon={<ImportOutlined />}>Импортировать</Button>
            <Button type="primary" icon={<PlusOutlined />}>Добавить</Button>
          </Flex>
        </Flex>

        <Flex wrap gap={16} className="support-page__stats">
          {statsData.map((stat, index) => (
            <Flex key={index} vertical style={{ flex: '1 1 calc(16.66% - 14px)', minWidth: 150 }}>
              <Card>
                <Text type="secondary" className="support-page__stat-label">{stat.label}</Text>
                <Title level={4} className="support-page__stat-value">{stat.value}</Title>
              </Card>
            </Flex>
          ))}
        </Flex>

        <Card className="support-page__table-card">
          <Table
            columns={columns}
            dataSource={supportData}
            pagination={false}
          />
        </Card>
      </div>
    </CrmLayout>
  );
}
