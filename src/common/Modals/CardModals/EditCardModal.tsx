import React, { ChangeEvent, useEffect, useState } from 'react'

import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import FormControl from '@mui/material/FormControl/FormControl'
import InputLabel from '@mui/material/InputLabel/InputLabel'
import TextField from '@mui/material/TextField/TextField'

import { QuestionType } from '../../../api/cards-API'
import { InputTypeFile } from '../../utils/uploadImages/InputTypeFile'
import { BasicModal } from '../Basic Modal/BasicModal'
import { ButtonBlockForModals } from '../ButtonBlockForModals/ButtonBlockForModals'

type EditModalPropsType = {
  cardQuestion: string
  cardAnswer: string
  cardQuestionImg: string
  cardAnswerImg: string
  questionType: string
  title: string
  open: boolean
  toggleOpenMode: (value: boolean) => void
  editItem: (
    newQuestion: string,
    newAnswer: string,
    newQuestionImg: string,
    newAnswerImg: string
  ) => void
}

export const EditCardModal = (props: EditModalPropsType) => {
  const [question, setQuestion] = useState(props.cardQuestion)
  const [answer, setAnswer] = useState(props.cardAnswer)
  const [questionImg, setQuestionImg] = useState(props.cardQuestionImg)
  const [answerImg, setAnswerImg] = useState(props.cardAnswerImg)
  const [typeOfQuestion, setTypeOfQuestion] = useState('')

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
    //setTypeOfQuestion(event.target.value as string)
    setTypeOfQuestion(event.target.value as QuestionType)
  }

  const editButtonHandler = () => {
    props.editItem(question, answer, questionImg, answerImg)
    props.toggleOpenMode(false)
  }

  const onQuestionImgChangeHandler = (questionImg: string) => {
    setQuestionImg(questionImg)
  }
  const onAnswerImgChangeHandler = (answerImg: string) => {
    setAnswerImg(answerImg)
  }

  useEffect(() => {
    setQuestion(question)
    setAnswer(answer)
    setQuestionImg(questionImg)
    setAnswerImg(answerImg)
    props.cardQuestionImg ? setTypeOfQuestion('Image') : setTypeOfQuestion('Text')
  }, [question, answer, questionImg, answerImg])

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
      {typeOfQuestion === 'Text' ? (
        <div>
          <TextField
            value={question}
            label="Question"
            variant="standard"
            //type="text"
            sx={{ width: '100%', marginBottom: '15px' }}
            onChange={inputChangeQuestionHandler}
          />
          <TextField
            value={answer}
            label="Answer"
            variant="standard"
            //type="text"
            sx={{ width: '100%' }}
            onChange={inputChangeAnswerHandler}
          />
        </div>
      ) : (
        <div>
          <InputTypeFile
            title={'Upload question image'}
            img={questionImg}
            name={'questionFile'}
            saveImg={onQuestionImgChangeHandler}
          />
          <InputTypeFile
            title={'Upload answer image'}
            img={answerImg}
            name={'answerFile'}
            saveImg={onAnswerImgChangeHandler}
          />
        </div>
      )}
      <ButtonBlockForModals
        onCloseModalHandler={onCloseModalHandler}
        actionButtonHandler={editButtonHandler}
        actionButtonTitle={'Edit'}
      />
    </BasicModal>
  )
}
