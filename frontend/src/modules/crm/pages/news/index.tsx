'use client';

import React, { useState } from 'react';
import {
  Typography,
  Card,
  Tabs,
  Tag,
  Button,
  Flex,
} from 'antd';
import {
  RightOutlined,
} from '@ant-design/icons';
import CrmLayout from '../../components/layout';
import './index.scss';

const { Title, Text } = Typography;

const companyNews = [
  {
    id: '1',
    category: 'Компания',
    date: '15 декабря 2024',
    title: 'Новый рекорд продаж в ноябре 2024',
  },
  {
    id: '2',
    category: 'Компания',
    date: '12 декабря 2024',
    title: 'Итоги года: лучшие агенты получат призы',
  },
  {
    id: '3',
    category: 'Компания',
    date: '5 декабря 2024',
    title: 'Партнёрство с ведущими банками расширено',
  },
  {
    id: '4',
    category: 'Компания',
    date: '1 декабря 2024',
    title: 'Обновление мобильного приложения агента',
  },
];

const productUpdates = [
  {
    id: '1',
    category: 'Обновление',
    date: '10 декабря 2024',
    title: 'Новые условия по программе "Семейный капитал"',
  },
  {
    id: '2',
    category: 'Обновление',
    date: '8 декабря 2024',
    title: 'Изменения в тарифах на 2025 год',
  },
];

const promotions = [
  {
    id: '1',
    category: 'Акция',
    date: '1 декабря 2024',
    title: 'Новогодняя акция: двойные бонусы',
  },
  {
    id: '2',
    category: 'Акция',
    date: '15 ноября 2024',
    title: 'Специальные условия для новых агентов',
  },
];

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState('company');

  const getNewsForTab = () => {
    switch (activeTab) {
      case 'company':
        return companyNews;
      case 'products':
        return productUpdates;
      case 'promotions':
        return promotions;
      default:
        return companyNews;
    }
  };

  const newsItems = getNewsForTab();

  return (
    <CrmLayout>
      <div className="news-page">
        <div className="news-page__header">
          <Title level={3} className="news-page__title">Новости</Title>
          <Text type="secondary" className="news-page__subtitle">
            Новости компании и бонусные программы
          </Text>
        </div>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="news-page__tabs"
          items={[
            { key: 'company', label: 'Компания' },
            { key: 'products', label: 'Обновления продуктов' },
            { key: 'promotions', label: 'Акции и бонусы' },
          ]}
        />

        <Flex wrap gap={24} className="news-page__grid">
          {newsItems.map((news) => (
            <Flex key={news.id} vertical style={{ flex: '1 1 calc(25% - 18px)', minWidth: 260 }}>
              <Card hoverable className="news-page__card">
                <Flex className="news-page__card-header" gap="small">
                  <Tag color="blue" className="news-page__category">{news.category}</Tag>
                  <Text type="secondary" className="news-page__date">{news.date}</Text>
                </Flex>
                <Text strong className="news-page__card-title">{news.title}</Text>
              </Card>
            </Flex>
          ))}
        </Flex>

        <Flex className="news-page__footer" justify="center">
          <Button type="text" icon={<RightOutlined />}>
            Все новости
          </Button>
        </Flex>
      </div>
    </CrmLayout>
  );
}
