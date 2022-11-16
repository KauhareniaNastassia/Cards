import React from 'react'

import { Avatar, Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { PATH } from '../../app/App'
import incubatorLogo from '../../assets/picture/incubatorLogo.png'
import { AppRootStateType } from '../../redux/store'
import { useAppSelector } from '../../utils/hooks'
import { customAvatar } from '../Profile/ProfileCard/ProfileCard'

import s from './Header.module.css'

const Header = () => {
  const dispatch = useDispatch()
  const isLoggegIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)
  const profile = useAppSelector(state => state.profile)

  return (
    <div className={s.header}>
      <div className={s.headerWrapper}>
        <a href="https://it-incubator.io/" target="_blank" className={s.logo} rel="noreferrer">
          <img src={incubatorLogo} alt="incubatorLogo" />
        </a>

        {isLoggegIn ? (
          <div className={s.userInfo}>
            <a className={s.userName}>{profile.name}</a>
            <Stack direction="row" spacing={2}>
              <Avatar
                sx={{ width: 36, height: 36 }}
                alt={'User Name'}
                src={profile.avatar === '' ? customAvatar : profile.avatar}
              />
            </Stack>
          </div>
        ) : (
          <Link to={PATH.login}>Sign In</Link>
        )}
      </div>
    </div>
  )
}

export default Header
