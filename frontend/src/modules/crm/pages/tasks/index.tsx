'use client';

import React, { useState } from 'react';
import {
  Typography,
  Button,
  Card,
  Badge,
  Flex,
  Select,
  Input,
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
  SortAscendingOutlined,
} from '@ant-design/icons';
import CrmLayout from '../../components/layout';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import './index.scss';

const { Title, Text } = Typography;

dayjs.locale('ru');

const statusOptions = [
  { value: 'open', label: 'Только открытые' },
  { value: 'all', label: 'Все задачи' },
  { value: 'completed', label: 'Выполненные' },
];

const deadlineOptions = [
  { value: 'today', label: 'Сегодня' },
  { value: 'week', label: 'Эта неделя' },
  { value: 'month', label: 'Этот месяц' },
];

const typeOptions = [
  { value: 'call', label: 'Звонок' },
  { value: 'meeting', label: 'Встреча' },
  { value: 'email', label: 'Email' },
];

const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
const hours = Array.from({ length: 11 }, (_, i) => i + 8);

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

const WeekCalendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const startOfWeek = currentDate.startOf('week').add(1, 'day');
  const weekDates = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));

  const getTaskForTimeSlot = (date: dayjs.Dayjs, hour: number) => {
    return tasksData.find(task => {
      const taskDate = dayjs(task.date);
      const taskHour = parseInt(task.time.split(':')[0]);
      return taskDate.isSame(date, 'day') && taskHour === hour;
    });
  };

  return (
    <div className="week-calendar">
      <Flex className="week-calendar__header" justify="space-between" align="center">
        <Title level={4} className="week-calendar__title">
          {currentDate.format('MMMM YYYY').replace(/^\w/, (c: string) => c.toUpperCase())}
        </Title>
        <Flex gap="small">
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
        </Flex>
      </Flex>

      <Flex className="week-calendar__grid">
        <div className="week-calendar__time-column">
          <div className="week-calendar__time-header" />
          {hours.map(hour => (
            <div key={hour} className="week-calendar__time-slot">
              {hour}:00
            </div>
          ))}
        </div>

        <Flex className="week-calendar__days">
          {weekDates.map((date, index) => (
            <div 
              key={index} 
              className={`week-calendar__day ${date.isSame(dayjs(), 'day') ? 'week-calendar__day--today' : ''}`}
            >
              <div className={`week-calendar__day-header ${date.isSame(dayjs(), 'day') ? 'week-calendar__day-header--today' : ''}`}>
                <Text className={`week-calendar__day-text ${date.isSame(dayjs(), 'day') ? 'week-calendar__day-text--today' : ''}`}>
                  {weekDays[index]}, {date.format('D')}
                </Text>
                {date.isSame(dayjs(), 'day') && (
                  <Text className="week-calendar__today-label">Сегодня</Text>
                )}
              </div>

              {hours.map(hour => {
                const task = getTaskForTimeSlot(date, hour);
                return (
                  <div key={hour} className="week-calendar__hour-slot">
                    {task && (
                      <div className={`week-calendar__task week-calendar__task--${task.color}`}>
                        <Text strong className="week-calendar__task-title">{task.title}</Text>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </Flex>
      </Flex>
    </div>
  );
};

export default function TasksPage() {
  const [viewMode, setViewMode] = useState<'calendar' | 'table'>('calendar');

  return (
    <CrmLayout>
      <div className="tasks-page">
        <Flex className="tasks-page__header" justify="space-between" align="center">
          <Title level={3} className="tasks-page__title">Задачи</Title>
          <Flex gap="small">
            <Button icon={<SettingOutlined />}>
              Настройки
            </Button>
            <Button type="primary" icon={<PlusOutlined />} size="large">
              Создать
            </Button>
          </Flex>
        </Flex>

        <Flex className="tasks-page__filters" wrap gap="small" align="center">
          <Input
            placeholder="Поиск"
            prefix={<SearchOutlined />}
            className="tasks-page__search-input"
          />
          <Button className="tasks-page__filter-btn">Только открытые</Button>
          <Button className="tasks-page__filter-btn">Крайний срок</Button>
          <Button className="tasks-page__filter-btn">Тип задачи</Button>
          <Button icon={<SortAscendingOutlined />} />
        </Flex>

        <Flex className="tasks-page__view-toggle" gap="small">
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
        </Flex>

        {viewMode === 'calendar' && <WeekCalendar />}

        {viewMode === 'table' && (
          <Card className="tasks-page__table-card">
            <Flex wrap gap={16}>
              {tasksData.map(task => (
                <Flex key={task.id} vertical style={{ flex: '1 1 calc(33.33% - 11px)', minWidth: 280 }}>
                  <Card size="small" hoverable className="tasks-page__task-card">
                    <Tag color={task.color}>{task.type}</Tag>
                    <Title level={5} className="tasks-page__task-title">{task.title}</Title>
                    <Text type="secondary">
                      {dayjs(task.date).format('D MMMM')}, {task.time}
                    </Text>
                  </Card>
                </Flex>
              ))}
            </Flex>
          </Card>
        )}
      </div>
    </CrmLayout>
  );
}
