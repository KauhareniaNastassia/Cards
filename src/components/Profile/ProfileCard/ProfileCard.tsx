import React from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LogoutIcon from '@mui/icons-material/Logout'
import { Avatar, styled } from '@mui/material'
import Badge from '@mui/material/Badge'

import photoCamera from '../../../assets/picture/icons8-camera-48.png'
import SuperButton from '../../../common/Button/SuperButton/SuperButton'
import { logOutTC } from '../../../redux/auth-Reducer'
import { UserType } from '../../../redux/profileReducer'
import { useAppDispatch } from '../../../utils/hooks'
import { EditableSpan } from '../../EditableSpan/EditableSpan'

import s from './ProfileCard.module.css'

export type ProfileType = {
  profile: UserType
}
const ProfileCard = (props: ProfileType) => {
  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 36,
    height: 36,
    background: '#bdbdbd',
  }))
  const dispatch = useAppDispatch()

  const logOutHandler = () => {
    dispatch(logOutTC())
  }

  return (
    <>
      <div className={s.arrow}>
        <a className={s.link} href="">
          <ArrowBackIcon fontSize={'small'} /> Back to Packs List
        </a>
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
              src={
                props.profile.avatar === ''
                  ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScVWdpSX0xv-SPTJEGBorXQzdtwZuCh-XdyA&usqp=CAU'
                  : props.profile.avatar
              }
            />
          </Badge>
          <EditableSpan value={props.profile.name} onChange={() => {}} />
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
