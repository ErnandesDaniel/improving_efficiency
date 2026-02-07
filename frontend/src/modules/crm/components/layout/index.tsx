'use client';

import React from 'react';
import { Layout, Menu, Button, Badge, Avatar, Typography, Flex } from 'antd';
import {
  HomeOutlined,
  UnorderedListOutlined,
  DollarOutlined,
  UserOutlined,
  TeamOutlined,
  UserDeleteOutlined,
  BarChartOutlined,
  AimOutlined,
  BookOutlined,
  ReadOutlined,
  CalculatorOutlined,
  AppstoreOutlined,
  ContactsOutlined,
  QuestionCircleOutlined,
  BellOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AIChat from '../ai-chat';
import './index.scss';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const mainMenuItems = [
  { key: '/crm/dashboard', icon: <HomeOutlined />, label: <Link href="/crm/dashboard">Главное</Link> },
  { key: '/crm/tasks', icon: <UnorderedListOutlined />, label: <Link href="/crm/tasks">Задачи</Link> },
  { key: '/crm/deals', icon: <DollarOutlined />, label: <Link href="/crm/deals">Сделки</Link> },
];

const clientsMenuItems = [
  { 
    key: 'clients-group', 
    type: 'group' as const, 
    label: 'КЛИЕНТЫ',
    children: [
      { key: '/crm/leads', icon: <UserOutlined />, label: <Link href="/crm/leads">Новые лиды</Link> },
      { key: '/crm/support', icon: <TeamOutlined />, label: <Link href="/crm/support">На сопровождении</Link> },
      { key: '/crm/rejections', icon: <UserDeleteOutlined />, label: <Link href="/crm/rejections">Отказы</Link> },
    ]
  },
];

const planningMenuItems = [
  { 
    key: 'planning-group', 
    type: 'group' as const, 
    label: 'ПЛАНИРОВАНИЕ',
    children: [
      { key: '/crm/analytics', icon: <BarChartOutlined />, label: <Link href="/crm/analytics">Аналитика</Link> },
      { key: '/crm/goals', icon: <AimOutlined />, label: <Link href="/crm/goals">Мои цели</Link> },
    ]
  },
];

const otherMenuItems = [
  { 
    key: 'other-group', 
    type: 'group' as const, 
    label: 'ДРУГОЕ',
    children: [
      { key: '/crm/training', icon: <BookOutlined />, label: <Link href="/crm/training">Обучение</Link> },
      { key: '/crm/news', icon: <ReadOutlined />, label: <Link href="/crm/news">Новости</Link> },
      { key: '/crm/payments', icon: <CalculatorOutlined />, label: <Link href="/crm/payments">Начисления</Link> },
      { key: '/crm/catalog', icon: <AppstoreOutlined />, label: <Link href="/crm/catalog">Каталог продуктов</Link> },
      { key: '/crm/employees', icon: <ContactsOutlined />, label: <Link href="/crm/employees">Сотрудники</Link> },
    ]
  },
];

const menuItems = [
  ...mainMenuItems,
  ...clientsMenuItems,
  ...planningMenuItems,
  ...otherMenuItems,
];

interface CrmLayoutProps {
  children: React.ReactNode;
}

export default function CrmLayout({ children }: CrmLayoutProps) {
  const pathname = usePathname();

  return (
    <Layout className="crm-layout">
      <Sider className="crm-layout__sider" width={240}>
        <Flex className="crm-layout__header" vertical>
          <Flex className="crm-layout__actions" align="center" gap="small">
            <Badge dot color="green">
              <BellOutlined className="crm-layout__icon" />
            </Badge>
            <Button type="text" icon={<MenuOutlined />} />
          </Flex>
        </Flex>

        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          className="crm-layout__menu"
        />

        <Flex className="crm-layout__footer" vertical>
          <Flex className="crm-layout__profile" align="center" gap="middle">
            <Avatar className="crm-layout__avatar">ИИ</Avatar>
            <Flex vertical className="crm-layout__profile-info">
              <Text strong className="crm-layout__profile-name">Профиль</Text>
              <Text className="crm-layout__profile-role">Иван</Text>
            </Flex>
            <QuestionCircleOutlined className="crm-layout__help-icon" />
          </Flex>
        </Flex>
      </Sider>

      <Layout className="crm-layout__content-wrapper">
        <Content className="crm-layout__content">
          {children}
        </Content>
      </Layout>

      <AIChat />
    </Layout>
  );
}
