import React from 'react'

import { useSelector } from 'react-redux'

import { AppRootStateType } from '../../redux/store'

import ProfileCard from './ProfileCard/ProfileCard'

const Profile = () => {
  const profile = useSelector<AppRootStateType>(state => state.profile)

  // return <ProfileCard profile={profile} />
  return <div>profile</div>
}

export default Profile
