import React from 'react'

import css_err from './Error.module.css'

export const Error404 = () => {
  return (
    <div className={css_err.wrapper}>
      <div className={css_err.num}>404</div>

      <div className={css_err.message}>Oops... Something went wrong, but it is okey=)</div>
    </div>
  )
}
