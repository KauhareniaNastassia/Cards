import React from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'

import { PATH } from '../../app/App'
import { useAppSelector } from '../../utils/hooks'

import s from './Back.module.css'

export const BackToPackList = () => {
  const theme = useAppSelector(state => state.app.theme)

  return (
    <div className={s.arrow}>
      <Link to={PATH.packList} className={theme === 'dark' ? s.linkBlack : s.link}>
        <ArrowBackIcon fontSize={'small'} /> Back to Packs List
      </Link>
    </div>
  )
}
