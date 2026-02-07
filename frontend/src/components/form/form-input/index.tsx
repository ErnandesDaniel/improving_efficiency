'use client';

import type { Rule as FormRule } from 'antd/es/form';
import Form from 'antd/es/form';
import { clsx } from 'clsx';
import { memo, useMemo } from 'react';
import { FormInputProps }  from "@/components/form/form-input/types";
import {Input} from "antd";

const FormInput = ({
    className,
    errorText = '',
    isError = false,
    isRequired = false,
    name,
    pattern,
    ...rest
}: FormInputProps) => {
    const { rules } = useMemo<Record<string, FormRule[]>>(
        () => ({
            rules: [
                {
                    message: errorText,
                    required: isRequired,
                    type: 'string',
                    validator: (_, value) =>
                        isError || (isRequired && !value) || (pattern && value && !pattern.test(value))
                            ? Promise.reject(new Error(errorText))
                            : Promise.resolve()
                }
            ]
        }),
        [errorText, isError, isRequired, pattern]
    );

    return (
        <Form.Item
            className={clsx(className, { 'is-required': isRequired }, 'form_input_wrapper')}
            name={name}
            rules={rules}
        >
            <Input {...rest} />
        </Form.Item>
    );
};

export default memo(FormInput);