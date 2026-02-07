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
  Input,
  Select,
} from 'antd';
import {
  PlusOutlined,
  ImportOutlined,
  SearchOutlined,
  SortAscendingOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import CrmLayout from '../../components/layout';
import './index.scss';

const { Title, Text } = Typography;

const sourceOptions = [
  { value: 'all', label: 'Все источники' },
  { value: 'website', label: 'Заявка с сайта' },
  { value: 'recommendation', label: 'Рекомендация' },
  { value: 'social', label: 'Социальные сети' },
  { value: 'call', label: 'Холодный звонок' },
  { value: 'ad', label: 'Реклама' },
];

const statsData = [
  { label: 'Всего новых лидов', value: '192' },
  { label: 'С задачами', value: '192' },
  { label: 'Без задач', value: '0' },
];

const leadsData = [
  {
    key: '1',
    client: 'Черных Е. А.',
    phone: '+7 (900) 100-00-17',
    source: '—',
    added: '11 янв.',
    nextAction: '—',
    status: 'Готов к сделке',
    statusColor: 'green',
  },
  {
    key: '2',
    client: 'Григорьева Е. И.',
    phone: '+7 (999) 567-89-01',
    source: 'Заявка с сайта',
    added: '3 янв.',
    nextAction: '—',
    status: 'Новый',
    statusColor: 'purple',
  },
  {
    key: '3',
    client: 'Петрова М. А.',
    phone: '+7 (123) 456-78-90',
    source: 'Рекомендация',
    added: '2 янв.',
    nextAction: '—',
    status: 'Новый',
    statusColor: 'purple',
  },
  {
    key: '4',
    client: 'Романов А. С.',
    phone: '+7 (999) 345-67-89',
    source: 'Заявка с сайта',
    added: '2 янв.',
    nextAction: '—',
    status: 'Новый',
    statusColor: 'purple',
  },
];

const columns = [
  {
    title: 'Клиент',
    dataIndex: 'client',
    key: 'client',
    render: (text: string, record: typeof leadsData[0]) => (
      <div>
        <Text strong>{text}</Text>
        <br />
        <Text type="secondary" className="leads-page__phone">{record.phone}</Text>
      </div>
    ),
  },
  { title: 'Источник', dataIndex: 'source', key: 'source' },
  { title: 'Добавлен', dataIndex: 'added', key: 'added' },
  { title: 'След. действие', dataIndex: 'nextAction', key: 'nextAction' },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
    render: (status: string, record: typeof leadsData[0]) => (
      <Tag color={record.statusColor} className="leads-page__status-tag">{status}</Tag>
    ),
  },
  {
    title: 'Действия',
    key: 'actions',
    render: () => (
      <Flex gap="small">
        <Button icon={<SortAscendingOutlined />} size="small" />
        <Button icon={<DeleteOutlined />} size="small" danger />
      </Flex>
    ),
  },
];

export default function LeadsPage() {
  return (
    <CrmLayout>
      <div className="leads-page">
        <Flex className="leads-page__header" justify="space-between" align="center">
          <Title level={3} className="leads-page__title">Новые лиды</Title>
          <Flex gap="small">
            <Button icon={<ImportOutlined />}>Импортировать</Button>
            <Button type="primary" icon={<PlusOutlined />}>Добавить</Button>
          </Flex>
        </Flex>

        <Flex className="leads-page__filters" wrap gap="small">
          <Input
            placeholder="Поиск"
            prefix={<SearchOutlined />}
            className="leads-page__search-input"
          />
          <Select
            placeholder="Источник"
            className="leads-page__filter-select"
            options={sourceOptions}
          />
          <Button icon={<SortAscendingOutlined />} />
        </Flex>

        <Row gutter={[16, 16]} className="leads-page__stats">
          {statsData.map((stat, index) => (
            <Col xs={12} sm={8} md={6} key={index}>
              <Card>
                <Text type="secondary" className="leads-page__stat-label">{stat.label}</Text>
                <Title level={4} className="leads-page__stat-value">{stat.value}</Title>
              </Card>
            </Col>
          ))}
        </Row>

        <Card className="leads-page__table-card">
          <Table
            columns={columns}
            dataSource={leadsData}
            pagination={false}
          />
        </Card>
      </div>
    </CrmLayout>
  );
}
