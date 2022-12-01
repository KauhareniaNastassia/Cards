import React, { useState } from 'react'

import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

import { CardPackType } from '../../api/cards-API'

import s from './Learn.module.css'

export const LearnCard = (props: CardPackType) => {
  const [answer, setAnswer] = useState(false)
  const onClickHandler = () => {
    setAnswer(!answer)
  }

  return (
    <div className={s.card}>
      <div className={s.question}>
        Question:
        <span className={s.questionText}>{props.question}</span>
      </div>
      <div className={s.count}>Количество попыток ответа на вопрос: {props.shots}</div>

      <div className={s.button}>
        <Button
          className={!answer ? s.buttonMUI : s.none}
          onClick={onClickHandler}
          variant="contained"
        >
          Show answer
        </Button>
      </div>
      {answer && (
        <>
          <div className={s.question}>
            Answer: <span className={s.questionText}> {props.answer}</span>
          </div>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Rate yourself</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel value={1} control={<Radio />} label="Did not know" />
              <FormControlLabel value={2} control={<Radio />} label="Forgot" />
              <FormControlLabel value={3} control={<Radio />} label="A lot of thought" />
              <FormControlLabel value={4} control={<Radio />} label="Confused" />
              <FormControlLabel value={5} control={<Radio />} label="Knew the answer" />
            </RadioGroup>
          </FormControl>

          <div className={s.button}>
            <Button variant="contained" style={{ borderRadius: '20px' }}>
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
