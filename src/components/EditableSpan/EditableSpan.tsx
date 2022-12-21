import React, { ChangeEvent, useState } from 'react'

import EditIcon from '@mui/icons-material/Edit'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField'

import { useAppDispatch } from '../../utils/hooks'

import s from './EditableSpan.module.css'

type EditableSpanPropsType = {
  value: string
  onChange: (newUserName: string) => void
}
export const EditableSpan = function (props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false)
  const [userName, setUserName] = useState(props.value)

  const activateEditMode = () => {
    setEditMode(true)
  }
  const deactivateMode = () => {
    setEditMode(false)
    props.onChange(userName)
  }
  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    return setUserName(event.currentTarget.value)
  }

  return editMode ? (
    <div className={s.input}>
      <TextField
        onChange={onStatusChange}
        value={userName}
        id="standard-basic"
        label="Nickname"
        variant="standard"
        autoFocus
      />
      <Button onClick={deactivateMode} variant="contained">
        SAVE
      </Button>
    </div>
  ) : (
    <div onClick={activateEditMode} className={s.userName}>
      {props.value}
      <EditIcon fontSize={'small'} />
    </div>
  )
}
