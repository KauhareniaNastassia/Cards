import React, { useState } from 'react'

import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

import { setCardsTC } from '../../redux/cards-reducer'
import { useAppSelector } from '../../utils/hooks'

import s from './Learn.module.css'
import { LearnCard } from './LearnCard'

export const Learn = () => {
  const cardsPack_id = useAppSelector(state => state.cards.cardsPack_id)
  const cards = useAppSelector(state => state.cards)
  const [answer, setAnswer] = useState(false)

  return (
    <div className={s.wrapper}>
      <div className={s.packName}>Learn {cards.packName}</div>
      {/*<LearnCard*/}
      {/*  _id={}*/}
      {/*  cardsPack_id={}*/}
      {/*  user_id={}*/}
      {/*  answer={}*/}
      {/*  question={}*/}
      {/*  grade={}*/}
      {/*  shots={}*/}
      {/*  comments={}*/}
      {/*  type={}*/}
      {/*  rating={}*/}
      {/*  more_id={}*/}
      {/*  created={}*/}
      {/*  updated={}*/}
      {/*  __v={}*/}
      {/*/>*/}
    </div>
  )
}
