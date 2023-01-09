import React, { useState } from 'react'

import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'

import { CardPackType } from '../../../api/cards-API'
import { useAppDispatch, useAppSelector } from '../../../common/utils/hooks'
import { createLearnCardsTC } from '../../../redux/cards-reducer'
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
  const theme = useAppSelector(state => state.app.theme)
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
      dispatch(
        createLearnCardsTC({ card_id: props.card._id, grade: valueRadio, shots: props.card.shots })
      )
      props.setCard(getCard(props.cards))
    }
  }

  return (
    <div className={theme === 'dark' ? s.cardBlack : s.card}>
      <div className={s.question}>
        Question:
        {props.card.questionImg ? (
          <div style={{ maxWidth: '750px', display: 'flex', justifyContent: 'center' }}>
            <img
              style={{ maxWidth: '375px', maxHeight: '120px', marginTop: '20px' }}
              src={props.card.questionImg}
              alt={'question image'}
            />
          </div>
        ) : (
          <div className={s.questionText}>{props.card.question}</div>
        )}
      </div>
      <div className={theme === 'dark' ? s.countBlack : s.count}>
        Количество попыток ответа на вопрос: {props.card.shots}
      </div>

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
            Answer:
            {props.card.answerImg ? (
              <img
                style={{ maxWidth: '375px', maxHeight: '120px', marginTop: '20px' }}
                src={props.card.answerImg}
                alt={'answer image'}
              />
            ) : (
              <span className={s.questionText}> {props.card.answer}</span>
            )}
          </div>
          <div className={s.rating}>
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
