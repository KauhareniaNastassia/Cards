import React from 'react'

import { Link } from 'react-router-dom'

import { PATH } from '../../app/App'

import s from './NavigationForUs.module.css'

//just for fast navigate

export const NavigationForUs = () => {
  return (
    <nav className={s.wrapp}>
      <Link to={PATH.home}>Home</Link>
      <Link to={PATH.createNewPassword}>createNewPassword</Link>
      <Link to={PATH.error404}>error404</Link>
      <Link to={PATH.login}>Login</Link>
      <Link to={PATH.passwordRecovery}>passwordRecovery</Link>
      <Link to={PATH.profile}>profile</Link>
      <Link to={PATH.registration}>registration</Link>
      <Link to={PATH.checkEmail}>checkEmail</Link>
    </nav>
  )
}
