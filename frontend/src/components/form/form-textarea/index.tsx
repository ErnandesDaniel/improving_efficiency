'use client';

import type { Rule as FormRule } from 'antd/es/form';
import Form from 'antd/es/form';

import Input from 'antd/es/input';
import { clsx } from 'clsx';
import isNil from 'lodash-es/isNil';
import { memo, useMemo } from 'react';
import {FormTextAreaProps} from "@/components/form/form-textarea/types";


export const FormTextareaAntd = memo(
    ({
         autoSize = false,
         className,
         errorText = '',
         isError = false,
         isRequired = false,
         isResizable = false,
         label,
         minRows,
         name,
         pattern,
         ...rest
     }: FormTextAreaProps) => {
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

        const textareaStyle = useMemo(
            () => ({
                ...(isResizable ? {} : { resize: 'none' as const })
            }),
            [isResizable]
        );

        const autoSizeConfig = useMemo(() => {
            if (autoSize) {
                return isNil(minRows) ? true : { minRows };
            }
            return false;
        }, [autoSize, minRows]);

        return (
            <Form.Item
                className={clsx(className,'text_field_wrapper')}
                label={label}
                layout="vertical"
                name={name}
                rules={rules}
            >
                <Input.TextArea {...rest} autoSize={autoSizeConfig} style={textareaStyle} />
            </Form.Item>
        );
    }
);

FormTextareaAntd.displayName = 'FormTextareaAntd';
