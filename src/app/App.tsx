import React, { useEffect } from 'react'

import './App.css'

import { LinearProgress } from '@mui/material'
import { Route, Routes } from 'react-router-dom'

import CheckEmail from '../components/CheckEmail/CheckEmail'
import { CreateNewPassword } from '../components/CreateNewPassword/CreateNewPassword'
import Error404 from '../components/Error404/Error404'
import Header from '../components/Header/Header'
import Home from '../components/Home/Home'
import Login from '../components/Login/Login'
import NavigationForUs from '../components/NavigationForUs/NavigationForUs'
import { PasswordRecovery } from '../components/PasswordRecovery/PasswordRecovery'
import Profile from '../components/Profile/Profile'
import SignUp from '../components/SignUp/SignUp'
import { initializeAppTC } from '../redux/app-Reducer'
import { useAppDispatch, useAppSelector } from '../utils/hooks'

export const PATH = {
  home: '/',
  login: '/login',
  registration: '/registration',
  profile: '/profile',
  error404: '/error404',
  passwordRecovery: '/passwordRecovery',
  createNewPassword: '/createNewPassword/:token',
  checkEmail: '/checkEmail',
}

function App() {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const loading = useAppSelector(state => state.app.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(initializeAppTC())
  }, [])

  return (
    <div className="App">
      <NavigationForUs />
      <Header />
      {loading === 'loading' ? <LinearProgress /> : <div style={{ height: '4px' }} />}
      <Routes>
        <Route path={PATH.home} element={<Home />} />
        <Route path={PATH.login} element={<Login />} />
        <Route path={PATH.registration} element={<SignUp />} />
        <Route path={PATH.profile} element={<Profile />} />
        <Route path={PATH.error404} element={<Error404 />} />
        <Route path={PATH.passwordRecovery} element={<PasswordRecovery />} />

        <Route path={PATH.createNewPassword} element={<CreateNewPassword />} />
        <Route path={PATH.checkEmail} element={<CheckEmail />} />
      </Routes>
    </div>
  )
}

export default App
