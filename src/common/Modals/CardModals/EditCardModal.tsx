import React, { ChangeEvent, useState } from 'react'

import TextField from '@mui/material/TextField/TextField'

import { BasicModal } from '../Basic Modal/BasicModal'
import { ButtonBlockForModals } from '../ButtonBlockForModals/ButtonBlockForModals'

type EditModalPropsType = {
  cardQuestion: string
  cardAnswer: string
  title: string
  open: boolean
  toggleOpenMode: (value: boolean) => void
  editItem: (newQuestion: string, newAnswer: string) => void
}

export const EditCardModal = (props: EditModalPropsType) => {
  const [question, setQuestion] = useState(props.cardQuestion)
  const [answer, setAnswer] = useState(props.cardAnswer)

  const inputChangeQuestionHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.currentTarget.value)
  }

  const inputChangeAnswerHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.currentTarget.value)
  }

  const onCloseModalHandler = () => {
    props.toggleOpenMode(false)
  }

  const editButtonHandler = () => {
    props.editItem(question, answer)
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
        value={question}
        label="Question"
        variant="standard"
        onChange={inputChangeQuestionHandler}
        autoFocus
      />
      <TextField
        value={answer}
        label="Answer"
        variant="standard"
        onChange={inputChangeAnswerHandler}
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
