import React, { ChangeEvent, useState } from 'react'

import TextField from '@mui/material/TextField/TextField'

import { BasicModal } from '../Basic Modal/BasicModal'
import { ButtonBlockForModals } from '../ButtonBlockForModals/ButtonBlockForModals'

type EditModalPropsType = {
  itemTitle: string
  title: string
  open: boolean
  toggleOpenMode: (value: boolean) => void
  editItem: (name: string) => void
}

export const EditPackModal = (props: EditModalPropsType) => {
  const [name, setName] = useState(props.itemTitle)

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value)
  }

  const onCloseModalHandler = () => {
    props.toggleOpenMode(false)
  }

  const editButtonHandler = () => {
    props.editItem(name)
    props.toggleOpenMode(false)
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
        autoFocus
      />
      <ButtonBlockForModals
        onCloseModalHandler={onCloseModalHandler}
        actionButtonHandler={editButtonHandler}
        actionButtonTitle={'Edit'}
      />
    </BasicModal>
  )
}
