'use client';

import React from 'react';
import {
  Typography,
  Card,
  Progress,
  Avatar,
  List,
  Button,
  Flex,
  Divider,
} from 'antd';
import {
  BookOutlined,
  RightOutlined,
  MessageOutlined,
  PlayCircleOutlined,
  ClockCircleOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import CrmLayout from '../../components/layout';
import './index.scss';

const { Title, Text } = Typography;

const studyRecommendations = [
  {
    id: '1',
    title: 'Быстрый старт: первые шаги агента',
    type: 'Обязательный',
    icon: <PlayCircleOutlined className="dashboard-page__study-icon dashboard-page__study-icon--orange" />,
    color: '#fff7e6',
  },
  {
    id: '2',
    title: 'Этика и комплаенс',
    type: 'Обязательный',
    icon: <BookOutlined className="dashboard-page__study-icon dashboard-page__study-icon--orange" />,
    color: '#fff7e6',
  },
  {
    id: '3',
    title: 'Техники продаж',
    type: 'Рекомендованный',
    icon: <RiseOutlined className="dashboard-page__study-icon dashboard-page__study-icon--blue" />,
    color: '#e6f7ff',
  },
];

const upcomingPayments = [
  {
    id: '1',
    name: 'Константинопольский К.К.',
    type: 'Договор',
    status: 'Просрочено',
    avatar: 'КК',
    avatarColor: '#52c41a',
  },
  {
    id: '2',
    name: 'Васильков К.А.',
    type: 'Договор',
    status: 'Просрочено',
    avatar: 'ВК',
    avatarColor: '#eb2f96',
  },
  {
    id: '3',
    name: 'Фёдорова О.С.',
    type: 'Договор',
    status: 'Просрочено',
    avatar: 'ФО',
    avatarColor: '#722ed1',
  },
];

const todayTasks = [
  {
    id: '1',
    title: 'Узнать решение',
    time: 'Вчера, 09:00 - 09:00',
    icon: <MessageOutlined className="dashboard-page__task-icon" />,
  },
];

const newsItems = [
  {
    id: '1',
    category: 'Новость',
    title: 'Новый рекорд продаж в ноябре 2024',
  },
  {
    id: '2',
    category: 'Новость',
    title: 'Новогодняя акция: двойные бонусы',
  },
  {
    id: '3',
    category: 'Новость',
    title: 'Обновление продукта "Семейный капитал"',
  },
  {
    id: '4',
    category: 'Новость',
    title: 'Итоги года: лучшие агенты получат призы',
  },
  {
    id: '5',
    category: 'Новость',
    title: 'Новый онлайн-курс по работе с возражениями',
  },
];

export default function DashboardPage() {
  return (
    <CrmLayout>
      <div className="dashboard-page">
        <div className="dashboard-page__header">
          <Title level={3} className="dashboard-page__greeting">
            Доброе утро, Иван! 👋
          </Title>
        </div>

        <Card className="dashboard-page__plan-card">
          <Text strong>План от куратора на месяц</Text>
          <Flex className="dashboard-page__plan-stats" gap="large" align="center">
            <div>
              <Text type="secondary" className="dashboard-page__plan-label">0 из 0 новых лиц</Text>
            </div>
            <Divider type="vertical" className="dashboard-page__divider" />
            <div>
              <Text type="secondary" className="dashboard-page__plan-label">0 из 0 отправлено КП</Text>
            </div>
            <Divider type="vertical" className="dashboard-page__divider" />
            <div>
              <Text type="secondary" className="dashboard-page__plan-label">0 из 0 заключено сделок</Text>
            </div>
            <Divider type="vertical" className="dashboard-page__divider" />
            <div>
              <Text type="secondary" className="dashboard-page__plan-label">Факт / план по премии: 0 ₽ / 0 ₽</Text>
            </div>
          </Flex>
        </Card>

        <Card className="dashboard-page__tasks-card">
          <Title level={5} className="dashboard-page__section-title">Задачи на сегодня</Title>
          {todayTasks.map(task => (
            <Flex key={task.id} className="dashboard-page__task-item" align="center" gap="small">
              {task.icon}
              <div>
                <Text>{task.title}</Text>
                <Text type="secondary" className="dashboard-page__task-time">
                  <ClockCircleOutlined className="dashboard-page__clock-icon" />
                  {task.time}
                </Text>
              </div>
            </Flex>
          ))}
        </Card>

        <Flex wrap gap={24} className="dashboard-page__two-column">
          <Flex vertical style={{ flex: '1 1 calc(50% - 12px)', minWidth: 300 }}>
            <Card title="Рекомендуем к изучению" className="dashboard-page__card">
              <List
                itemLayout="horizontal"
                dataSource={studyRecommendations}
                renderItem={(item) => (
                  <List.Item>
                    <Flex className="dashboard-page__study-item" align="center" gap="middle">
                      <div
                        className="dashboard-page__study-icon-wrapper"
                        style={{ background: item.color }}
                      >
                        {item.icon}
                      </div>
                      <div className="dashboard-page__study-content">
                        <Text strong className="dashboard-page__study-title">{item.title}</Text>
                        <Text type="secondary" className="dashboard-page__study-type">{item.type}</Text>
                      </div>
                    </Flex>
                  </List.Item>
                )}
              />
            </Card>
          </Flex>

          <Flex vertical style={{ flex: '1 1 calc(50% - 12px)', minWidth: 300 }}>
            <Card title="Скоро платёж" className="dashboard-page__card">
              <List
                itemLayout="horizontal"
                dataSource={upcomingPayments}
                renderItem={(item) => (
                  <List.Item>
                    <Flex className="dashboard-page__payment-item" align="center" gap="small">
                      <Avatar style={{ backgroundColor: item.avatarColor }}>{item.avatar}</Avatar>
                      <div className="dashboard-page__payment-content">
                        <Text strong className="dashboard-page__payment-name">{item.name}</Text>
                        <Text type="secondary" className="dashboard-page__payment-type">{item.type}</Text>
                      </div>
                      <Text type="danger" className="dashboard-page__payment-status">{item.status}</Text>
                    </Flex>
                  </List.Item>
                )}
              />
            </Card>
          </Flex>
        </Flex>

        <Flex wrap gap={24} className="dashboard-page__progress-row">
          <Flex vertical style={{ flex: '1 1 calc(50% - 12px)', minWidth: 300 }}>
            <Card title="План по образованию" className="dashboard-page__card">
              <div className="dashboard-page__progress-wrapper">
                <Progress percent={84} strokeColor="#52c41a" showInfo={false} />
              </div>
              <Flex>
                <Flex vertical style={{ flex: 1 }}>
                  <Title level={4} className="dashboard-page__stat-number">3 из 12</Title>
                  <Text type="secondary" className="dashboard-page__stat-label">Пройдено курсов</Text>
                </Flex>
                <Flex vertical style={{ flex: 1 }}>
                  <Title level={4} className="dashboard-page__stat-number">84%</Title>
                  <Text type="secondary" className="dashboard-page__stat-label">Средний балл</Text>
                </Flex>
              </Flex>
            </Card>
          </Flex>

          <Flex vertical style={{ flex: '1 1 calc(50% - 12px)', minWidth: 300 }}>
            <Card title="Мои начисления" className="dashboard-page__card">
              <Flex gap={16}>
                <Flex vertical style={{ flex: 1 }}>
                  <Title level={4} className="dashboard-page__stat-number">47 тыс. ₽</Title>
                  <Text type="secondary" className="dashboard-page__stat-label">Текущий заработок</Text>
                </Flex>
                <Flex vertical style={{ flex: 1 }}>
                  <Title level={4} className="dashboard-page__stat-number">14 тыс. ₽</Title>
                  <Text type="secondary" className="dashboard-page__stat-label">К выплате</Text>
                </Flex>
                <Flex vertical style={{ flex: 1 }}>
                  <Title level={4} className="dashboard-page__stat-number">33 тыс. ₽</Title>
                  <Text type="secondary" className="dashboard-page__stat-label">Выплачено</Text>
                </Flex>
              </Flex>
              <Divider className="dashboard-page__earnings-divider" />
              <Flex gap={16}>
                <Flex vertical style={{ flex: 1 }}>
                  <Title level={4} className="dashboard-page__stat-number">4%</Title>
                  <Text type="secondary" className="dashboard-page__stat-label">КВ</Text>
                </Flex>
                <Flex vertical style={{ flex: 1 }}>
                  <Title level={4} className="dashboard-page__stat-number">89%</Title>
                  <Text type="secondary" className="dashboard-page__stat-label">Рейтинг</Text>
                </Flex>
              </Flex>
            </Card>
          </Flex>
        </Flex>

        <Card
          title="Новости"
          extra={
            <Button type="text" icon={<RightOutlined />}>
              Все новости
            </Button>
          }
          className="dashboard-page__news-card"
        >
          <Flex className="dashboard-page__news-list" gap="middle">
            {newsItems.map((news) => (
              <Card
                key={news.id}
                hoverable
                className="dashboard-page__news-item"
                size="small"
              >
                <Text type="secondary" className="dashboard-page__news-category">{news.category}</Text>
                <Text strong className="dashboard-page__news-title">{news.title}</Text>
              </Card>
            ))}
          </Flex>
        </Card>
      </div>
    </CrmLayout>
  );
}
