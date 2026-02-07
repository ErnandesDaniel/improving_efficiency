'use client';

import React from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Progress,
  Button,
  Badge,
  Avatar,
  List,
  Tag,
  Flex,
  Space,
} from 'antd';
import {
  CalendarOutlined,
  BookOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const statsCards = [
  { title: '0 из 0 новых лидов', value: '0', label: 'новых лидов' },
  { title: '0 из 0 отправлено предложений', value: '0', label: 'отправлено' },
  { title: '0 из 0 заключено сделок', value: '0', label: 'заключено сделок' },
  { title: 'Факт / план по выплатам', value: '0 ₽ / 0 ₽', label: 'выплаты' },
];

const todayTasks = [
  {
    id: 1,
    type: 'Встреча',
    title: 'Узнать решение',
    time: 'Вчера, 09:00 - 09:00',
  },
];

const recommendedCourses = [
  {
    id: 1,
    title: 'Быстрый старт: первые шаги специалиста',
    type: 'Обязательный',
    color: 'orange',
  },
  {
    id: 2,
    title: 'Этика и комплаенс',
    type: 'Обязательный',
    color: 'orange',
  },
  {
    id: 3,
    title: 'Техники продаж',
    type: 'Рекомендованный',
    color: 'blue',
  },
];

const upcomingPayments = [
  {
    id: 1,
    name: 'Константинопольский К.К.',
    type: 'Договор',
    status: 'Просрочено',
    statusColor: 'red',
    avatar: 'КК',
    avatarColor: '#52c41a',
  },
  {
    id: 2,
    name: 'Васильев К.А.',
    type: 'Договор',
    status: 'Просрочено',
    statusColor: 'red',
    avatar: 'ВК',
    avatarColor: '#eb2f96',
  },
  {
    id: 3,
    name: 'Фёдорова О.С.',
    type: 'Договор',
    status: 'Просрочено',
    statusColor: 'red',
    avatar: 'ФО',
    avatarColor: '#722ed1',
  },
];

const newsItems = [
  {
    id: 1,
    tag: 'Новость',
    title: 'Новый рекорд продаж в ноябре 2024',
  },
  {
    id: 2,
    tag: 'Новость',
    title: 'Новогодняя акция: двойные бонусы',
  },
  {
    id: 3,
    tag: 'Новость',
    title: 'Обновление продукта "Семейный капитал"',
  },
  {
    id: 4,
    tag: 'Новость',
    title: 'Итоги года: лучшие специалисты получат призы',
  },
  {
    id: 5,
    tag: 'Новость',
    title: 'Новый онлайн-курс по работе с возражениями',
  },
];

export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      <Title level={2} style={{ marginBottom: 24 }}>
        Доброе утро, Иван! 👋
      </Title>

      {/* План от куратора */}
      <Card style={{ marginBottom: 24 }}>
        <Title level={5} style={{ marginBottom: 16 }}>
          План от куратора на месяц
        </Title>
        <Row gutter={[16, 16]}>
          {statsCards.map((card, index) => (
            <Col key={index} xs={12} sm={12} md={6} lg={6}>
              <div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {card.title}
                </Text>
                <div style={{ marginTop: 8 }}>
                  <Text strong style={{ fontSize: 24 }}>
                    {card.value}
                  </Text>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Задачи на сегодня */}
      <Card style={{ marginBottom: 24 }}>
        <Title level={5} style={{ marginBottom: 16 }}>
          Задачи на сегодня
        </Title>
        <List
          itemLayout="horizontal"
          dataSource={todayTasks}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<CalendarOutlined />} />}
                title={item.type}
                description={
                  <div>
                    <Text strong>{item.title}</Text>
                    <br />
                    <Text type="secondary">{item.time}</Text>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      {/* Рекомендуем к изучению и Скоро платежи */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Card title="Рекомендуем к изучению">
            <List
              itemLayout="horizontal"
              dataSource={recommendedCourses}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor:
                            item.color === 'orange' ? '#fa8c16' : '#1890ff',
                        }}
                      >
                        <BookOutlined />
                      </Avatar>
                    }
                    title={item.title}
                    description={<Tag color={item.color}>{item.type}</Tag>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Скоро платежи">
            <List
              itemLayout="horizontal"
              dataSource={upcomingPayments}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Tag color={item.statusColor} key="status">
                      {item.status}
                    </Tag>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar style={{ backgroundColor: item.avatarColor }}>
                        {item.avatar}
                      </Avatar>
                    }
                    title={item.name}
                    description={item.type}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* План по образованию и Мои начисления */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Card title="План по образованию">
            <Progress percent={84} status="active" strokeColor="#52c41a" />
            <Row justify="space-between" style={{ marginTop: 8 }}>
              <Text>3 из 12</Text>
              <Text type="secondary">84%</Text>
            </Row>
            <Row justify="space-between" style={{ marginTop: 4 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Пройдено курсов
              </Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Средний балл
              </Text>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Мои начисления">
            <Row gutter={16}>
              <Col span={8}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Текущий заработок
                </Text>
                <div>
                  <Text strong style={{ fontSize: 20 }}>
                    47 тыс. ₽
                  </Text>
                </div>
              </Col>
              <Col span={8}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  К выплате
                </Text>
                <div>
                  <Text strong style={{ fontSize: 20 }}>
                    14 тыс. ₽
                  </Text>
                </div>
              </Col>
              <Col span={8}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Выплачено
                </Text>
                <div>
                  <Text strong style={{ fontSize: 20 }}>
                    33 тыс. ₽
                  </Text>
                </div>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={8}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Бонус
                </Text>
                <div>
                  <Text strong>4%</Text>
                </div>
              </Col>
              <Col span={8}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Рейтинг
                </Text>
                <div>
                  <Text strong>89%</Text>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Новости */}
      <Card
        title="Новости"
        extra={
          <Button type="link" icon={<ArrowRightOutlined />}>
            Все новости
          </Button>
        }
      >
        <Row gutter={[8, 8]}>
          {newsItems.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={8} lg={6} xl={4}>
              <div style={{ padding: 12, background: '#f6ffed', borderRadius: 8 }}>
                <Tag color="green">{item.tag}</Tag>
                <Text style={{ display: 'block', marginTop: 8, fontSize: 12 }}>
                  {item.title}
                </Text>
              </div>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
}
