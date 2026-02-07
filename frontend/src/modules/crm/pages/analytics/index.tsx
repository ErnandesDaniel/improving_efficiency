'use client';

import React from 'react';
import {
  Typography,
  Card,
  Tag,
  Flex,
  Progress,
} from 'antd';
import CrmLayout from '../../components/layout';
import './index.scss';

const { Title, Text } = Typography;

const mainStats = [
  { label: 'Выполнено на 0%', value: '0 ₽', subtext: '' },
  { label: '0 сделок закрыто', value: '0 ₽', subtext: '' },
  { label: '14800% от плана', value: '148/0', subtext: '' },
  { label: '500% от плана', value: '5/0', subtext: '' },
  { label: '0% от плана', value: '0/0', subtext: '' },
];

const funnelData = [
  { stage: 'Новые лиды', count: 148 },
  { stage: 'Квалификация', count: 43 },
  { stage: 'КП', count: 1 },
  { stage: 'Переговоры', count: 1 },
  { stage: 'Оформление', count: 1 },
  { stage: 'Подписание', count: 1 },
  { stage: 'Оплата', count: 1 },
];

export default function AnalyticsPage() {
  return (
    <CrmLayout>
      <div className="analytics-page">
        <Title level={3} className="analytics-page__title">Аналитика</Title>

        <Flex className="analytics-page__filters" gap="small">
          <Tag closable>Текущий месяц</Tag>
          <Tag closable>Все продукты</Tag>
        </Flex>

        <Flex wrap gap={16} className="analytics-page__stats">
          {mainStats.map((stat, index) => (
            <Flex key={index} vertical style={{ flex: '1 1 calc(16.66% - 14px)', minWidth: 160 }}>
              <Card className="analytics-page__stat-card">
                <Title level={4} className="analytics-page__stat-value">{stat.value}</Title>
                <Text type="secondary" className="analytics-page__stat-label">{stat.label}</Text>
              </Card>
            </Flex>
          ))}
        </Flex>

        <Flex wrap gap={24} className="analytics-page__charts">
          <Flex vertical style={{ flex: '1 1 calc(33.33% - 16px)', minWidth: 280 }}>
            <Card title="Скоро закроются" className="analytics-page__chart-card">
              <Flex vertical align="center" justify="center" className="analytics-page__progress-circle">
                <Progress type="circle" percent={75} format={() => '2'} strokeColor="#52c41a" />
              </Flex>
            </Card>
          </Flex>
          <Flex vertical style={{ flex: '1 1 calc(33.33% - 16px)', minWidth: 280 }}>
            <Card title="Угроза срыва" className="analytics-page__chart-card">
              <Flex vertical align="center" justify="center" className="analytics-page__progress-circle">
                <Progress type="circle" percent={0} format={() => '0'} strokeColor="#ff4d4f" />
              </Flex>
            </Card>
          </Flex>
          <Flex vertical style={{ flex: '1 1 calc(33.33% - 16px)', minWidth: 280 }}>
            <Card title="Воронка по сделке" className="analytics-page__chart-card">
              <div className="analytics-page__funnel">
                {funnelData.map((item, index) => (
                  <Flex key={index} className="analytics-page__funnel-item" justify="space-between">
                    <Text>{item.stage}</Text>
                    <Text strong>{item.count}</Text>
                  </Flex>
                ))}
              </div>
            </Card>
          </Flex>
        </Flex>
      </div>
    </CrmLayout>
  );
}
