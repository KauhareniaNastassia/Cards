import React from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'

import { PATH } from '../../app/App'

import s from './Back.module.css'

export const BackToPackList = () => {
  return (
    <div className={s.arrow}>
      <Link to={PATH.packList} className={s.link}>
        <ArrowBackIcon fontSize={'small'} /> Back to Packs List
      </Link>
    </div>
  )
}
