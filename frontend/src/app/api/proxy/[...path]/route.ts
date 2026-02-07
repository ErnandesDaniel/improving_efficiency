import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import generateJWT from "@/lib/generateJWT";

async function proxyRequest(req: NextRequest) {

    const sessionToken = await getToken({ req, secret:process.env.NEXTAUTH_SECRET });

    // Проверка авторизации на уровне прокси (опционально)
    if (!sessionToken) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Генерируем "чистый" JWT для бэкенда
    const backendToken = await generateJWT({
        sub: sessionToken.sub as string,
        iss: sessionToken.iss as string
    });

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, ""); // убираем слеш в конце, если он есть
    const targetPath = req.nextUrl.pathname.replace(/^\/api\/proxy/, ""); // здесь слеш в начале остается
    const targetUrl = `${baseUrl}${targetPath}${req.nextUrl.search}`;

    // Подготавливаем заголовки
    const headers = new Headers(req.headers);
    headers.set("Authorization", `Bearer ${backendToken}`);
    headers.delete("host");

    try {
        const body = ["GET", "HEAD"].includes(req.method) ? undefined : await req.text();

        const response = await fetch(targetUrl.toString(), {
            method: req.method,
            headers,
            body,
            cache: "no-store",
        });

        // Отдаем ответ потоком (stream) для производительности
        return new NextResponse(response.body, {
            status: response.status,
            headers: {
                "Content-Type": response.headers.get("Content-Type") || "application/json",
            },
        });
    } catch (error) {
        console.error(`[Proxy Error] ${req.method} ${targetPath}:`, error);
        return NextResponse.json({ error: "Service Unavailable" }, { status: 503 });
    }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;