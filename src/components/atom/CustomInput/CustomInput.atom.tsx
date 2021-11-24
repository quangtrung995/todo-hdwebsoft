import React from 'react'
import { LF_InputProps } from './input.type'

export const My_CustomInput = ({
    inputName,
    idInput,
    value,
    type,
    placeholder,
    onChange,
    className,
    checked,
    disabled,
    required,
    readOnly,
}: Partial<LF_InputProps>) => {
    return (
        <input
            className={className}
            name={inputName}
            id={idInput}
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            checked={checked}
            disabled={disabled || false}
            required={required}
            readOnly={readOnly || false}
        />
    )
}
