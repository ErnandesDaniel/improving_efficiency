'use client';

import React, { useState } from 'react';
import {
  Typography,
  Card,
  Tabs,
  Tag,
  Progress,
  Button,
  Flex,
} from 'antd';
import CrmLayout from '../../components/layout';
import './index.scss';

const { Title, Text } = Typography;

const coursesData = [
  {
    id: '1',
    title: 'Этика и комплаенс',
    description: 'Основы профессиональной этики страхового агента. Защи...',
    level: 'Начинающий',
    levelColor: 'green',
    lessons: 3,
    progress: 0,
    image: '📋',
  },
  {
    id: '2',
    title: 'Продуктовая линейка',
    description: 'Изучение страховых продуктов компании. НСЖ, ИСЖ и кросс-...',
    level: 'Средний',
    levelColor: 'orange',
    lessons: 3,
    progress: 100,
    image: '🏠',
  },
  {
    id: '3',
    title: 'Техники продаж',
    description: 'Эффективные методы работы с клиентами. Телефонные...',
    level: 'Средний',
    levelColor: 'orange',
    lessons: 5,
    progress: 100,
    image: '📞',
  },
  {
    id: '4',
    title: 'Сложные переговоры',
    description: 'Техники ведения сложных переговоров. Работа с отказами...',
    level: 'Продвинутый',
    levelColor: 'red',
    lessons: 4,
    progress: 25,
    image: '🤝',
  },
];

const webinarsData = [
  {
    id: '1',
    title: 'VIP-клиенты',
    description: 'Особенности работы с состоятельными клиентами...',
    level: 'Продвинутый',
    levelColor: 'red',
    lessons: 4,
    progress: 0,
    image: '👔',
  },
  {
    id: '2',
    title: 'Профессиональный стандарт «Страховой...',
    description: 'Профессиональный стандарт от Минтруда. Требования к...',
    level: 'Средний',
    levelColor: 'orange',
    lessons: 4,
    progress: 0,
    image: '📜',
  },
  {
    id: '3',
    title: 'Базовый экзамен ЦБ',
    description: 'Квалификационный экзамен для специалистов финансового...',
    level: 'Продвинутый',
    levelColor: 'red',
    lessons: 6,
    progress: 0,
    image: '🏦',
  },
  {
    id: '4',
    title: 'Новый курс',
    description: '',
    level: '',
    levelColor: '',
    lessons: 1,
    progress: 0,
    image: '📚',
  },
];

const CourseCard = ({ course }: { course: typeof coursesData[0] }) => (
  <Card hoverable className="training-page__card">
    <div className="training-page__card-image">{course.image}</div>
    <Title level={5} className="training-page__card-title">{course.title}</Title>
    <Text className="training-page__card-description">{course.description}</Text>
    <Flex className="training-page__card-meta" gap="small">
      {course.level && <Tag color={course.levelColor}>{course.level}</Tag>}
      <Text type="secondary">{course.lessons} уроков</Text>
    </Flex>
    <div className="training-page__progress-wrapper">
      <Progress percent={course.progress} showInfo={false} strokeColor={course.progress === 100 ? '#52c41a' : '#fa8c16'} />
      <Text type="secondary" className="training-page__progress-text">0 / {course.lessons} уроков</Text>
    </div>
  </Card>
);

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState('courses');

  return (
    <CrmLayout>
      <div className="training-page">
        <div className="training-page__header">
          <Title level={3} className="training-page__title">Обучение</Title>
          <Text type="secondary" className="training-page__subtitle">
            Курсы, вебинары и ответы на частые вопросы
          </Text>
        </div>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="training-page__tabs"
          items={[
            { key: 'courses', label: 'Курсы' },
            { key: 'webinars', label: 'Вебинары' },
            { key: 'faq', label: 'Частые вопросы' },
          ]}
        />

        {activeTab === 'courses' && (
          <Flex wrap gap={24} className="training-page__grid">
            {coursesData.map((course) => (
              <Flex key={course.id} vertical style={{ flex: '1 1 calc(25% - 18px)', minWidth: 260 }}>
                <CourseCard course={course} />
              </Flex>
            ))}
          </Flex>
        )}

        {activeTab === 'webinars' && (
          <Flex wrap gap={24} className="training-page__grid">
            {webinarsData.map((course) => (
              <Flex key={course.id} vertical style={{ flex: '1 1 calc(25% - 18px)', minWidth: 260 }}>
                <CourseCard course={course} />
              </Flex>
            ))}
          </Flex>
        )}

        {activeTab === 'faq' && (
          <Card className="training-page__faq-card">
            <Text>Раздел в разработке</Text>
          </Card>
        )}
      </div>
    </CrmLayout>
  );
}
