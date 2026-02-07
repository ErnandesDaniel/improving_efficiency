'use client';

import {signOut, useSession} from 'next-auth/react';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'antd';
import ConditionalRender from '@/components/conditional-render';
import '@/modules/profile/pages/profile/index.scss';
import {isNil} from "lodash-es";

const ProfilePage = () => {

    const {data: session} = useSession();

    const router = useRouter();

    const onLogoutClick = useCallback(async () => {
        try {
            await signOut();
        } catch {
            return;
        }
    }, []);

    const onBackClick = useCallback(() => {
        router.push('/chats');
    }, [router]);

    return (
        <div className="profile_page">
            <Button className="back_button" onClick={onBackClick}>Back to Chats</Button>

            <ConditionalRender condition={!isNil(session?.userName)}>
                <div className="user_info">
                    <p>User Name: {session?.userName}</p>
                </div>
            </ConditionalRender>

            <Button className="logout_button" onClick={onLogoutClick} danger>Logout</Button>
        </div>
    );
};

export default ProfilePage;