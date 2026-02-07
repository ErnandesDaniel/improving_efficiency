import "@/app/reset.scss";
import "@/app/globals.css";

import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { auth } from "@/auth";
import AuthProvider from "@/components/providers/auth-provider";
import RestProvider from "@/components/providers/rest-provider";
import MockProvider from "@/components/providers/mock-provider";

import {AntdRegistry} from "@ant-design/nextjs-registry";
import NotificationProvider from "@/components/providers/notification-provider";

export const metadata: Metadata = {
    title: "Focus Solid",
    description: "Focus Solid",
};

export default async function RootLayout({children}: PropsWithChildren) {
    const session = await auth();

    return (
        <html lang="ru">

        <head>
            <meta content="width=device-width, initial-scale=1.0" name="viewport" />
            <link href="icon.ico" rel="icon" />
            <link
                href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap"
                rel="stylesheet"
            />
        </head>

        <body>
        <AuthProvider session={session}>
            <AntdRegistry>
                <NotificationProvider>
                    <RestProvider>
                        <MockProvider>
                            {children}
                        </MockProvider>
                    </RestProvider>
                </NotificationProvider>
            </AntdRegistry>
        </AuthProvider>
        </body>
        </html>
    );
}

