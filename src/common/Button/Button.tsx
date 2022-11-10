import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import css from './Button.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
}

const Button: React.FC<SuperButtonPropsType> = (
    {
        red, className,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
    const finalClassName = `${css.button} ${red ? css.red : css.default} ${className}`

    return (
        <button
            className={finalClassName}
            {...restProps}
        />
    )
}

export default Button
