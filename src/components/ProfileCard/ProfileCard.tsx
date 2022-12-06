import React, { ChangeEvent, useState } from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LogoutIcon from '@mui/icons-material/Logout'
import { Avatar, styled } from '@mui/material'
import Badge from '@mui/material/Badge'
import { Link, Navigate } from 'react-router-dom'

import { PATH } from '../../app/App'
import photoCamera from '../../assets/picture/icons8-camera-48.png'
import SuperButton from '../../common/Button/SuperButton/SuperButton'
import { SetAppErrorAC } from '../../redux/app-reducer'
import { logOutTC } from '../../redux/auth-reducer'
import { updateUserProfileTC, UserType } from '../../redux/profile-reducer'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { convertToBase64 } from '../../utils/uploadImages/ConvertToBase64'
import { EditableSpan } from '../EditableSpan/EditableSpan'

import s from './ProfileCard.module.css'

export const customAvatar =
  'https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0='

export const ProfileCard = () => {
  const dispatch = useAppDispatch()
  const avatar = useAppSelector(state => state.profile.avatar)
  const name = useAppSelector(state => state.profile.name)
  const email = useAppSelector(state => state.profile.email)
  const userName = useAppSelector(state => state.profile.name)
  const [ava, setAva] = useState(customAvatar)

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={PATH.login} />
  }

  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 36,
    height: 36,
    background: '#bdbdbd',
  }))

  const logOutHandler = () => {
    dispatch(logOutTC())
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertToBase64(file, (file64: string) => {
          dispatch(updateUserProfileTC(name, file64))
        })
      } else {
        dispatch(SetAppErrorAC('File size is too big'))
      }
    }
  }

  const UpdateDataHandler = (name: string) => {
    dispatch(updateUserProfileTC(name, avatar))
  }

  return (
    <>
      <div className={s.arrow}>
        <Link to={PATH.packList} className={s.link}>
          <ArrowBackIcon fontSize={'small'} /> Back to Packs List
        </Link>
      </div>
      <div className={s.card}>
        <div className={s.container}>
          <div className={s.title}>Personal information</div>
          <label>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={<SmallAvatar alt="uploadPhoto" src={photoCamera} />}
            >
              <input type="file" onChange={onChangeHandler} style={{ display: 'none' }} />
              <Avatar
                sx={{ width: 96, height: 96 }}
                alt={'User Name'}
                src={avatar === '' ? customAvatar : avatar}
              />
            </Badge>
          </label>

          <EditableSpan value={userName} onChange={UpdateDataHandler} />
          <div className={s.email}>{email}</div>
          <SuperButton onClick={logOutHandler} className={s.button}>
            <LogoutIcon /> Log out
          </SuperButton>
        </div>
      </div>
    </>
  )
}
