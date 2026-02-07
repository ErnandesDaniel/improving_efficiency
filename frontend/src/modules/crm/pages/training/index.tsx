'use client';

import React from 'react';
import {
  Card,
  Typography,
  Row,
  Col,
  Tabs,
  Tag,
  Progress,
} from 'antd';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  levelColor: string;
  lessons: number;
  progress: number;
  image: string;
}

const coursesData: Course[] = [
  {
    id: 1,
    title: 'Этика и комплаенс',
    description: 'Основы профессиональной этики агента. Защита...',
    level: 'Начинающий',
    levelColor: 'success',
    lessons: 3,
    progress: 0,
    image: '📋',
  },
  {
    id: 2,
    title: 'Продуктовая линейка',
    description: 'Изучение продуктов компании. Базовые и продвинутые программы...',
    level: 'Средний',
    levelColor: 'warning',
    lessons: 3,
    progress: 0,
    image: '🏠',
  },
  {
    id: 3,
    title: 'Техники продаж',
    description: 'Эффективные методы работы с клиентами. Телефонные...',
    level: 'Средний',
    levelColor: 'warning',
    lessons: 5,
    progress: 0,
    image: '📞',
  },
  {
    id: 4,
    title: 'Сложные переговоры',
    description: 'Техники ведения сложных переговоров. Работа с отказами...',
    level: 'Продвинутый',
    levelColor: 'error',
    lessons: 4,
    progress: 0,
    image: '🤝',
  },
  {
    id: 5,
    title: 'VIP-клиенты',
    description: 'Особенности работы с состоятельными клиентами....',
    level: 'Продвинутый',
    levelColor: 'error',
    lessons: 4,
    progress: 0,
    image: '💼',
  },
  {
    id: 6,
    title: 'Профессиональный стандарт',
    description: 'Профессиональный стандарт. Требования к...',
    level: 'Средний',
    levelColor: 'warning',
    lessons: 4,
    progress: 0,
    image: '📜',
  },
  {
    id: 7,
    title: 'Базовый экзамен',
    description: 'Квалификационный экзамен для специалистов...',
    level: 'Продвинутый',
    levelColor: 'error',
    lessons: 6,
    progress: 0,
    image: '🏛️',
  },
  {
    id: 8,
    title: 'Новый курс',
    description: '',
    level: '',
    levelColor: '',
    lessons: 1,
    progress: 0,
    image: '📚',
  },
];

const CourseCard = ({ course }: { course: Course }) => (
  <Card
    hoverable
    style={{ height: '100%' }}
    cover={
      <div
        style={{
          height: 140,
          background: course.id % 2 === 0 ? '#f6ffed' : '#e6f7ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 60,
        }}
      >
        {course.image}
      </div>
    }
  >
    <div style={{ marginBottom: 8 }}>
      <Tag color={course.levelColor}>{course.level}</Tag>
    </div>
    <Title level={5} style={{ marginBottom: 8 }}>
      {course.title}
    </Title>
    <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 12 }}>
      {course.description}
    </Text>
    <Progress percent={course.progress} size="small" />
    <Text type="secondary" style={{ fontSize: 12 }}>
      {course.progress} / {course.lessons} уроков
    </Text>
  </Card>
);

export default function TrainingPage() {
  return (
    <div className="training-page">
      <Title level={2} style={{ marginBottom: 8 }}>
        Обучение
      </Title>
      <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
        Курсы, вебинары и ответы на частые вопросы
      </Text>

      <Tabs defaultActiveKey="courses">
        <TabPane tab="Курсы" key="courses">
          <Row gutter={[24, 24]}>
            {coursesData.map((course) => (
              <Col key={course.id} span={6}>
                <CourseCard course={course} />
              </Col>
            ))}
          </Row>
        </TabPane>
        <TabPane tab="Вебинары" key="webinars">
          <Card>
            <Text>Вебинары (в разработке)</Text>
          </Card>
        </TabPane>
        <TabPane tab="Частые вопросы" key="faq">
          <Card>
            <Text>Частые вопросы (в разработке)</Text>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
}
