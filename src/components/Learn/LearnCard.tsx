import React, { useEffect, useState } from 'react'

import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { useParams } from 'react-router-dom'

import { CardPackType } from '../../api/cards-API'
import { createLearnCardsTC, setCardsTC } from '../../redux/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import s from './Learn.module.css'
const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']
const getCard = (cards: CardPackType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
  const rand = Math.random() * sum
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)

      return { sum: newSum, id: newSum < rand ? i : acc.id }
    },
    { sum: 0, id: -1 }
  )

  return cards[res.id + 1]
}

export const LearnCard = () => {
  const dispatch = useAppDispatch()
  const [first, setFirst] = useState<boolean>(true)
  const [answer, setAnswer] = useState(false)
  const [valueRadio, setValueRadio] = useState<number>(1)
  const { id } = useParams()
  const cards = useAppSelector(state => state.cards.cards)
  const [card, setCard] = useState<CardPackType>({
    _id: '',
    cardsPack_id: '',
    user_id: '',
    answer: '',
    question: '',
    grade: 0,
    shots: 0,
    comments: '',
    type: '',
    rating: 0,
    more_id: '',
    created: '',
    updated: '',
    __v: 0,
  })
  const onClickHandler = () => {
    setAnswer(!answer)
  }

  useEffect(() => {
    if (first) {
      dispatch(setCardsTC({ cardsPack_id: id }))
      setFirst(false)
    }

    if (cards.length > 0) {
      setCard(getCard(cards))
    }

    return () => {}
  }, [dispatch, id, cards, first])

  const onNext = () => {
    setAnswer(false)
    if (cards.length > 0) {
      dispatch(createLearnCardsTC({ card_id: card._id, grade: valueRadio }))
      setCard(getCard(cards))
    }
  }

  if (cards.length > 0) {
    return (
      <div className={s.card}>
        <div className={s.question}>
          Question:
          <span className={s.questionText}>{card.question}</span>
        </div>
        <div className={s.count}>Количество попыток ответа на вопрос: {card.shots}</div>

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
              Answer: <span className={s.questionText}> {card.answer}</span>
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

  // eslint-disable-next-line react/no-unescaped-entities
  return <div style={{ marginTop: '30px' }}>This pack doesn't contains any cards</div>
}
