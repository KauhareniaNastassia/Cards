import { Search } from '@mui/icons-material'
import { Button } from '@mui/material'

import { SliderFromMateUI } from '../../common/SliderFromMateUI/SliderFromMateUI'
import { setShowPackCardsTC } from '../../redux/pack-reducer'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import s from './FilterBar.module.css'
import { SearchBar } from './Search/Search'

export const FilterBar = () => {
  const showPackCards = useAppSelector(state => state.packs.showPackCards)
  const userID = useAppSelector(state => state.profile._id)
  const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
  const dispatch = useAppDispatch()
  const searchValue = useAppSelector(state => state.packs.searchPackValue)

  return (
    <div className={s.wrapper}>
      <div>
        <h3>Search</h3>
        <SearchBar value={searchValue} />
      </div>
      <div>
        <h3>Show packs cards</h3>
        <Button
          onClick={() => dispatch(setShowPackCardsTC(userID))}
          variant={showPackCards === 'my' ? 'contained' : 'outlined'}
        >
          My
        </Button>
        <Button
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
          <SliderFromMateUI />
          <span className={s.sliderNumbers}>{maxCardsCount}</span>
        </div>
      </div>
    </div>
  )
}
