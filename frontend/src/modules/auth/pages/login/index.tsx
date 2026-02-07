'use client';

import {signIn} from 'next-auth/react';
import {useCallback} from 'react';
import './index.scss';

const LoginPage=()=>{

    const onLoginClick=useCallback(async ()=>{
        try{
            await signIn('google');
        }catch{
            return;
        }
    },[]);

    return (
        <div className="login_page">
            <h1 className="login_title">Добро пожаловать!</h1>
            <p className="login_subtitle">Войдите, чтобы продолжить</p>
            <button
                onClick={onLoginClick}
                className="google_login_button"
            >
                <span className="google_logo">G</span>
                Войти через Google
            </button>
        </div>
    );
};

export default LoginPage;