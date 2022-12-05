import React, { ChangeEvent, useState } from 'react'

import { Button } from '@mui/material'
import TextField from '@mui/material/TextField/TextField'

import defaultPackCover from '../../../assets/picture/defaultImage.jpg'
import { InputTypeFile } from '../../../utils/uploadImages/InputTypeFile'
import { BasicModal } from '../Basic Modal/BasicModal'
import { ButtonBlockForModals } from '../ButtonBlockForModals/ButtonBlockForModals'

type AddModalPropsType = {
  title: string
  open: boolean
  toggleOpenMode: (value: boolean) => void
  addItem: (name: string, deckCover: string) => void
}

export const AddPackModal = (props: AddModalPropsType) => {
  const [name, setText] = useState('')
  const [deckCover, setDeckCover] = useState(defaultPackCover)

  const onCloseModalHandler = () => {
    props.toggleOpenMode(false)
    setText('')
  }

  const inputChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setText(evt.currentTarget.value)
  }

  const saveButtonHandler = () => {
    props.addItem(name, deckCover)
    props.toggleOpenMode(false)
    setText('')
    setDeckCover('')
  }

  return (
    <BasicModal
      title={props.title}
      open={props.open}
      toggleOpenMode={props.toggleOpenMode}
      onCloseModal={onCloseModalHandler}
    >
      <InputTypeFile
        title={'Upload pack cover'}
        img={deckCover}
        name={'coverFile'}
        saveImg={setDeckCover}
      />
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
