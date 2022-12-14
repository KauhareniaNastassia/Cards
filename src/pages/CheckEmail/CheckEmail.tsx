import React from 'react'

import { Link, Navigate } from 'react-router-dom'

import { PATH } from '../../app/App'
import checkEmailLogo from '../../assets/picture/CheckEmail.png'
import s from '../../assets/styles/FormsStyle.module.css'
import { useAppSelector } from '../../common/utils/hooks'

export const CheckEmail = () => {
  const emailRecovery = useAppSelector(store => store.auth.emailRecovery)

  if (!emailRecovery) {
    return <Navigate to={PATH.passwordRecovery} />
  }

  return (
    <section className={s.wrapp}>
      <div className={s.inner}>
        <div className={s.formWrapp}>
          <h2>Check Email</h2>
          <div>
            <img src={checkEmailLogo} alt="checkEmailLogo" />
          </div>
          <p className={s.text}>
            We’ve sent an Email with instructions to:{' '}
            <b style={{ color: 'red' }}>{emailRecovery}</b>
          </p>
          <Link to={PATH.login} className={s.button}>
            Back to login
          </Link>
        </div>
      </div>
    </section>
  )
}
