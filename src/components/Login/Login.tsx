import React from 'react'

import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../utils/hooks'

export const Login = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }

  return <div>Login</div>
}
