import React, { useEffect } from 'react'

import { CircularProgress } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { PATH } from '../../app/App'
import Button from '../../common/Button/Button'
import css_btn from '../../common/Button/Button.module.css'
import Checkbox from '../../common/Checkbox/Checkbox'
import Input from '../../common/Input/Input'
import { useAppSelector } from '../../utils/hooks'

const Home = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const isInitialized = useAppSelector(state => state.app.isInitialized)

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }
  if (!isLoggedIn) {
    return <Navigate to={PATH.login} />
  }

  return (
    <div>
      <Input />
      <Checkbox />
      <Button className={css_btn.btn}>press me</Button>
    </div>
  )
}

export default Home
