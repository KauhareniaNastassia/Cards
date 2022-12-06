import React, { ChangeEvent } from 'react'

import { Button } from '@mui/material'

import { SetAppErrorAC } from '../../redux/app-reducer'
import { useAppDispatch } from '../hooks'

import { convertToBase64 } from './ConvertToBase64'
import s from './InputTypeFile.module.css'

type InputTypeFilePropsType = {
  title: string
  img: string
  name: string
  saveImg: (img: string) => void
}

export const InputTypeFile = (props: InputTypeFilePropsType) => {
  const dispatch = useAppDispatch()

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertToBase64(file, (img64: string) => {
          props.saveImg(img64)
        })
      } else {
        dispatch(SetAppErrorAC('File size is too big'))
      }
    }
  }

  return (
    <label>
      <Button
        style={{ borderRadius: '20px', width: '100%', marginTop: '15px' }}
        variant="contained"
        component="label"
      >
        {props.title}
        <input hidden accept="image/*" type="file" onChange={uploadHandler} />
      </Button>
      {props.img && <div className={s.image} style={{ backgroundImage: `url(${props.img})` }} />}
    </label>
  )
}
