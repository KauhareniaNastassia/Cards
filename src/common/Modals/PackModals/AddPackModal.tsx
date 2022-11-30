import React, { ChangeEvent, useState } from 'react'

import TextField from '@mui/material/TextField/TextField'

import { BasicModal } from '../Basic Modal/BasicModal'
import { ButtonBlockForModals } from '../ButtonBlockForModals/ButtonBlockForModals'

type AddModalPropsType = {
  title: string
  open: boolean
  toggleOpenMode: (value: boolean) => void
  addItem: (name: string) => void
}

export const AddPackModal = (props: AddModalPropsType) => {
  const [name, setText] = useState('')

  const onCloseModalHandler = () => {
    props.toggleOpenMode(false)
    setText('')
  }

  const inputChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setText(evt.currentTarget.value)
  }

  const saveButtonHandler = () => {
    props.addItem(name)
    props.toggleOpenMode(false)
    setText('')
  }

  return (
    <BasicModal
      title={props.title}
      open={props.open}
      toggleOpenMode={props.toggleOpenMode}
      onCloseModal={onCloseModalHandler}
    >
      <TextField
        value={name}
        label="Name pack"
        variant="standard"
        onChange={inputChangeHandler}
        style={{ width: '100%' }}
        autoFocus
      />
      <ButtonBlockForModals
        onCloseModalHandler={onCloseModalHandler}
        actionButtonHandler={saveButtonHandler}
        actionButtonTitle={'Save'}
      />
    </BasicModal>
  )
}
