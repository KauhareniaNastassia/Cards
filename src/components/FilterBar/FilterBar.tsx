import { Button } from '@mui/material'

import { SliderFromMaeUI } from '../../common/Slider/Slider'
import { setShowPackCardsTC } from '../../redux/pack-reducer'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import s from './FilterBar.module.css'

export const FilterBar = () => {
  const showPackCards = useAppSelector(state => state.packs.showPackCards)
  const userID = useAppSelector(state => state.profile._id)
  const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
  const dispatch = useAppDispatch()

  return (
    <div className={s.wrapper}>
      <div>
        <h3>Search</h3>
        <input type="text" />
      </div>
      <div>
        <h3>Show packs cards</h3>
        <Button
          className={s.button}
          onClick={() => dispatch(setShowPackCardsTC(userID))}
          variant={showPackCards === 'my' ? 'contained' : 'outlined'}
        >
          My
        </Button>
        <Button
          className={s.button}
          onClick={() => dispatch(setShowPackCardsTC())}
          variant={showPackCards === 'all' ? 'contained' : 'outlined'}
        >
          All
        </Button>
      </div>
      <div>
        <h3>Number of cards</h3>
        <div className={s.sliderWrap}>
          <span className={s.sliderNumbers}>{minCardsCount}</span>
          <SliderFromMaeUI />
          <span className={s.sliderNumbers}>{maxCardsCount}</span>
        </div>
      </div>
    </div>
  )
}
