import React, { ChangeEvent, useState } from 'react'

import EditIcon from '@mui/icons-material/Edit'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField'

import s from './EditableSpan.module.css'

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState(props.value)

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.value)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
    // props.updateUserName(props.value)
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode ? (
    <div className={s.input}>
      <TextField
        onChange={changeTitle}
        value={title}
        id="standard-basic"
        label="Nickname"
        variant="standard"
        autoFocus
      />
      <Button onClick={activateViewMode} variant="contained">
        SAVE
      </Button>
    </div>
  ) : (
    <div onDoubleClick={activateEditMode} className={s.userName}>
      {props.value} <EditIcon fontSize={'small'} />
    </div>
  )
})
