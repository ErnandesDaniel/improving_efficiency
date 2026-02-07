'use client';

import React from 'react';
import {
  Card,
  Typography,
  Row,
  Col,
  Input,
  Avatar,
  Button,
  Space,
} from 'antd';
import {
  SearchOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface Employee {
  id: number;
  initials: string;
  name: string;
  role: string;
  color: string;
}

const employeesData: Employee[] = [
  {
    id: 1,
    initials: 'ЛН',
    name: 'Лебедев Николай Дмитриевич',
    role: 'Агент',
    color: '#1890ff',
  },
  {
    id: 2,
    initials: 'СО',
    name: 'Соколова Ольга Петровна',
    role: 'Агент',
    color: '#722ed1',
  },
  {
    id: 3,
    initials: 'МС',
    name: 'Морозов Сергей Иванович',
    role: 'Агент',
    color: '#13c2c2',
  },
  {
    id: 4,
    initials: 'НА',
    name: 'Новикова Анна Александровна',
    role: 'Агент',
    color: '#eb2f96',
  },
  {
    id: 5,
    initials: 'КТ',
    name: 'Кузнецова Татьяна Михайловна',
    role: 'Агент',
    color: '#fa8c16',
  },
  {
    id: 6,
    initials: 'ПМ',
    name: 'Петрова Мария Сергеевна',
    role: 'Руководитель',
    color: '#f5222d',
  },
  {
    id: 7,
    initials: 'СА',
    name: 'Сидоров Алексей Петрович',
    role: 'Куратор',
    color: '#52c41a',
  },
  {
    id: 8,
    initials: 'СА',
    name: 'Смирнов Андрей Викторович',
    role: 'Администратор',
    color: '#2f54eb',
  },
  {
    id: 9,
    initials: 'КЕ',
    name: 'Козлова Елена Александровна',
    role: 'Редактор',
    color: '#fa541c',
  },
  {
    id: 10,
    initials: 'ВД',
    name: 'Волков Дмитрий Сергеевич',
    role: 'Агент',
    color: '#faad14',
  },
  {
    id: 11,
    initials: 'ИИ',
    name: 'Иванов Иван Иванович',
    role: 'Агент',
    color: '#a0d911',
  },
];

const EmployeeCard = ({ employee }: { employee: Employee }) => (
  <Card style={{ textAlign: 'center' }}>
    <Avatar
      size={64}
      style={{
        backgroundColor: employee.color,
        marginBottom: 16,
        fontSize: 24,
      }}
    >
      {employee.initials}
    </Avatar>
    <Title level={5} style={{ marginBottom: 4 }}>
      {employee.name}
    </Title>
    <Text type="secondary">{employee.role}</Text>
  </Card>
);

export default function EmployeesPage() {
  return (
    <div className="employees-page">
      <Title level={2} style={{ marginBottom: 8 }}>
        Сотрудники
      </Title>
      <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
        Коллеги и эксперты компании
      </Text>

      <Card style={{ marginBottom: 24 }}>
        <Space>
          <Input
            placeholder="Поиск"
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
          />
          <Input placeholder="Группа" style={{ width: 120 }} />
          <Input placeholder="Роль" style={{ width: 120 }} />
          <Button.Group>
            <Button icon={<ArrowUpOutlined />} />
            <Button icon={<ArrowDownOutlined />} />
          </Button.Group>
        </Space>
      </Card>

      <Row gutter={[24, 24]}>
        {employeesData.map((employee) => (
          <Col key={employee.id} span={6}>
            <EmployeeCard employee={employee} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
