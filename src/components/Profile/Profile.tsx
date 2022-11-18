import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { PATH } from '../../app/App'
import { AppRootStateType } from '../../redux/store'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import ProfileCard from './ProfileCard/ProfileCard'

const Profile = () => {
  const profile = useAppSelector(state => state.profile)

  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={PATH.login} />
  }

  return <ProfileCard profile={profile} />
}

export default Profile
