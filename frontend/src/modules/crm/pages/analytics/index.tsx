'use client';

import React from 'react';
import {
  Card,
  Typography,
  Row,
  Col,
  Statistic,
  Tag,
  Progress,
  Space,
} from 'antd';
import {
  CloseCircleOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const statsCards = [
  { title: 'Выполнено на 0%', value: '0 ₽' },
  { title: '0 сделок закрыто', value: '0 ₽' },
  { title: '14800% от плана', value: '148/0' },
  { title: '500% от плана', value: '5/0' },
  { title: '0% от плана', value: '0/0' },
];

const funnelData = [
  { stage: 'Новые клиенты', count: 148 },
  { stage: 'Квалификация', count: 43 },
  { stage: 'КП', count: 1 },
  { stage: 'Переговоры', count: 1 },
  { stage: 'Оформление', count: 1 },
  { stage: 'Подписание', count: 1 },
  { stage: 'Оплата', count: 1 },
];

export default function AnalyticsPage() {
  return (
    <div className="analytics-page">
      <Title level={2} style={{ marginBottom: 24 }}>
        Аналитика
      </Title>

      {/* Фильтры */}
      <Row gutter={8} style={{ marginBottom: 24 }}>
        <Col>
          <Tag closable color="blue">Текущий месяц</Tag>
        </Col>
        <Col>
          <Tag closable color="blue">Все продукты</Tag>
        </Col>
      </Row>

      {/* Статистика */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {statsCards.map((card, index) => (
          <Col key={index} xs={12} sm={8} md={6} lg={4}>
            <Card>
              <Statistic
                title={<Text style={{ fontSize: 12 }}>{card.title}</Text>}
                value={card.value}
                valueStyle={{ fontSize: 20 }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Графики */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={8}>
          <Card title="Скоро закроются">
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Progress
                type="circle"
                percent={50}
                strokeColor="#52c41a"
                format={() => '2'}
                size={120}
              />
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Угроза срыва">
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Progress
                type="circle"
                percent={0}
                strokeColor="#ff4d4f"
                format={() => '0'}
                size={120}
              />
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Воронка по сделке">
            <div style={{ padding: '20px 0' }}>
              {funnelData.map((item, index) => (
                <Row
                  key={index}
                  justify="space-between"
                  style={{
                    marginBottom: 12,
                    padding: '8px 0',
                    borderBottom: index < funnelData.length - 1 ? '1px solid #f0f0f0' : 'none',
                  }}
                >
                  <Text>{item.stage}</Text>
                  <Text strong>{item.count}</Text>
                </Row>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Прогноз выполнения плана */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Card title="Новые сделки по месяцам">
            <div style={{ height: 200, background: '#f5f5f5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Text type="secondary">График (в разработке)</Text>
            </div>
            <Row justify="center" style={{ marginTop: 16 }}>
              <Space>
                <span><span style={{ color: '#1890ff' }}>●</span> Количество сделок</span>
                <span><span style={{ color: '#52c41a' }}>—</span> План</span>
              </Space>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Закрыто / Сорвалось по месяцам">
            <div style={{ height: 200, background: '#f5f5f5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Text type="secondary">График (в разработке)</Text>
            </div>
            <Row justify="center" style={{ marginTop: 16 }}>
              <Space>
                <span><span style={{ color: '#1890ff' }}>●</span> Выиграно</span>
                <span><span style={{ color: '#ff4d4f' }}>●</span> Проиграно</span>
              </Space>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Прогноз выполнения плана - большой график */}
      <Card title="Прогноз выполнения плана">
        <div style={{ height: 300, background: '#f5f5f5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Text type="secondary">График прогноза (в разработке)</Text>
        </div>
        <Row justify="center" style={{ marginTop: 16 }}>
          <Space>
            <span><span style={{ color: '#1890ff' }}>●</span> Факт за этот год</span>
            <span><span style={{ color: '#faad14' }}>●</span> Взвешенная воронка</span>
            <span><span style={{ color: '#1890ff' }}>—</span> План</span>
            <span><span style={{ color: '#ff4d4f' }}>—</span> Общий прогноз</span>
          </Space>
        </Row>
      </Card>
    </div>
  );
}
