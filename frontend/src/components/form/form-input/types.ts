import type { NamePath } from 'antd/es/form/interface';

export interface FormInputProps {
    className?: string;
    errorText?: string;
    disabled?: boolean;
    isError?: boolean;
    isRequired?: boolean;
    label?: string;
    maxLength?: number;
    name: NamePath;
    pattern?: RegExp;
    placeholder?: string;
    description?: string;
}