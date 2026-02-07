'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Badge, Avatar, Typography, Flex, Drawer } from 'antd';
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
  CloseOutlined,
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
      { key: '/crm/leads', icon: <UserOutlined />, label: <Link href="/crm/leads">Новые клиенты</Link> },
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatVisible, setChatVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setChatVisible(false);
      } else {
        setChatVisible(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderMenu = () => (
    <>
      <Flex className="crm-layout__header" vertical>
        <Flex className="crm-layout__actions" align="center" gap="small">
          <Badge dot color="green">
            <BellOutlined className="crm-layout__icon" />
          </Badge>
          {isMobile && (
            <Button 
              type="text" 
              icon={<CloseOutlined />} 
              onClick={() => setMobileMenuOpen(false)}
            />
          )}
        </Flex>
      </Flex>

      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems}
        className="crm-layout__menu"
        onClick={() => isMobile && setMobileMenuOpen(false)}
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
    </>
  );

  return (
    <Layout className="crm-layout">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sider className="crm-layout__sider" width={240}>
          {renderMenu()}
        </Sider>
      )}

      {/* Mobile Menu Drawer */}
      <Drawer
        placement="left"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
        className="crm-layout__mobile-drawer"
        bodyStyle={{ padding: 0 }}
      >
        {renderMenu()}
      </Drawer>

      {/* Mobile Header */}
      {isMobile && (
        <Flex className="crm-layout__mobile-header" align="center" justify="space-between">
          <Button 
            type="text" 
            icon={<MenuOutlined />} 
            onClick={() => setMobileMenuOpen(true)}
            className="crm-layout__mobile-menu-btn"
          />
          <Flex align="center" gap="small">
            <Badge dot color="green">
              <BellOutlined className="crm-layout__icon" />
            </Badge>
            <Button 
              type="text" 
              icon={chatVisible ? <CloseOutlined /> : <MenuOutlined />}
              onClick={() => setChatVisible(!chatVisible)}
              className="crm-layout__mobile-chat-btn"
            />
          </Flex>
        </Flex>
      )}

      <Layout 
        className={`crm-layout__content-wrapper ${isMobile ? 'crm-layout__content-wrapper--mobile' : ''} ${chatVisible && !isMobile ? 'crm-layout__content-wrapper--with-chat' : ''}`}
      >
        <Content className={`crm-layout__content ${isMobile ? 'crm-layout__content--mobile' : ''}`}>
          {children}
        </Content>
      </Layout>

      {/* AI Chat */}
      {chatVisible && <AIChat isMobile={isMobile} onClose={() => setChatVisible(false)} />}
    </Layout>
  );
}
