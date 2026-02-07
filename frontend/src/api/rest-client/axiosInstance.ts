'use client';
import axios from 'axios';
import {signOut} from "next-auth/react";

const axiosInstance = axios.create({
    baseURL: '/api/proxy'
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response, // Если всё хорошо, просто возвращаем ответ
    async (error) => {

        if (error.response && error.response.status === 401) {
            await signOut({ callbackUrl: '/auth/login' });
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;