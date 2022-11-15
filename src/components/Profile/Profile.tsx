import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'

import { UserType } from '../../redux/profileReducer'
import { AppRootStateType } from '../../redux/store'

import ProfileCard from './ProfileCard/ProfileCard'

const Profile = () => {
  const dispatch = useDispatch<Dispatch<any>>()
  const profile = useSelector<AppRootStateType, UserType>(state => state.profile)

  return <ProfileCard profile={profile} />
}

export default Profile
