'use client';

import React from 'react';
import {
  Card,
  Typography,
  Row,
  Col,
  Statistic,
} from 'antd';

const { Title, Text } = Typography;

export default function GoalsPage() {
  return (
    <div className="goals-page">
      <Title level={2} style={{ marginBottom: 8 }}>
        Мои цели
      </Title>
      <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
        Ваши планы на период
      </Text>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Квартал">
            <Row gutter={16}>
              <Col xs={12} sm={6}>
                <div style={{ marginBottom: 8 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>Клиенты</Text>
                </div>
                <Text strong style={{ fontSize: 24 }}>30</Text>
              </Col>
              <Col xs={12} sm={6}>
                <div style={{ marginBottom: 8 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>КП</Text>
                </div>
                <Text strong style={{ fontSize: 24 }}>15</Text>
              </Col>
              <Col xs={12} sm={6}>
                <div style={{ marginBottom: 8 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>Договоры</Text>
                </div>
                <Text strong style={{ fontSize: 24 }}>10</Text>
              </Col>
              <Col xs={12} sm={6}>
                <div style={{ marginBottom: 8 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>Сборы</Text>
                </div>
                <Text strong style={{ fontSize: 24 }}>500К₽</Text>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Год">
            <Row gutter={16}>
              <Col xs={12} sm={6}>
                <div style={{ marginBottom: 8 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>Клиенты</Text>
                </div>
                <Text strong style={{ fontSize: 24 }}>120</Text>
              </Col>
              <Col xs={12} sm={6}>
                <div style={{ marginBottom: 8 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>КП</Text>
                </div>
                <Text strong style={{ fontSize: 24 }}>60</Text>
              </Col>
              <Col xs={12} sm={6}>
                <div style={{ marginBottom: 8 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>Договоры</Text>
                </div>
                <Text strong style={{ fontSize: 24 }}>40</Text>
              </Col>
              <Col xs={12} sm={6}>
                <div style={{ marginBottom: 8 }}>
                  <Text type="secondary" style={{ fontSize: 12 }}>Сборы</Text>
                </div>
                <Text strong style={{ fontSize: 24 }}>2М₽</Text>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
