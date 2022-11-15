import React from 'react'

import { Link } from 'react-router-dom'

import { PATH } from '../../app/App'
import s from '../../assets/styles/FormsStyle.module.css'

import checkEmailLogo from './../../assets/picture/CheckEmail.png'

export const CheckEmail = () => {
  return (
    <section className={s.wrapp}>
      <div className={s.inner}>
        <div className={s.formWrapp}>
          <h2>Check Email</h2>
          <div>
            <img src={checkEmailLogo} alt="checkEmailLogo" />
          </div>
          <p>We’ve sent an Email with instructions to example@mail.com</p>
          <Link to={PATH.login} className={s.button}>
            Back to login
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CheckEmail
