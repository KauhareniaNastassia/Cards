import React from 'react'

import { useAppSelector } from '../../utils/hooks'

import s from './Learn.module.css'
import { LearnCard } from './LearnCard'

export const Learn = () => {
  const packName = useAppSelector(state => state.cards.packName)

  return (
    <div className={s.wrapper}>
      <div className={s.packName}>Learn {`"${packName}"`}</div>
      <LearnCard />
    </div>
  )
}
