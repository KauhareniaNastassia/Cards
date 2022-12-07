import React, { useState } from 'react'

import { Button, FormControlLabel, Radio } from '@mui/material'

import { CardPackType } from '../../../api/cards-API'
import { createLearnCardsTC, setCardsAC, setCardsTC } from '../../../redux/cards-reducer'
import { setPacksAC } from '../../../redux/pack-reducer'
import { useAppDispatch } from '../../../utils/hooks'
import { getCard } from '../GetCardSmartRandom/getCardSmartRandom'
import s from '../Learn.module.css'

const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']

type LearnCardPropsType = {
  setFirst: (value: boolean) => void
  cards: CardPackType[]
  card: CardPackType
  setCard: (value: any) => void
}
export const LearnCard = (props: LearnCardPropsType) => {
  const dispatch = useAppDispatch()
  const [answer, setAnswer] = useState(false)
  const [valueRadio, setValueRadio] = useState<number>(1)
  const onClickHandler = () => {
    setAnswer(!answer)
  }
  const onNext = () => {
    setAnswer(false)
    props.setFirst(true)
    if (props.cards.length > 0) {
      dispatch(createLearnCardsTC({ card_id: props.card._id, grade: valueRadio }))
      props.setCard(getCard(props.cards))
      setTimeout(() => {
        dispatch(setCardsTC({ cardsPack_id: props.card.cardsPack_id }))
      }, 300)
    }
  }

  return (
    <div className={s.card}>
      <div className={s.question}>
        Question:
        <span className={s.questionText}>{props.card.question}</span>
      </div>
      <div className={s.count}>Количество попыток ответа на вопрос: {props.card.shots}</div>

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
            Answer: <span className={s.questionText}> {props.card.answer}</span>
          </div>
          <div>
            <span>Rate yourself:</span>
            {grades.map((el, index) => {
              const onClickHandler = () => {
                setValueRadio(index + 1)
              }

              return (
                <div key={index}>
                  <FormControlLabel
                    onClick={onClickHandler}
                    value={1}
                    checked={valueRadio === index + 1}
                    control={<Radio />}
                    label={el}
                  />
                </div>
              )
            })}
          </div>

          <div className={s.button}>
            <Button onClick={onNext} variant="contained" style={{ borderRadius: '20px' }}>
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
