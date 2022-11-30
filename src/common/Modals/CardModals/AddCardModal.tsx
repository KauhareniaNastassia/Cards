import React, { ChangeEvent, useState } from 'react'

import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import FormControl from '@mui/material/FormControl/FormControl'
import InputLabel from '@mui/material/InputLabel/InputLabel'
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
  const [typeOfQuestion, setTypeOfQuestion] = useState('Text')

  const onCloseModalHandler = () => {
    props.toggleOpenMode(false)
    setQuestion('')
    setAnswer('')
  }

  const onChangeQuestionTypeHandler = (event: SelectChangeEvent) => {
    setTypeOfQuestion(event.target.value as string)
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
        onChange={inputAddQuestionHandler}
        autoFocus
      />
      <TextField
        value={answer}
        label="Answer"
        variant="standard"
        sx={{ width: '100%' }}
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
