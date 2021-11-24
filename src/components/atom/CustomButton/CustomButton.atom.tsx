import React from 'react'
import { My_CustomButtonType } from './button.type'

export const My_CustomButton = ({ 
    value,
    buttonType,
    disabled,
    onClickButton,
    children,
    className
}: Partial<My_CustomButtonType>) => {
    return (
        <button
            value={value}
            type={buttonType}
            disabled={disabled}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClickButton ? onClickButton() : <></>;
            }}
            className={className}
        >
            {children}
        </button>
    )
}
