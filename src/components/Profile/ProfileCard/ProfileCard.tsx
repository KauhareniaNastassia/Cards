import React from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LogoutIcon from '@mui/icons-material/Logout'
import { Avatar, styled } from '@mui/material'
import Badge from '@mui/material/Badge'

import photoCamera from '../../../assets/picture/icons8-camera-48.png'
import SuperButton from '../../../common/Button/SuperButton/SuperButton'
import { EditableSpan } from '../../EditableSpan/EditableSpan'

import s from './ProfileCard.module.css'

const ProfileCard = () => {
  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 36,
    height: 36,
    background: '#bdbdbd',
  }))

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
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScVWdpSX0xv-SPTJEGBorXQzdtwZuCh-XdyA&usqp=CAU"
            />
          </Badge>
          <EditableSpan value={''} onChange={() => {}} />
          <div className={s.email}>User Email</div>
          <SuperButton className={s.button}>
            <LogoutIcon /> Log out
          </SuperButton>
        </div>
      </div>
    </>
  )
}

export default ProfileCard
