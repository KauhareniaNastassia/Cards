import { Search } from '@mui/icons-material'
import { Button } from '@mui/material'
import Slider from '@mui/material/Slider'

import { setShowPackCardsAC, setShowPackCardsTC } from '../../redux/pack-reducer'
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
        <div>
          <span>5</span>
          <Slider />
          <span>10</span>
        </div>
      </div>
    </div>
  )
}
