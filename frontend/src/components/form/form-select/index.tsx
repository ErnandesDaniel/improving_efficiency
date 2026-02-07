'use client';

import type { Rule as FormRule } from 'antd/es/form';
import Form from 'antd/es/form';
import { clsx } from 'clsx';
import isNil from 'lodash-es/isNil';
import { memo, useMemo } from 'react';
import { FormSelectProps }  from "@/components/form/form-select/types";
import {Select} from "antd";

const FormSelect = ({
className,
dependencies,
disabled = false,
errorText = '',
isError = false,
isRequired = false,
name,
ruleType = 'string',
...rest
}: FormSelectProps) => {
    const form = Form.useFormInstance();

    const value = Form.useWatch<string | number>([name], form);

    const { selectRule } = useMemo<Record<string, FormRule[]>>(
        () => ({
            selectRule: [
                {
                    message: errorText,
                    required: isRequired,
                    type: ruleType,
                    validator: Array.isArray(value)
                        ? (_, value) => (!isError && value.length > 0 ? Promise.resolve() : Promise.reject(new Error(errorText)))
                        : (_, value) =>
                            (isError && !disabled) || (isRequired && !disabled && isNil(value))
                                ? Promise.reject(new Error(errorText))
                                : Promise.resolve()
                }
            ]
        }),
        [isError, errorText, disabled, isRequired, ruleType, value]
    );

    return (
    <Form.Item
        dependencies={dependencies}
        name={name}
        rules={selectRule}
        className={clsx(className, 'form_select_wrapper')}
    >
        <Select {...rest} disabled={disabled} />
    </Form.Item>
);
};

export default memo(FormSelect);
