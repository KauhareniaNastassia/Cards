import React, { useEffect } from 'react'

import './App.css'

import { CircularProgress, LinearProgress, ThemeProvider } from '@mui/material'
import { Route, Routes } from 'react-router-dom'

import { darkTheme, LightTheme } from '../assets/styles/theme'
import t from '../assets/styles/ThemeStyles.module.css'
import NotificationBar from '../common/Notification/NotificationBar'
import { CardsList } from '../components/CardsList/CardsList'
import { CheckEmail } from '../components/CheckEmail/CheckEmail'
import { CreateNewPassword } from '../components/CreateNewPassword/CreateNewPassword'
import { Error404 } from '../components/Error404/Error404'
import { Header } from '../components/Header/Header'
import { Home } from '../components/Home/Home'
import { Learn } from '../components/Learn/Learn'
import { Login } from '../components/Login/Login'
import { PackList } from '../components/PackList/PackList'
import { PasswordRecovery } from '../components/PasswordRecovery/PasswordRecovery'
import { ProfileCard } from '../components/ProfileCard/ProfileCard'
import { SignUp } from '../components/SignUp/SignUp'
import { AppThemeType, initializeAppTC, SetAppThemeAC } from '../redux/app-reducer'
import { loadState } from '../redux/localStorage'
import { useAppDispatch, useAppSelector } from '../utils/hooks'

export const PATH = {
  home: '/',
  login: '/login',
  registration: '/registration',
  profile: '/profile',
  error404: '/error404',
  passwordRecovery: '/passwordRecovery',
  checkEmail: '/checkEmail',
  packList: '/packList',
  pack: '/pack/:packID',
  createNewPassword: '/createNewPassword/:token',
  learn: '/learn/:id',
}

function App() {
  const isInitialized = useAppSelector(state => state.app.isInitialized)
  const loading = useAppSelector(state => state.app.status)
  const theme = useAppSelector(state => state.app.theme)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
    dispatch(SetAppThemeAC(loadState() as AppThemeType))
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className={`App ${t[theme]}`}>
      <ThemeProvider theme={theme === 'light' ? LightTheme : darkTheme}>
        <Header />
        {loading === 'loading' ? <LinearProgress /> : <div style={{ height: '4px' }} />}
        <div className="container">
          <Routes>
            <Route path={PATH.home} element={<Home />} />
            <Route path={PATH.login} element={<Login />} />
            <Route path={PATH.registration} element={<SignUp />} />
            <Route path={PATH.profile} element={<ProfileCard />} />
            <Route path={PATH.error404} element={<Error404 />} />
            <Route path={PATH.passwordRecovery} element={<PasswordRecovery />} />
            <Route path={PATH.learn} element={<Learn />} />
            <Route path={PATH.createNewPassword} element={<CreateNewPassword />} />
            <Route path={PATH.checkEmail} element={<CheckEmail />} />
            <Route path={PATH.packList} element={<PackList />} />
            <Route path={PATH.pack} element={<CardsList />} />
          </Routes>
          <NotificationBar />
        </div>
      </ThemeProvider>
    </div>
  )
}

export default App
