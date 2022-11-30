import React, { ChangeEvent, useState } from 'react'

import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import FormControl from '@mui/material/FormControl/FormControl'
import InputLabel from '@mui/material/InputLabel/InputLabel'
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
  const [typeOfQuestion, setTypeOfQuestion] = useState('Text')

  const inputChangeQuestionHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.currentTarget.value)
  }

  const inputChangeAnswerHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.currentTarget.value)
  }

  const onCloseModalHandler = () => {
    props.toggleOpenMode(false)
  }

  const onChangeQuestionTypeHandler = (event: SelectChangeEvent) => {
    setTypeOfQuestion(event.target.value as string)
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
      <FormControl fullWidth>
        <InputLabel>Choose a question format</InputLabel>
        <Select
          value={typeOfQuestion}
          label="Choose a question format"
          sx={{ margin: '10px 0px', height: '30px' }}
          onChange={onChangeQuestionTypeHandler}
        >
          <MenuItem value={'Text'}>Text</MenuItem>
          <MenuItem value={'Image'}>Image</MenuItem>
        </Select>
      </FormControl>
      <TextField
        value={question}
        label="Question"
        variant="standard"
        sx={{ width: '100%', marginBottom: '15px' }}
        onChange={inputChangeQuestionHandler}
        autoFocus
      />
      <TextField
        value={answer}
        label="Answer"
        variant="standard"
        sx={{ width: '100%' }}
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
