import { useEffect, useState } from 'react'

import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined'
import { Button, IconButton } from '@mui/material'

import { SliderFromMateUI } from '../../common/SliderFromMateUI/SliderFromMateUI'
import { setShowPackCardsAC } from '../../redux/pack-reducer'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import s from './FilterBar.module.css'
import { SearchBar } from './Search/Search'

type propsType = {
  onClickButtonMy: () => void
  onClickButtonAll: () => void
  onChangeCommittedRange: (min: string, max: string) => void
  minRangeURL: string
  maxRangeURL: string
  urlUserID: string
  searchValueText: (valueSearch: string) => void
  valueSearch: string
  setResetFilter: () => void
}
export const FilterBar = (props: propsType) => {
  const dispatch = useAppDispatch()
  const onClickClearFiltersHandler = () => {
    props.setResetFilter()
    setMinRange(minCardsCount)
    setMaxRange(maxCardsCount)
  }

  const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)

  const [minRange, setMinRange] = useState<number>(minCardsCount)
  const [maxRange, setMaxRange] = useState<number>(maxCardsCount)

  const onChangeRangeHandler = (value: [number, number]) => {
    setMinRange(value[0])
    setMaxRange(value[1])
  }

  const onChangeCommittedHandler = (value: [number, number]) => {
    props.onChangeCommittedRange(value[0] + '', value[1] + '')
  }

  useEffect(() => {
    setMinRange(props.minRangeURL ? +props.minRangeURL : minCardsCount)
    setMaxRange(props.maxRangeURL ? +props.maxRangeURL : maxCardsCount)
  }, [minCardsCount, maxCardsCount])

  return (
    <div className={s.wrapper}>
      <div>
        <h3>Search</h3>
        <SearchBar value={props.valueSearch} onChange={props.searchValueText} />
      </div>
      <div>
        <h3>Show packs cards</h3>
        <Button
          onClick={() => {
            props.onClickButtonMy()
            dispatch(setShowPackCardsAC('my'))
          }}
          variant={props.urlUserID ? 'contained' : 'outlined'}
        >
          My
        </Button>
        <Button
          onClick={props.onClickButtonAll}
          variant={props.urlUserID ? 'outlined' : 'contained'}
        >
          All
        </Button>
      </div>
      <div>
        <h3>Number of cards</h3>
        <div className={s.sliderWrap}>
          <span className={s.sliderValues}>{minRange}</span>
          <SliderFromMateUI
            value={[minRange, maxRange]}
            min={minCardsCount}
            max={maxCardsCount}
            onChangeRange={onChangeRangeHandler}
            onChangeCommitted={onChangeCommittedHandler}
          />
          <span className={s.sliderValues}>{maxRange}</span>
        </div>
      </div>
      <div className={s.clearFilters}>
        <IconButton onClick={onClickClearFiltersHandler}>
          <FilterAltOffOutlinedIcon sx={{ height: '25px', width: '25px' }} />
        </IconButton>
      </div>
    </div>
  )
}
