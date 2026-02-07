'use client';

import React from 'react';
import {
  Typography,
  Card,
  Tag,
  Input,
  Select,
  Button,
  Flex,
  List,
} from 'antd';
import {
  SearchOutlined,
  SortAscendingOutlined,
} from '@ant-design/icons';
import CrmLayout from '../../components/layout';
import './index.scss';

const { Title, Text } = Typography;

const productTypeOptions = [
  { value: 'all', label: 'Все типы' },
  { value: 'nsg', label: 'НСЖ' },
  { value: 'isz', label: 'ИСЖ' },
];

const productsData = [
  {
    id: '1',
    name: 'Премиум',
    type: 'НСЖ',
    kv: '12%',
    description: 'Смешанное страхование жизни — дожитие до конца...',
    features: ['Защита + дожитие', 'СОЗ-37 (критические заболевания)', 'НС с множеством опций'],
    targetAudience: 'Взрослые 16-70 лет, заботящиеся о защите семьи',
    minPremium: 12000,
    color: 'green',
  },
  {
    id: '2',
    name: 'Премиум 7+',
    type: 'НСЖ',
    kv: '12%',
    description: 'Смешанное страхование жизни с дополнительным...',
    features: ['Защита + дожитие', 'Дополнительный доход', 'СОЗ-37'],
    targetAudience: 'Взрослые 16-63 лет',
    minPremium: 12000,
    color: 'green',
  },
  {
    id: '3',
    name: 'Премиум Гарант',
    type: 'НСЖ',
    kv: '12%',
    description: 'Смешанное страхование жизни для короткого срока...',
    features: ['Защита + дожитие', 'СОЗ-37', 'НС'],
    targetAudience: 'Взрослые 16-65 лет',
    minPremium: 12000,
    color: 'green',
  },
  {
    id: '4',
    name: 'Гранде',
    type: 'НСЖ',
    kv: '10%',
    description: 'Программа пенсионного страхования с периодом...',
    features: ['Пенсионная программа', 'Период накопления 9-30 лет', 'Гарантированные выплаты 5-20 лет'],
    targetAudience: 'Взрослые 18-61 лет, планирующие пенсию',
    minPremium: 12000,
    color: 'green',
  },
  {
    id: '5',
    name: 'Солнышко',
    type: 'НСЖ',
    kv: '12%',
    description: 'Накопления к событию ребенка + защита двух...',
    features: ['Накопления к событию ребенка', 'Два застрахованных', 'Защита ребенка'],
    targetAudience: 'Родители с детьми до 18 лет',
    minPremium: 12000,
    color: 'green',
  },
  {
    id: '6',
    name: 'Оптим',
    type: 'НСЖ',
    kv: '10%',
    description: 'Доступное страхование жизни без андеррайтинга...',
    features: ['Дожитие', 'Возврат взносов при смерти', 'НС в составе базовой программы'],
    targetAudience: 'Все категории клиентов 18-70 лет, в т.ч. с проблемами со здоровьем',
    minPremium: 12000,
    color: 'green',
  },
  {
    id: '7',
    name: 'Солнышко 7+',
    type: 'НСЖ',
    kv: '12%',
    description: 'Накопления к событию ребенка с дополнительным...',
    features: ['Накопления к событию ребенка', 'Дополнительный доход', 'Два застрахованных'],
    targetAudience: 'Родители 18-63 лет с детьми до 18 лет',
    minPremium: 12000,
    color: 'green',
  },
  {
    id: '8',
    name: 'Солнышко Гарант',
    type: 'НСЖ',
    kv: '12%',
    description: 'Накопления к событию ребенка для короткого...',
    features: ['Накопления к событию ребенка', 'Два застрахованных', 'Защита ребенка'],
    targetAudience: 'Родители 18-65 лет с детьми до 18 лет',
    minPremium: 12000,
    color: 'green',
  },
];

export default function CatalogPage() {
  return (
    <CrmLayout>
      <div className="catalog-page">
        <Flex className="catalog-page__header" justify="space-between" align="center">
          <div>
            <Title level={3} className="catalog-page__title">Каталог продуктов</Title>
          </div>
        </Flex>

        <Flex className="catalog-page__filters" wrap gap="small">
          <Input
            placeholder="Поиск"
            prefix={<SearchOutlined />}
            className="catalog-page__search-input"
          />
          <Select
            placeholder="Тип продукта"
            className="catalog-page__filter-select"
            options={productTypeOptions}
          />
          <Button icon={<SortAscendingOutlined />} />
        </Flex>

        <Flex wrap gap={24} className="catalog-page__grid">
          {productsData.map((product) => (
            <Flex key={product.id} vertical style={{ flex: '1 1 calc(25% - 18px)', minWidth: 280 }}>
              <Card hoverable className="catalog-page__card">
                <Flex className="catalog-page__card-header" justify="space-between" align="center">
                  <Tag className="catalog-page__type-tag">{product.type}</Tag>
                  <Tag color={product.color} className="catalog-page__kv-tag">КВ {product.kv}</Tag>
                </Flex>
                
                <Title level={5} className="catalog-page__product-name">{product.name}</Title>
                <Text className="catalog-page__description">{product.description}</Text>
                
                <List
                  size="small"
                  dataSource={product.features}
                  renderItem={(feature) => (
                    <List.Item className="catalog-page__feature">— {feature}</List.Item>
                  )}
                  className="catalog-page__features-list"
                />
                
                <div className="catalog-page__target-section">
                  <Text type="secondary" className="catalog-page__target-label">ЦЕЛЕВАЯ АУДИТОРИЯ</Text>
                  <Text strong className="catalog-page__target-text">{product.targetAudience}</Text>
                </div>
                
                <div className="catalog-page__premium-section">
                  <Text type="secondary" className="catalog-page__premium-label">МИН. ПРЕМИЯ</Text>
                  <Text strong className="catalog-page__premium-value">{product.minPremium.toLocaleString()}</Text>
                </div>
              </Card>
            </Flex>
          ))}
        </Flex>
      </div>
    </CrmLayout>
  );
}
