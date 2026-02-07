'use client';

import React from 'react';
import {
  Typography,
  Card,
  Avatar,
  Input,
  Select,
  Button,
  Flex,
  Row,
  Col,
} from 'antd';
import {
  SearchOutlined,
  SortAscendingOutlined,
} from '@ant-design/icons';
import CrmLayout from '../../components/layout';
import './index.scss';

const { Title, Text } = Typography;

const groupOptions = [
  { value: 'all', label: 'Все группы' },
  { value: 'agents', label: 'Агенты' },
  { value: 'managers', label: 'Руководители' },
];

const roleOptions = [
  { value: 'all', label: 'Все роли' },
  { value: 'agent', label: 'Агент' },
  { value: 'supervisor', label: 'Куратор' },
  { value: 'admin', label: 'Администратор' },
];

const employeesData = [
  { id: '1', initials: 'ЛН', name: 'Лебедев Николай Дмитриевич', role: 'Агент', color: '#1890ff' },
  { id: '2', initials: 'СО', name: 'Соколова Ольга Петровна', role: 'Агент', color: '#722ed1' },
  { id: '3', initials: 'МС', name: 'Морозов Сергей Иванович', role: 'Агент', color: '#1890ff' },
  { id: '4', initials: 'НА', name: 'Новикова Анна Александровна', role: 'Агент', color: '#ff4d4f' },
  { id: '5', initials: 'КТ', name: 'Кузнецова Татьяна Михайловна', role: 'Агент', color: '#fa8c16' },
  { id: '6', initials: 'ПМ', name: 'Петрова Мария Сергеевна', role: 'Руководитель', color: '#eb2f96' },
  { id: '7', initials: 'СА', name: 'Сидоров Алексей Петрович', role: 'Куратор', color: '#722ed1' },
  { id: '8', initials: 'СА', name: 'Смирнов Андрей Викторович', role: 'Администратор', color: '#13c2c2' },
  { id: '9', initials: 'КЕ', name: 'Козлова Елена Александровна', role: 'Редактор', color: '#2f54eb' },
  { id: '10', initials: 'ВД', name: 'Волков Дмитрий Сергеевич', role: 'Агент', color: '#ff4d4f' },
  { id: '11', initials: 'ИИ', name: 'Иванов Иван Иванович', role: 'Агент', color: '#722ed1' },
];

export default function EmployeesPage() {
  return (
    <CrmLayout>
      <div className="employees-page">
        <div className="employees-page__header">
          <Title level={3} className="employees-page__title">Сотрудники</Title>
          <Text type="secondary" className="employees-page__subtitle">
            Коллеги и эксперты компании
          </Text>
        </div>

        <Flex className="employees-page__filters" wrap gap="small">
          <Input
            placeholder="Поиск"
            prefix={<SearchOutlined />}
            className="employees-page__search-input"
          />
          <Select
            placeholder="Группа"
            className="employees-page__filter-select"
            options={groupOptions}
          />
          <Select
            placeholder="Роль"
            className="employees-page__filter-select"
            options={roleOptions}
          />
          <Button icon={<SortAscendingOutlined />} />
        </Flex>

        <Row gutter={[24, 24]} className="employees-page__grid">
          {employeesData.map((employee) => (
            <Col xs={24} sm={12} md={8} lg={6} key={employee.id}>
              <Card hoverable className="employees-page__card">
                <Flex vertical align="center" gap="middle">
                  <Avatar
                    size={64}
                    style={{ backgroundColor: employee.color }}
                    className="employees-page__avatar"
                  >
                    {employee.initials}
                  </Avatar>
                  <Text strong className="employees-page__name">{employee.name}</Text>
                  <Text type="secondary" className="employees-page__role">{employee.role}</Text>
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </CrmLayout>
  );
}
