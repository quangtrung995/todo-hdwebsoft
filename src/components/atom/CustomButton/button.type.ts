export type My_CustomButtonType = {
    value: string,
    buttonType: 'submit' | 'button' | 'reset',
    disabled: boolean,
    onClickButton: () => void,
    children: JSX.Element,
    className: string
}