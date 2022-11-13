import React from 'react'

import './App.css'

import { Link, Navigate, Route, Routes } from 'react-router-dom'

import { CreateNewPassword } from '../components/CreateNewPassword/CreateNewPassword'
import { Error404 } from '../components/Error404/Error404'
import Header from '../components/Header/Header'
import { Login } from '../components/Login/Login'
import NavigationForUs from '../components/NavigationForUs/NavigationForUs'
import { PasswordRecovery } from '../components/PasswordRecovery/PasswordRecovery'
import { Profile } from '../components/Profile/Profile'
import SignUp from '../components/SignUp/SignUp'
import TestComponents from '../components/TestComponents/TestComponents'

export const PATH = {
  HOME: '/',
  Login: '/login',
  registration: '/registration',
  profile: '/profile',
  error404: '/error404',
  passwordRecovery: '/passwordRecovery',
  createNewPassword: '/createNewPassword',
  testComponents: '/testComponents',
}
function App() {
  return (
    <div className="App">
      <NavigationForUs />
      <Header />
      <Routes>
        <Route path={PATH.HOME} element={<Navigate to={'/testComponents'} />} />

        <Route path={PATH.Login} element={<Login />} />
        <Route path={PATH.registration} element={<SignUp />} />
        <Route path={PATH.profile} element={<Profile />} />
        <Route path={PATH.error404} element={<Error404 />} />
        <Route path={PATH.passwordRecovery} element={<PasswordRecovery />} />
        <Route path={PATH.createNewPassword} element={<CreateNewPassword />} />
        <Route path={PATH.testComponents} element={<TestComponents />} />
      </Routes>
    </div>
  )
}

export default App
