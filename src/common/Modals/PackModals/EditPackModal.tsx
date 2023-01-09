import React, { ChangeEvent, useState } from 'react'

import TextField from '@mui/material/TextField/TextField'

import { InputTypeFile } from '../../utils/uploadImages/InputTypeFile'
import { BasicModal } from '../Basic Modal/BasicModal'
import { ButtonBlockForModals } from '../ButtonBlockForModals/ButtonBlockForModals'

type EditModalPropsType = {
  itemTitle: string
  title: string
  open: boolean
  toggleOpenMode: (value: boolean) => void
  editItem: (name: string, deckCover: string) => void
  img: string
}

export const EditPackModal = (props: EditModalPropsType) => {
  const [name, setName] = useState(props.itemTitle)
  const [deckCover, setDeckCover] = useState(props.img)

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value)
  }

  const onCloseModalHandler = () => {
    props.toggleOpenMode(false)
  }

  const editButtonHandler = () => {
    props.editItem(name, deckCover)
    props.toggleOpenMode(false)
  }

  return (
    <BasicModal
      title={props.title}
      open={props.open}
      toggleOpenMode={props.toggleOpenMode}
      onCloseModal={onCloseModalHandler}
    >
      <InputTypeFile
        title={'Change pack cover'}
        img={deckCover}
        name={'coverFile'}
        saveImg={setDeckCover}
      />
      <TextField
        value={name}
        label="Name pack"
        variant="standard"
        style={{ width: '100%' }}
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
