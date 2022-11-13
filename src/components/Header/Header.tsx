import React from 'react'

import { Button } from '@mui/material'

import incubatorLogo from '../../assets/picture/incubatorLogo.png'

import s from './Header.module.css'

const Header = () => {
  return (
    <div className={s.headerWrapper}>
      <a href="https://it-incubator.io/" target="_blank" className={s.logo} rel="noreferrer">
        <img src={incubatorLogo} alt="incubatorLogo" />
      </a>
      <Button variant="contained">Sign In</Button>
    </div>
  )
}

export default Header
