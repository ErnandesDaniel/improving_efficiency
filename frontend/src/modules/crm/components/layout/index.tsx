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
  QuestionCircleOutlined,
  BellOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './index.scss';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const mainMenuItems = [
  { key: '/crm/dashboard', icon: <HomeOutlined />, label: <Link href="/crm/dashboard">Главное</Link> },
  { key: '/crm/tasks', icon: <UnorderedListOutlined />, label: <Link href="/crm/tasks">Задачи</Link> },
  { key: '/crm/deals', icon: <DollarOutlined />, label: <Link href="/crm/deals">Сделки</Link> },
];

const clientsMenuItems = [
  { type: 'divider', key: 'divider1', label: 'КЛИЕНТЫ', className: 'menu-divider' },
  { key: '/crm/leads', icon: <UserOutlined />, label: <Link href="/crm/leads">Новые лиды</Link> },
  { key: '/crm/support', icon: <TeamOutlined />, label: <Link href="/crm/support">На сопровождении</Link> },
  { key: '/crm/rejections', icon: <UserDeleteOutlined />, label: <Link href="/crm/rejections">Отказы</Link> },
];

const planningMenuItems = [
  { type: 'divider', key: 'divider2', label: 'ПЛАНИРОВАНИЕ', className: 'menu-divider' },
  { key: '/crm/analytics', icon: <BarChartOutlined />, label: <Link href="/crm/analytics">Аналитика</Link> },
  { key: '/crm/goals', icon: <AimOutlined />, label: <Link href="/crm/goals">Мои цели</Link> },
];

const otherMenuItems = [
  { type: 'divider', key: 'divider3', label: 'ДРУГОЕ', className: 'menu-divider' },
  { key: '/crm/training', icon: <BookOutlined />, label: <Link href="/crm/training">Обучение</Link> },
  { key: '/crm/news', icon: <ReadOutlined />, label: <Link href="/crm/news">Новости</Link> },
  { key: '/crm/payments', icon: <CalculatorOutlined />, label: <Link href="/crm/payments">Начисления</Link> },
  { key: '/crm/catalog', icon: <AppstoreOutlined />, label: <Link href="/crm/catalog">Каталог продуктов</Link> },
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
          <Flex className="crm-layout__brand" align="center" gap="small">
            <Title level={5} className="crm-layout__logo">everia</Title>
            <Text className="crm-layout__subtitle">Агент</Text>
          </Flex>
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
    </Layout>
  );
}
