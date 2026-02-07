'use client';

import React from 'react';
import {
  Card,
  Typography,
  Row,
  Col,
  Tabs,
  Tag,
} from 'antd';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface NewsItem {
  id: number;
  category: string;
  date: string;
  title: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    category: 'Компания',
    date: '15 декабря 2024',
    title: 'Новый рекорд продаж в ноябре 2024',
  },
  {
    id: 2,
    category: 'Компания',
    date: '12 декабря 2024',
    title: 'Итоги года: лучшие специалисты получат призы',
  },
  {
    id: 3,
    category: 'Компания',
    date: '5 декабря 2024',
    title: 'Партнёрство с ведущими банками расширено',
  },
  {
    id: 4,
    category: 'Компания',
    date: '1 декабря 2024',
    title: 'Обновление мобильного приложения',
  },
];

const NewsCard = ({ item }: { item: NewsItem }) => (
  <Card style={{ height: '100%' }}>
    <Tag color="blue" style={{ marginBottom: 12 }}>
      {item.category}
    </Tag>
    <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
      {item.date}
    </Text>
    <Title level={5} style={{ margin: 0 }}>
      {item.title}
    </Title>
  </Card>
);

export default function NewsPage() {
  return (
    <div className="news-page">
      <Title level={2} style={{ marginBottom: 8 }}>
        Новости
      </Title>
      <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
        Новости компании и бонусные программы
      </Text>

      <Tabs defaultActiveKey="company">
        <TabPane tab="Компания" key="company">
          <Row gutter={[24, 24]}>
            {newsData.map((item) => (
              <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                <NewsCard item={item} />
              </Col>
            ))}
          </Row>
        </TabPane>
        <TabPane tab="Обновления продуктов" key="products">
          <Card>
            <Text>Обновления продуктов (в разработке)</Text>
          </Card>
        </TabPane>
        <TabPane tab="Акции и бонусы" key="bonuses">
          <Card>
            <Text>Акции и бонусы (в разработке)</Text>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
}
