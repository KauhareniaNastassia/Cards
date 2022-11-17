import React, { ChangeEvent, useEffect, useState } from 'react'

import EditIcon from '@mui/icons-material/Edit'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField'

import { updateUserProfileTC } from '../../redux/profileReducer'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import s from './EditableSpan.module.css'

type EditableSpanPropsType = {
  value: string
}
export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
  const dispatch = useAppDispatch()
  let [editMode, setEditMode] = useState(false)
  const [userName, setUserName] = useState(props.value)

  const activateEditMode = () => {
    setEditMode(true)
  }
  const deactivateMode = () => {
    setEditMode(false)
    dispatch(updateUserProfileTC(userName))
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
    <div onDoubleClick={activateEditMode} className={s.userName}>
      {props.value}
      <EditIcon fontSize={'small'} />
    </div>
  )
})
