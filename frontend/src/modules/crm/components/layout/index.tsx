'use client';

import React from 'react';
import { Layout, Menu, Button, Badge, Avatar, Typography } from 'antd';
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

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

interface CrmLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  {
    key: '/crm/dashboard',
    icon: <HomeOutlined />,
    label: <Link href="/crm/dashboard">Главное</Link>,
  },
  {
    key: '/crm/tasks',
    icon: <UnorderedListOutlined />,
    label: <Link href="/crm/tasks">Задачи</Link>,
  },
  {
    key: '/crm/deals',
    icon: <DollarOutlined />,
    label: <Link href="/crm/deals">Сделки</Link>,
  },
  {
    type: 'divider',
    key: 'divider1',
    label: 'КЛИЕНТЫ',
    className: 'menu-divider',
  },
  {
    key: '/crm/leads',
    icon: <UserOutlined />,
    label: <Link href="/crm/leads">Новые лиды</Link>,
  },
  {
    key: '/crm/support',
    icon: <TeamOutlined />,
    label: <Link href="/crm/support">На сопровождении</Link>,
  },
  {
    key: '/crm/rejections',
    icon: <UserDeleteOutlined />,
    label: <Link href="/crm/rejections">Отказы</Link>,
  },
  {
    type: 'divider',
    key: 'divider2',
    label: 'ПЛАНИРОВАНИЕ',
    className: 'menu-divider',
  },
  {
    key: '/crm/analytics',
    icon: <BarChartOutlined />,
    label: <Link href="/crm/analytics">Аналитика</Link>,
  },
  {
    key: '/crm/goals',
    icon: <AimOutlined />,
    label: <Link href="/crm/goals">Мои цели</Link>,
  },
  {
    type: 'divider',
    key: 'divider3',
    label: 'ДРУГОЕ',
    className: 'menu-divider',
  },
  {
    key: '/crm/training',
    icon: <BookOutlined />,
    label: <Link href="/crm/training">Обучение</Link>,
  },
  {
    key: '/crm/news',
    icon: <ReadOutlined />,
    label: <Link href="/crm/news">Новости</Link>,
  },
  {
    key: '/crm/payments',
    icon: <CalculatorOutlined />,
    label: <Link href="/crm/payments">Начисления</Link>,
  },
  {
    key: '/crm/catalog',
    icon: <AppstoreOutlined />,
    label: <Link href="/crm/catalog">Каталог продуктов</Link>,
  },
];

export default function CrmLayout({ children }: CrmLayoutProps) {
  const pathname = usePathname();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={240}
        style={{
          background: '#fff',
          borderRight: '1px solid #f0f0f0',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Title level={5} style={{ margin: 0, color: '#1890ff' }}>

            </Title>
            <Text type="secondary" style={{ fontSize: 12 }}>

            </Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
            <Badge dot color="green">
              <BellOutlined style={{ fontSize: 18 }} />
            </Badge>
            <Button type="text" icon={<MenuOutlined />} />
          </div>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          style={{ borderRight: 0, height: 'calc(100vh - 140px)', overflow: 'auto' }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '16px',
            borderTop: '1px solid #f0f0f0',
            background: '#fff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar style={{ backgroundColor: '#722ed1' }}>ИИ</Avatar>
            <div style={{ flex: 1 }}>
              <Text strong style={{ display: 'block', fontSize: 14 }}>
                Профиль
              </Text>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Иван
              </Text>
            </div>
            <QuestionCircleOutlined style={{ color: '#8c8c8c' }} />
          </div>
        </div>
      </Sider>

      <Layout style={{ marginLeft: 240, background: '#f5f5f5' }}>
        <Content style={{ padding: 24, minHeight: '100vh' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
