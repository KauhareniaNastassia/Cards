import React, { useState } from 'react'

import AccountBoxIcon from '@mui/icons-material/AccountBox'
import LogoutIcon from '@mui/icons-material/Logout'
import { Avatar, Button, Popover, Stack } from '@mui/material'
import { Link } from 'react-router-dom'

import { PATH } from '../../app/App'
import incubatorLogoDark from '../../assets/picture/incubatorLogo-dark.png'
import incubatorLogo from '../../assets/picture/incubatorLogo.png'
import SuperButton from '../../common/Button/SuperButton/SuperButton'
import { customAvatar } from '../../pages/Profile/Profile'
import { logOutTC } from '../../redux/auth-reducer'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { ToggleThemeButton } from '../ToggleThemeButton/ToggleThemeButton'

import s from './Header.module.css'

export const Header = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const profile = useAppSelector(state => state.profile)
  const theme = useAppSelector(state => state.app.theme)

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const handleClose = () => {
    setAnchorEl(null)
  }
  const logOutHandler = () => {
    handleClose()
    dispatch(logOutTC())
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const id = open ? 'simple-popover' : undefined

  return (
    <div className={s.header}>
      <div className="container">
        <header className={s.headerWrapper}>
          <a href="https://it-incubator.io/" target="_blank" className={s.logo} rel="noreferrer">
            {theme === 'light' ? (
              <img src={incubatorLogo} alt="incubatorLogo" />
            ) : (
              <img src={incubatorLogoDark} alt="incubatorLogoDark" />
            )}
          </a>
          <ToggleThemeButton />
          {isLoggedIn ? (
            <div className={s.userInfo}>
              <a className={s.userName}>
                <button className={s.button} onClick={handleClick}>
                  {' '}
                  {profile.name}
                </button>
              </a>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <div className={s.profilePopover}>
                  <Link to={PATH.profile}>
                    <SuperButton className={s.superButton} onClick={handleClose}>
                      <AccountBoxIcon /> Profile
                    </SuperButton>
                  </Link>
                  <SuperButton onClick={logOutHandler} className={s.superButton}>
                    <LogoutIcon /> Log out
                  </SuperButton>
                </div>
              </Popover>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ width: 36, height: 36 }}
                  alt={'User Name'}
                  src={profile.avatar === '' ? customAvatar : profile.avatar}
                />
              </Stack>
            </div>
          ) : (
            <Link to={PATH.login} className={s.signInButtonLink}>
              <Button type="submit" variant="contained" style={{ borderRadius: '20px' }}>
                Sign In
              </Button>
            </Link>
          )}
        </header>
      </div>
    </div>
  )
}
