'use client'
import type { PropsWithChildren } from "react";
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import {Button, Flex} from 'antd';
import ChatList from "@/modules/chats/components/chats-list";
import '@/modules/chats/components/chats-layout/index.scss';

const ChatsLayout = ({ children }: PropsWithChildren) => {
    const router = useRouter();

    const handleProfileClick = useCallback(() => {
        router.push('/profile');
    }, [router]);

    return (
        <div className="chats_layout">
            <Flex vertical gap={40}>
                <ChatList/>
                <Button onClick={handleProfileClick} className="profile_button">
                    Profile
                </Button>
            </Flex>
            <div className="chat_content">
                {children}
            </div>
        </div>
    );
};

export default ChatsLayout;