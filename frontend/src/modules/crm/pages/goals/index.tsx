'use client';

import React from 'react';
import {
  Typography,
  Card,
  Flex,
  Row,
  Col,
} from 'antd';
import CrmLayout from '../../components/layout';
import './index.scss';

const { Title, Text } = Typography;

const quarterGoals = {
  leads: 30,
  kp: 15,
  contracts: 10,
  collection: '500K₽',
};

const yearGoals = {
  leads: 120,
  kp: 60,
  contracts: 40,
  collection: '2M₽',
};

const GoalCard = ({ title, stats }: { title: string; stats: typeof quarterGoals }) => (
  <Card className="goals-page__goal-card">
    <Text strong className="goals-page__goal-title">{title}</Text>
    <Flex className="goals-page__goal-stats" justify="space-between">
      <div className="goals-page__stat">
        <Text type="secondary" className="goals-page__stat-label">Лиды</Text>
        <Title level={4} className="goals-page__stat-value">{stats.leads}</Title>
      </div>
      <div className="goals-page__stat">
        <Text type="secondary" className="goals-page__stat-label">КП</Text>
        <Title level={4} className="goals-page__stat-value">{stats.kp}</Title>
      </div>
      <div className="goals-page__stat">
        <Text type="secondary" className="goals-page__stat-label">Договоры</Text>
        <Title level={4} className="goals-page__stat-value">{stats.contracts}</Title>
      </div>
      <div className="goals-page__stat">
        <Text type="secondary" className="goals-page__stat-label">Сборы</Text>
        <Title level={4} className="goals-page__stat-value">{stats.collection}</Title>
      </div>
    </Flex>
  </Card>
);

export default function GoalsPage() {
  return (
    <CrmLayout>
      <div className="goals-page">
        <div className="goals-page__header">
          <Title level={3} className="goals-page__title">Мои цели</Title>
          <Text type="secondary" className="goals-page__subtitle">
            Ваши планы на период
          </Text>
        </div>

        <Row gutter={[24, 24]} className="goals-page__grid">
          <Col xs={24} md={12}>
            <GoalCard title="Квартал" stats={quarterGoals} />
          </Col>
          <Col xs={24} md={12}>
            <GoalCard title="Год" stats={yearGoals} />
          </Col>
        </Row>
      </div>
    </CrmLayout>
  );
}
