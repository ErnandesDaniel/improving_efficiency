
import type { NamePath } from 'antd/es/form/interface';

export interface FormTextAreaProps {
    autoSize?: boolean;
    className?: string;
    errorText?: string;
    disabled?: boolean;
    isError?: boolean;
    isRequired?: boolean;
    isResizable?: boolean;
    label?: string;
    maxLength?: number;
    minRows?: number;
    name: NamePath;
    pattern?: RegExp;
    placeholder?: string;
}
