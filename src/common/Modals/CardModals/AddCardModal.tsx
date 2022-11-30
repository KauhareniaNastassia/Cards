import React, { ChangeEvent, useState } from 'react'

import TextField from '@mui/material/TextField/TextField'

import { BasicModal } from '../Basic Modal/BasicModal'
import { ButtonBlockForModals } from '../ButtonBlockForModals/ButtonBlockForModals'

type AddCardModalPropsType = {
  title: string
  open: boolean
  toggleOpenMode: (value: boolean) => void
  addItem: (question: string, answer: string) => void
}

export const AddCardModal = (props: AddCardModalPropsType) => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const onCloseModalHandler = () => {
    props.toggleOpenMode(false)
    setQuestion('')
    setAnswer('')
  }

  const inputAddQuestionHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.currentTarget.value)
  }

  const inputAddAnswerHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.currentTarget.value)
  }

  const saveButtonHandler = () => {
    props.addItem(question, answer)
    props.toggleOpenMode(false)
    setQuestion('')
    setAnswer('')
  }

  return (
    <BasicModal
      title={props.title}
      open={props.open}
      toggleOpenMode={props.toggleOpenMode}
      onCloseModal={onCloseModalHandler}
    >
      <TextField
        value={question}
        label="Question"
        variant="standard"
        onChange={inputAddQuestionHandler}
        autoFocus
      />
      <TextField
        value={answer}
        label="Answer"
        variant="standard"
        onChange={inputAddAnswerHandler}
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
