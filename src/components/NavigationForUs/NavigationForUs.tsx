import React from 'react'

import { Link } from 'react-router-dom'

import { PATH } from '../../app/App'

import s from './NavigationForUs.module.css'

// чисто временно для нас, чтоб не вбивать путь руками

const NavigationForUs = () => {
  return (
    <nav className={s.wrapp}>
      <Link to={PATH.HOME}>Home</Link>
      <Link to={PATH.createNewPassword}>createNewPassword</Link>
      <Link to={PATH.error404}>error404</Link>
      <Link to={PATH.Login}>Login</Link>
      <Link to={PATH.passwordRecovery}>passwordRecovery</Link>
      <Link to={PATH.profile}>profile</Link>
      <Link to={PATH.registration}>registration</Link>
      <Link to={PATH.testComponents}>testComponents</Link>
    </nav>
  )
}

export default NavigationForUs
