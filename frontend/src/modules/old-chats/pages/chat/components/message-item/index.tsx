"use client";

import { memo, useState } from "react";
import { useRouter } from "next/navigation";
import {
    MessageResponseDto,
    MessageResponseDtoRole,
} from "@/api/rest-client/dto";
import { useCreateNewLinearChatAndSendMessage } from "@/api/rest-client";

import RendererStreamingMarkdown from "@/modules/chats/pages/chat/components/markdown/RendererMarkdown";
import CodeBlock from "@/modules/chats/pages/chat/components/markdown/CodeBlock";

import "@/modules/chats/pages/chat/components/message-item/index.scss";
import clsx from "clsx";

interface MessageItemProps {
    messageData: MessageResponseDto;
    graphChatId?: number;
    messageInput?: string;
    isLastMessage?: boolean;
}

/**
 * Разделяем содержимое сообщения на текст и блоки кода
 * Для этого предполагаем, что сервер или парсер передают
 * уже готовый массив codeBlocks: {language, value}[]
 */

interface ParsedMessage {
    text: string; // Markdown без code-блоков
    codeBlocks: { language: string; value: string }[];
}

function parseMessage(content: string): ParsedMessage {
    const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
    const codeBlocks: { language: string; value: string }[] = [];
    let text = content;

    text = text.replace(codeBlockRegex, (_, lang, code) => {
        codeBlocks.push({ language: lang || "text", value: code });
        return ""; // удаляем код-блок из текста
    });

    return { text: text.trim(), codeBlocks };
}

const MessageItem = memo(({ messageData, graphChatId, messageInput, isLastMessage = false }: MessageItemProps) => {
    const router = useRouter();
    const isUser = messageData.role === MessageResponseDtoRole.USER;
    const { text, codeBlocks } = parseMessage(messageData.content);
    const [copied, setCopied] = useState(false);

    const { mutateAsync: createBranch, isPending: isCreatingBranch } = useCreateNewLinearChatAndSendMessage({
        mutation: {
            onSuccess: (response) => {
                // Navigate to the new linear chat branch
                // The response contains the new user and assistant messages
                // Navigate to the new linear chat ID within the same graph
                if (graphChatId !== undefined) {
                    router.push(`/chats/${graphChatId}/${response.userMessage.linearChatId}`);
                }
            },
        },
    });

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(messageData.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    const handleBranch = async () => {
        if (graphChatId === undefined || !messageInput?.trim()) {
            console.error("Cannot create branch: graphChatId is not available or input is empty");
            return;
        }

        try {
            // Create a new branch from this message using the input text as content
            await createBranch({
                data: {
                    fromMessageId: messageData.id,
                    content: messageInput.trim(), // Using the input text as the starting message for the branch
                }
            });
        } catch (error) {
            console.error("Failed to create branch: ", error);
        }
    };

    return (
        <div className={clsx("message_wrapper",{user:isUser, bot: !isUser})}>
            <div className={clsx("message_item",{user:isUser, bot: !isUser})}>
                {/* Markdown без блоков кода */}
                {text && <RendererStreamingMarkdown content={text} isStreaming={false} />}

                {/* Вынесенные блоки кода */}
                {codeBlocks.map((block, idx) => (
                    <CodeBlock key={idx} language={block.language} value={block.value} />
                ))}
            </div>
            
            <div className="message_actions">
                <button
                    className={clsx("copy_button",{user:isUser, bot: !isUser})}
                    onClick={handleCopy}
                    title="Скопировать сообщение"
                >
                    {copied ? "Скопировано" : "Копировать"}
                </button>
                {messageInput?.trim() && !isLastMessage && (
                    <button
                        className={clsx("branch_button", {user: isUser, bot: !isUser})}
                        onClick={handleBranch}
                        title="Создать ветвление от этого сообщения"
                        disabled={isCreatingBranch || graphChatId === undefined}
                    >
                        {isCreatingBranch ? "Создание..." : "Ветвить"}
                    </button>
                )}
            </div>
        </div>
    );
});

MessageItem.displayName = "MessageItem";

export default MessageItem;
