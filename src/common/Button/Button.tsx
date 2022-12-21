import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import css from './Button.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type SuperButtonPropsType = DefaultButtonPropsType & {
  red?: boolean
}

const Button: React.FC<SuperButtonPropsType> = ({ red, className, ...restProps }) => {
  const finalClassName = `${css.button} ${red ? css.red : css.default} ${className}`

  return <button className={finalClassName} {...restProps} />
}

export default Button
