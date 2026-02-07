'use client';

import React from 'react';
import {
  Typography,
  Card,
  Row,
  Col,
  Progress,
  Avatar,
  Badge,
  List,
  Button,
  Space,
  Divider,
} from 'antd';
import {
  BookOutlined,
  RightOutlined,
  MessageOutlined,
  PlayCircleOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  RiseOutlined,
  DollarOutlined,
  UserOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import CrmLayout from '../../components/layout';

const { Title, Text } = Typography;

// Моковые данные
const studyRecommendations = [
  {
    id: '1',
    title: 'Быстрый старт: первые шаги агента',
    type: 'Обязательный',
    icon: <PlayCircleOutlined style={{ color: '#fa8c16', fontSize: 24 }} />,
    color: '#fff7e6',
  },
  {
    id: '2',
    title: 'Этика и комплаенс',
    type: 'Обязательный',
    icon: <BookOutlined style={{ color: '#fa8c16', fontSize: 24 }} />,
    color: '#fff7e6',
  },
  {
    id: '3',
    title: 'Техники продаж',
    type: 'Рекомендованный',
    icon: <RiseOutlined style={{ color: '#1890ff', fontSize: 24 }} />,
    color: '#e6f7ff',
  },
];

const upcomingPayments = [
  {
    id: '1',
    name: 'Константинопольский К.К.',
    type: 'Договор',
    status: 'Просрочено',
    statusColor: 'red',
    avatar: 'КК',
    avatarColor: '#52c41a',
  },
  {
    id: '2',
    name: 'Васильков К.А.',
    type: 'Договор',
    status: 'Просрочено',
    statusColor: 'red',
    avatar: 'ВК',
    avatarColor: '#eb2f96',
  },
  {
    id: '3',
    name: 'Фёдорова О.С.',
    type: 'Договор',
    status: 'Просрочено',
    statusColor: 'red',
    avatar: 'ФО',
    avatarColor: '#722ed1',
  },
];

const todayTasks = [
  {
    id: '1',
    title: 'Узнать решение',
    time: 'Вчера, 09:00 - 09:00',
    icon: <MessageOutlined style={{ color: '#1890ff' }} />,
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
      <div style={{ maxWidth: 1200 }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <Title level={3} style={{ margin: 0 }}>
            Доброе утро, Иван! 👋
          </Title>
        </div>

        {/* Curator Plan */}
        <Card style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text strong>План от куратора на месяц</Text>
          </div>
          <Space size="large" split={<Divider type="vertical" style={{ height: 40 }} />}>
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>0 из 0 новых лиц</Text>
            </div>
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>0 из 0 отправлено КП</Text>
            </div>
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>0 из 0 заключено сделок</Text>
            </div>
            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>Факт / план по премии: 0 ₽ / 0 ₽</Text>
            </div>
          </Space>
        </Card>

        {/* Today's Tasks */}
        <Card style={{ marginBottom: 24 }}>
          <Title level={5} style={{ marginBottom: 16 }}>Задачи на сегодня</Title>
          {todayTasks.map(task => (
            <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0' }}>
              {task.icon}
              <div>
                <Text style={{ display: 'block' }}>{task.title}</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  <ClockCircleOutlined style={{ marginRight: 4 }} />
                  {task.time}
                </Text>
              </div>
            </div>
          ))}
        </Card>

        {/* Two Column Layout */}
        <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
          {/* Study Recommendations */}
          <Col xs={24} lg={12}>
            <Card title="Рекомендуем к изучению">
              <List
                itemLayout="horizontal"
                dataSource={studyRecommendations}
                renderItem={(item) => (
                  <List.Item>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%' }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 8,
                          background: item.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {item.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <Text strong style={{ display: 'block' }}>{item.title}</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>{item.type}</Text>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          {/* Upcoming Payments */}
          <Col xs={24} lg={12}>
            <Card title="Скоро платёж">
              <List
                itemLayout="horizontal"
                dataSource={upcomingPayments}
                renderItem={(item) => (
                  <List.Item>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%' }}>
                      <Avatar style={{ backgroundColor: item.avatarColor }}>{item.avatar}</Avatar>
                      <div style={{ flex: 1 }}>
                        <Text strong style={{ display: 'block' }}>{item.name}</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>{item.type}</Text>
                      </div>
                      <Text type="danger" style={{ fontSize: 12 }}>{item.status}</Text>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        {/* Progress Row */}
        <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
          {/* Education Progress */}
          <Col xs={24} lg={12}>
            <Card title="План по образованию">
              <div style={{ marginBottom: 16 }}>
                <Progress percent={84} strokeColor="#52c41a" showInfo={false} />
              </div>
              <Row>
                <Col span={12}>
                  <Title level={4} style={{ margin: 0 }}>3 из 12</Title>
                  <Text type="secondary" style={{ fontSize: 12 }}>Пройдено курсов</Text>
                </Col>
                <Col span={12}>
                  <Title level={4} style={{ margin: 0 }}>84%</Title>
                  <Text type="secondary" style={{ fontSize: 12 }}>Средний балл</Text>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* My Earnings */}
          <Col xs={24} lg={12}>
            <Card title="Мои начисления">
              <Row gutter={16}>
                <Col span={8}>
                  <Title level={4} style={{ margin: 0 }}>47 тыс. ₽</Title>
                  <Text type="secondary" style={{ fontSize: 12 }}>Текущий заработок</Text>
                </Col>
                <Col span={8}>
                  <Title level={4} style={{ margin: 0 }}>14 тыс. ₽</Title>
                  <Text type="secondary" style={{ fontSize: 12 }}>К выплате</Text>
                </Col>
                <Col span={8}>
                  <Title level={4} style={{ margin: 0 }}>33 тыс. ₽</Title>
                  <Text type="secondary" style={{ fontSize: 12 }}>Выплачено</Text>
                </Col>
              </Row>
              <Divider style={{ margin: '16px 0' }} />
              <Row gutter={16}>
                <Col span={8}>
                  <Title level={4} style={{ margin: 0 }}>4%</Title>
                  <Text type="secondary" style={{ fontSize: 12 }}>КВ</Text>
                </Col>
                <Col span={8}>
                  <Title level={4} style={{ margin: 0 }}>89%</Title>
                  <Text type="secondary" style={{ fontSize: 12 }}>Рейтинг</Text>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* News Section */}
        <Card
          title="Новости"
          extra={
            <Button type="text" icon={<RightOutlined />}>
              Все новости
            </Button>
          }
        >
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
            {newsItems.map((news) => (
              <Card
                key={news.id}
                hoverable
                style={{ minWidth: 280, flexShrink: 0 }}
                size="small"
              >
                <Text type="secondary" style={{ fontSize: 11, display: 'block', marginBottom: 8 }}>
                  {news.category}
                </Text>
                <Text strong style={{ display: 'block' }}>
                  {news.title}
                </Text>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </CrmLayout>
  );
}
