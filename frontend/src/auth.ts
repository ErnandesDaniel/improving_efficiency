import NextAuth from "next-auth";

import GoogleProvider from 'next-auth/providers/google'
import { isNil } from "lodash-es";
import {ServiceLoginRequestDto, UserIdResponseDto} from "@/api/rest-client/dto";

export const { auth, handlers}=NextAuth({
    callbacks:{

        async signIn({ account, profile }) {
            if (!account || !profile) return false;

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify({
                        providerUserId: profile.sub,
                        userName: profile.given_name,
                        provider: profile.iss
                    } as ServiceLoginRequestDto),
                    headers: {
                        'Content-Type': 'application/json',
                        'Service-Authorization': `${process.env.SERVICE_AUTHORIZATION_SECRET}`
                    },
                });

                if (response.ok) {
                    const userData: UserIdResponseDto = await response.json();
                    profile.backendId = userData.userId;
                    return true;
                }

                console.error("Бэкенд отказал в авторизации:", response.status);
                return false;
            } catch (error) {
                console.error("Ошибка связи с бэкендом:", error);
                return false;
            }
        },

        async jwt({ token, profile }) {
            if (!isNil(profile)){
                token.sub = String(profile.backendId);
                token.iss = profile.iss;
                token.given_name = profile.given_name;
            }
            return token;
        },

        async session({ session, token }) {
            if (!isNil(session.user) && !isNil(token)){
                session.sub = token.sub as string;
                session.iss = token.iss as string;
                session.userName = token.given_name as string;
            }
            return session;
        },
    },
    providers:[
       GoogleProvider({
           clientId: "test",
           clientSecret: "test",
           authorization: {
               params: {
                   prompt: "select_account", //заставляет Google каждый раз показывать окно согласия, что полезно на этапе разработки.
               },
           },
       })
    ]
});