import React from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LogoutIcon from '@mui/icons-material/Logout'
import { Avatar, styled } from '@mui/material'
import Badge from '@mui/material/Badge'
import { Link } from 'react-router-dom'

import { PATH } from '../../../app/App'
import photoCamera from '../../../assets/picture/icons8-camera-48.png'
import SuperButton from '../../../common/Button/SuperButton/SuperButton'
import { logOutTC } from '../../../redux/auth-Reducer'
import { UserType } from '../../../redux/profileReducer'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'
import { EditableSpan } from '../../EditableSpan/EditableSpan'

import s from './ProfileCard.module.css'

export type ProfileType = {
  profile: UserType
}
export const customAvatar =
  'https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0='

const ProfileCard = (props: ProfileType) => {
  const dispatch = useAppDispatch()

  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 36,
    height: 36,
    background: '#bdbdbd',
  }))

  const logOutHandler = () => {
    dispatch(logOutTC())
  }

  return (
    <>
      <div className={s.arrow}>
        <Link to={PATH.home} className={s.link}>
          <ArrowBackIcon fontSize={'small'} /> Back to Packs List
        </Link>
      </div>
      <div className={s.card}>
        <div className={s.container}>
          <div className={s.title}>Personal information</div>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={<SmallAvatar alt="uploadPhoto" src={photoCamera} />}
          >
            <Avatar
              sx={{ width: 96, height: 96 }}
              alt={'User Name'}
              src={props.profile.avatar === '' ? customAvatar : props.profile.avatar}
            />
          </Badge>
          <EditableSpan value={props.profile.name} />
          <div className={s.email}>{props.profile.email}</div>
          <SuperButton onClick={logOutHandler} className={s.button}>
            <LogoutIcon /> Log out
          </SuperButton>
        </div>
      </div>
    </>
  )
}

export default ProfileCard
