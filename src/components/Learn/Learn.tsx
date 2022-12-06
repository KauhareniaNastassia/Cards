import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { CardPackType } from '../../api/cards-API'
import { setCardsTC, setLearnCardsTC } from '../../redux/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import { getCard } from './GetCardSmartRandom/getCardSmartRandom'
import s from './Learn.module.css'
import { LearnCard } from './LearnCard/LearnCard'

export const Learn = () => {
  const packName = useAppSelector(state => state.cards.packName)
  const dispatch = useAppDispatch()
  const [first, setFirst] = useState<boolean>(true)

  const { id } = useParams()
  const cards = useAppSelector(state => state.cards.cards)
  const [card, setCard] = useState<CardPackType>({
    _id: '',
    cardsPack_id: '',
    user_id: '',
    answer: '',
    question: '',
    answerImg: '',
    questionImg: '',
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

  useEffect(() => {
    if (first) {
      // dispatch(setCardsTC({ cardsPack_id: id }))
      setFirst(false)
    }

    if (cards.length > 0) {
      setCard(getCard(cards))
    }

    return () => {}
  }, [dispatch, id, cards, first])

  return (
    <div className={s.wrapper}>
      <div className={s.packName}>Learn {`"${packName}"`}</div>
      {cards.length > 0 ? (
        <LearnCard cards={cards} card={card} setCard={setCard} setFirst={setFirst} />
      ) : (
        // eslint-disable-next-line react/no-unescaped-entities
        <div style={{ marginTop: '30px' }}>This pack doesn't contains any cards</div>
      )}
    </div>
  )
}
