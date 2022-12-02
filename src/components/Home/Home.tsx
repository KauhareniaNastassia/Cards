import React from 'react'

import { CircularProgress } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { PATH } from '../../app/App'
import { useAppSelector } from '../../utils/hooks'

export const Home = () => {
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

  return <Navigate to={PATH.packList} />
}
