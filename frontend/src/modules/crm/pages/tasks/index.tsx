'use client';

import React, { useState } from 'react';
import {
  Typography,
  Button,
  Card,
  Calendar,
  Badge,
  Space,
  Select,
  Input,
  Tabs,
  Row,
  Col,
  Tag,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  CalendarOutlined,
  TableOutlined,
  LeftOutlined,
  RightOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import CrmLayout from '../../components/layout';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

const { Title, Text } = Typography;
const { Option } = Select;

// Устанавливаем русскую локаль
dayjs.locale('ru');

interface Task {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  color: string;
}

const tasksData: Task[] = [
  {
    id: '1',
    title: 'Узнать решение',
    date: '2026-02-06',
    time: '09:00',
    type: 'Встреча',
    color: 'purple',
  },
  {
    id: '2',
    title: 'Позвонить клиенту',
    date: '2026-02-07',
    time: '12:00',
    type: 'Звонок',
    color: 'red',
  },
];

// Кастомный компонент недельного календаря
const WeekCalendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  
  const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  const startOfWeek = currentDate.startOf('week').add(1, 'day'); // Начинаем с понедельника
  
  const hours = Array.from({ length: 11 }, (_, i) => i + 8); // 8:00 - 18:00
  
  const weekDates = Array.from({ length: 7 }, (_, i) => 
    startOfWeek.add(i, 'day')
  );

  const getTaskForTimeSlot = (date: dayjs.Dayjs, hour: number) => {
    return tasksData.find(task => {
      const taskDate = dayjs(task.date);
      const taskHour = parseInt(task.time.split(':')[0]);
      return taskDate.isSame(date, 'day') && taskHour === hour;
    });
  };

  return (
    <div style={{ background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '16px',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <Title level={4} style={{ margin: 0 }}>
          {currentDate.format('MMMM YYYY').replace(/^\w/, c => c.toUpperCase())}
        </Title>
        <Space>
          <Button 
            icon={<LeftOutlined />} 
            onClick={() => setCurrentDate(currentDate.subtract(1, 'week'))}
          />
          <Button onClick={() => setCurrentDate(dayjs())}>
            Сегодня
          </Button>
          <Button 
            icon={<RightOutlined />} 
            onClick={() => setCurrentDate(currentDate.add(1, 'week'))}
          />
        </Space>
      </div>

      {/* Calendar Grid */}
      <div style={{ display: 'flex' }}>
        {/* Time Column */}
        <div style={{ width: 80, borderRight: '1px solid #f0f0f0' }}>
          <div style={{ height: 50, borderBottom: '1px solid #f0f0f0' }} />
          {hours.map(hour => (
            <div 
              key={hour}
              style={{ 
                height: 60, 
                borderBottom: '1px solid #f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8c8c8c',
                fontSize: 12
              }}
            >
              {hour}:00
            </div>
          ))}
        </div>

        {/* Days Columns */}
        <div style={{ flex: 1, display: 'flex' }}>
          {weekDates.map((date, index) => (
            <div 
              key={index} 
              style={{ 
                flex: 1, 
                borderRight: index < 6 ? '1px solid #f0f0f0' : 'none',
                background: date.isSame(dayjs(), 'day') ? '#e6f7ff' : 'transparent'
              }}
            >
              {/* Day Header */}
              <div 
                style={{ 
                  height: 50, 
                  borderBottom: '1px solid #f0f0f0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: date.isSame(dayjs(), 'day') ? '#1890ff' : '#fafafa',
                  color: date.isSame(dayjs(), 'day') ? '#fff' : '#262626'
                }}
              >
                <Text style={{ 
                  fontSize: 12, 
                  color: date.isSame(dayjs(), 'day') ? '#fff' : '#8c8c8c' 
                }}>
                  {weekDays[index]}, {date.format('D')}
                </Text>
                {date.isSame(dayjs(), 'day') && (
                  <Text style={{ fontSize: 10, color: '#fff' }}>Сегодня</Text>
                )}
              </div>

              {/* Time Slots */}
              {hours.map(hour => {
                const task = getTaskForTimeSlot(date, hour);
                return (
                  <div 
                    key={hour}
                    style={{ 
                      height: 60, 
                      borderBottom: '1px solid #f0f0f0',
                      padding: 4,
                      position: 'relative'
                    }}
                  >
                    {task && (
                      <div
                        style={{
                          background: task.color === 'purple' ? '#f9f0ff' : '#fff2f0',
                          borderLeft: `3px solid ${task.color === 'purple' ? '#722ed1' : '#ff4d4f'}`,
                          padding: '4px 8px',
                          borderRadius: 4,
                          fontSize: 12,
                          cursor: 'pointer'
                        }}
                      >
                        <Text strong style={{ fontSize: 11 }}>{task.title}</Text>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function TasksPage() {
  const [viewMode, setViewMode] = useState<'calendar' | 'table'>('calendar');

  return (
    <CrmLayout>
      <div style={{ maxWidth: 1200 }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <Title level={3} style={{ margin: 0 }}>
            Задачи
          </Title>
          <Space>
            <Button icon={<SettingOutlined />}>
              Настройки
            </Button>
            <Button type="primary" icon={<PlusOutlined />} size="large">
              Создать
            </Button>
          </Space>
        </div>

        {/* Filters */}
        <Space style={{ marginBottom: 24 }} wrap>
          <Input
            placeholder="Поиск"
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
          />
          <Select placeholder="Только открытые" style={{ width: 150 }}>
            <Option value="open">Только открытые</Option>
            <Option value="all">Все задачи</Option>
            <Option value="completed">Выполненные</Option>
          </Select>
          <Select placeholder="Крайний срок" style={{ width: 140 }}>
            <Option value="today">Сегодня</Option>
            <Option value="week">Эта неделя</Option>
            <Option value="month">Этот месяц</Option>
          </Select>
          <Select placeholder="Тип задачи" style={{ width: 130 }}>
            <Option value="call">Звонок</Option>
            <Option value="meeting">Встреча</Option>
            <Option value="email">Email</Option>
          </Select>
          <Button icon={<ArrowUpOutlined />} />
        </Space>

        {/* View Toggle */}
        <div style={{ marginBottom: 24 }}>
          <Space>
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
          </Space>
        </div>

        {/* Calendar View */}
        {viewMode === 'calendar' && <WeekCalendar />}

        {/* Table View */}
        {viewMode === 'table' && (
          <Card>
            <Row gutter={[16, 16]}>
              {tasksData.map(task => (
                <Col xs={24} sm={12} md={8} key={task.id}>
                  <Card size="small" hoverable>
                    <Tag color={task.color}>{task.type}</Tag>
                    <Title level={5} style={{ marginTop: 8, marginBottom: 4 }}>
                      {task.title}
                    </Title>
                    <Text type="secondary">
                      {dayjs(task.date).format('D MMMM')}, {task.time}
                    </Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        )}
      </div>
    </CrmLayout>
  );
}
