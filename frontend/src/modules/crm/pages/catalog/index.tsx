'use client';

import React from 'react';
import {
  Card,
  Typography,
  Row,
  Col,
  Input,
  Tag,
  Button,
  Space,
} from 'antd';
import {
  SearchOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface Product {
  id: number;
  type: string;
  commission: string;
  name: string;
  description: string;
  features: string[];
  audience: string;
  minAmount: string;
}

const productsData: Product[] = [
  {
    id: 1,
    type: 'Базовый',
    commission: 'Комиссия 12%',
    name: 'Премиум',
    description: 'Программа накопления с защитой — долгосрочные инвестиции...',
    features: ['Защита + накопление', 'Поддержка при критических ситуациях', 'Гибкие условия'],
    audience: 'Взрослые 16-70 лет, заботящиеся о защите семьи',
    minAmount: '12000',
  },
  {
    id: 2,
    type: 'Базовый',
    commission: 'Комиссия 12%',
    name: 'Премиум 7+',
    description: 'Программа накопления с дополнительным доходом...',
    features: ['Защита + накопление', 'Дополнительный доход', 'Программа поддержки'],
    audience: 'Взрослые 16-63 лет',
    minAmount: '12000',
  },
  {
    id: 3,
    type: 'Базовый',
    commission: 'Комиссия 12%',
    name: 'Премиум Гарант',
    description: 'Программа накопления для короткого срока...',
    features: ['Защита + накопление', 'Программа поддержки', 'Базовый пакет'],
    audience: 'Взрослые 16-65 лет',
    minAmount: '12000',
  },
  {
    id: 4,
    type: 'Базовый',
    commission: 'Комиссия 10%',
    name: 'Гранде',
    description: 'Программа пенсионного накопления с периодом...',
    features: ['Пенсионная программа', 'Период накопления 9-30 лет', 'Гарантированные выплаты 5-20 лет'],
    audience: 'Взрослые 18-61 лет, планирующие пенсию',
    minAmount: '12000',
  },
  {
    id: 5,
    type: 'Базовый',
    commission: 'Комиссия 12%',
    name: 'Солнышко',
    description: 'Накопления к событию ребенка + защита семьи...',
    features: ['Накопления к событию ребенка', 'Защита для всей семьи', 'Программа поддержки детей'],
    audience: 'Родители с детьми до 18 лет',
    minAmount: '12000',
  },
  {
    id: 6,
    type: 'Базовый',
    commission: 'Комиссия 10%',
    name: 'Оптим',
    description: 'Доступная программа накопления без медицинских проверок....',
    features: ['Накопление', 'Возврат средств', 'Базовый пакет услуг'],
    audience: 'Все категории клиентов 18-70 лет',
    minAmount: '12000',
  },
  {
    id: 7,
    type: 'Базовый',
    commission: 'Комиссия 12%',
    name: 'Солнышко 7+',
    description: 'Накопления к событию ребенка с дополнительным доходом...',
    features: ['Накопления к событию ребенка', 'Дополнительный доход', 'Защита для семьи'],
    audience: 'Родители 18-63 лет с детьми до 18 лет',
    minAmount: '12000',
  },
  {
    id: 8,
    type: 'Базовый',
    commission: 'Комиссия 12%',
    name: 'Солнышко Гарант',
    description: 'Накопления к событию ребенка для короткого срока...',
    features: ['Накопления к событию ребенка', 'Защита для семьи', 'Поддержка детей'],
    audience: 'Родители 18-65 лет с детьми до 18 лет',
    minAmount: '12000',
  },
];

const ProductCard = ({ product }: { product: Product }) => (
  <Card style={{ height: '100%' }}>
    <div style={{ marginBottom: 16 }}>
      <Tag>{product.type}</Tag>
      <Tag color="success" style={{ marginLeft: 8 }}>{product.commission}</Tag>
    </div>
    <Title level={5} style={{ marginBottom: 8 }}>
      {product.name}
    </Title>
    <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 12 }}>
      {product.description}
    </Text>
    <div style={{ marginBottom: 16 }}>
      {product.features.map((feature, index) => (
        <div key={index} style={{ marginBottom: 4, fontSize: 12 }}>
          — {feature}
        </div>
      ))}
    </div>
    <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 12 }}>
      <Text type="secondary" style={{ fontSize: 10, display: 'block' }}>ЦЕЛЕВАЯ АУДИТОРИЯ</Text>
      <Text strong style={{ fontSize: 12 }}>{product.audience}</Text>
      <div style={{ marginTop: 8 }}>
        <Text type="secondary" style={{ fontSize: 10, display: 'block' }}>МИН. СУММА</Text>
        <Text strong style={{ fontSize: 12 }}>{product.minAmount}</Text>
      </div>
    </div>
  </Card>
);

export default function CatalogPage() {
  return (
    <div className="catalog-page">
      <Title level={2} style={{ marginBottom: 24 }}>
        Каталог продуктов
      </Title>

      <Card style={{ marginBottom: 24 }}>
        <Space wrap size={[8, 8]}>
          <Input
            placeholder="Поиск"
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
          />
          <Input placeholder="Тип продукта" style={{ width: 150 }} />
          <Button.Group>
            <Button icon={<ArrowUpOutlined />} />
            <Button icon={<ArrowDownOutlined />} />
          </Button.Group>
        </Space>
      </Card>

      <Row gutter={[16, 16]}>
        {productsData.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
