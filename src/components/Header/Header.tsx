import React from 'react'

import { Avatar, Button, Stack } from '@mui/material'

import incubatorLogo from '../../assets/picture/incubatorLogo.png'

import s from './Header.module.css'

const Header = () => {
  return (
    <div className={s.header}>
      <div className={s.headerWrapper}>
        <a href="https://it-incubator.io/" target="_blank" className={s.logo} rel="noreferrer">
          <img src={incubatorLogo} alt="incubatorLogo" />
        </a>
        login block
        {/*{props.isAuth ? (*/}
        {/*  <div className={s.userInfo}>*/}
        {/*    <a className={s.userName}>userName</a>*/}
        {/*    <Stack direction="row" spacing={2}>*/}
        {/*      <Avatar*/}
        {/*        sx={{ width: 36, height: 36 }}*/}
        {/*        alt={'User Name'}*/}
        {/*        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScVWdpSX0xv-SPTJEGBorXQzdtwZuCh-XdyA&usqp=CAU"*/}
        {/*      />*/}
        {/*    </Stack>*/}
        {/*  </div>*/}
        {/*) : (*/}
        {/*  <Button variant="contained" style={{ borderRadius: '20px' }}>*/}
        {/*    Sign In*/}
        {/*  </Button>*/}
        {/*)}*/}
      </div>
    </div>
  )
}

export default Header
