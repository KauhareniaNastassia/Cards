import React from 'react'

import './App.css'

import { Navigate, Route, Routes } from 'react-router-dom'

import { CreateNewPassword } from '../components/CreateNewPassword/CreateNewPassword'
import Error404 from '../components/Error404/Error404'
import Header from '../components/Header/Header'
import Home from '../components/Home/Home'
import { Login } from '../components/Login/Login'
import NavigationForUs from '../components/NavigationForUs/NavigationForUs'
import { PasswordRecovery } from '../components/PasswordRecovery/PasswordRecovery'
import Profile from '../components/Profile/Profile'
import SignUp from '../components/SignUp/SignUp'

export const PATH = {
  home: '/',
  login: '/login',
  registration: '/registration',
  profile: '/profile',
  error404: '/error404',
  passwordRecovery: '/passwordRecovery',
  createNewPassword: '/createNewPassword',
}

function App() {
  return (
    <div className="App">
      <NavigationForUs />
      <Header />
      <Routes>
        <Route path={PATH.home} element={<Home />} />
        <Route path={PATH.login} element={<Login />} />
        <Route path={PATH.registration} element={<SignUp />} />
        <Route path={PATH.profile} element={<Profile />} />
        <Route path={PATH.error404} element={<Error404 />} />
        <Route path={PATH.passwordRecovery} element={<PasswordRecovery />} />
        <Route path={PATH.createNewPassword} element={<CreateNewPassword />} />
      </Routes>
    </div>
  )
}

export default App
