'use client';

import React, { useState } from 'react';
import {
  Card,
  Button,
  Input,
  Select,
  Calendar,
  Badge,
  Typography,
  Space,
  Tabs,
  Row,
  Col,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
  CalendarOutlined,
  TableOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

interface Task {
  id: number;
  title: string;
  time: string;
  date: Dayjs;
  type: 'meeting' | 'call' | 'task';
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Узнать решение',
    time: '09:00',
    date: dayjs('2026-02-06'),
    type: 'meeting',
  },
];

export default function TasksPage() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [viewMode, setViewMode] = useState<'calendar' | 'table'>('calendar');

  const onPanelChange = (value: Dayjs) => {
    setCurrentDate(value);
  };

  const dateCellRender = (value: Dayjs) => {
    const dayTasks = mockTasks.filter(
      (task) => task.date.format('YYYY-MM-DD') === value.format('YYYY-MM-DD')
    );

    return (
      <div style={{ minHeight: 60 }}>
        {dayTasks.map((task) => (
          <div
            key={task.id}
            style={{
              background: '#f0f0ff',
              borderRadius: 4,
              padding: '4px 8px',
              marginBottom: 4,
              fontSize: 12,
            }}
          >
            <Text style={{ fontSize: 11 }}>{task.time}</Text>
            <br />
            <Text strong style={{ fontSize: 12 }}>
              {task.title}
            </Text>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="tasks-page">
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2} style={{ margin: 0 }}>
            Задачи
          </Title>
        </Col>
        <Col>
          <Space>
            <Button icon={<SettingOutlined />}>Настройки</Button>
            <Button type="primary" icon={<PlusOutlined />}>
              Создать
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
          <Select defaultValue="open" style={{ width: 150 }}>
            <Option value="open">Только открытые</Option>
            <Option value="all">Все</Option>
            <Option value="closed">Закрытые</Option>
          </Select>
          <Select placeholder="Крайний срок" style={{ width: 150 }} />
          <Select placeholder="Тип задачи" style={{ width: 150 }} />
        </Space>
      </Card>

      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={4} style={{ margin: 0 }}>
            {currentDate.format('MMMM YYYY')}
          </Title>
        </Col>
        <Col>
          <Space>
            <Button.Group>
              <Button icon={<ArrowLeftOutlined />} />
              <Button>Сегодня</Button>
              <Button icon={<ArrowRightOutlined />} />
            </Button.Group>
            <Button.Group>
              <Button
                type={viewMode === 'calendar' ? 'primary' : 'default'}
                icon={<CalendarOutlined />}
                onClick={() => setViewMode('calendar')}
              >
                Календарь
              </Button>
              <Button
                type={viewMode === 'table' ? 'primary' : 'default'}
                icon={<TableOutlined />}
                onClick={() => setViewMode('table')}
              >
                Таблица
              </Button>
            </Button.Group>
          </Space>
        </Col>
      </Row>

      {viewMode === 'calendar' ? (
        <Calendar
          value={currentDate}
          onPanelChange={onPanelChange}
          cellRender={dateCellRender}
          mode="month"
        />
      ) : (
        <Card>
          <Text>Табличный вид (в разработке)</Text>
        </Card>
      )}
    </div>
  );
}
