'use client'

import { useRef, useLayoutEffect, KeyboardEvent } from 'react';
import '@/modules/chats/components/textarea/index.scss';

interface TextareaProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSend: () => void;
    placeholder?: string;
    disabled?: boolean;
    isSendDisabled?: boolean;
    className?: string;
}

const Textarea = ({
value,
onChange,
onSend,
placeholder = 'Type your message here...',
disabled = false,
isSendDisabled = false
}: TextareaProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Автоматическое изменение высоты при вводе текста
    useLayoutEffect(() => {
        if (textareaRef.current) {
            // Сбрасываем высоту, чтобы корректно вычислить scrollHeight
            textareaRef.current.style.height = 'auto';
            const scrollHeight = textareaRef.current.scrollHeight;
            const maxHeight = 230; // Максимальная высота из вашего CSS
            textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
        }
    }, [value]);

    // Обработка нажатий клавиш
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        // Если нажат Enter БЕЗ Shift
        if (e.key === 'Enter' && !e.shiftKey) {
            // Предотвращаем стандартный перенос строки в любом случае,
            // чтобы Enter без Shift никогда не создавал пустых строк
            e.preventDefault();

            // Выполняем отправку, только если кнопка не заблокирована
            if (!isSendDisabled && !disabled) {
                onSend();
            }
        }
        // Если нажат Shift + Enter, e.preventDefault() не вызывается,
        // и браузер делает стандартный перенос строки.
    };

    return (
        <div className='message_input_container'>
      <textarea
          name='message_input_area'
          ref={textareaRef}
          className='message_input_area'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
      />
            <div className='message_input_action_bar'>
                <button
                    className="send_button"
                    onClick={onSend}
                    disabled={isSendDisabled || disabled}
                    aria-label="Send message"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Textarea;