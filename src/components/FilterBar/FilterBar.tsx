import { memo, useCallback, useEffect, useState } from 'react'

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
export const FilterBar = memo((props: propsType) => {
  const dispatch = useAppDispatch()

  const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
  const theme = useAppSelector(state => state.app.theme)

  const [minRange, setMinRange] = useState<number>(minCardsCount)
  const [maxRange, setMaxRange] = useState<number>(maxCardsCount)

  const style = (theme: 'light' | 'dark') => {
    return theme === 'light'
      ? { height: '25px', width: '25px' }
      : { height: '25px', width: '25px', color: '#28282B' }
  }

  useEffect(() => {
    setMinRange(props.minRangeURL ? +props.minRangeURL : minCardsCount)
    setMaxRange(props.maxRangeURL ? +props.maxRangeURL : maxCardsCount)
  }, [minCardsCount, maxCardsCount])

  const onClickClearFiltersHandler = useCallback(() => {
    props.setResetFilter()
    setMinRange(minCardsCount)
    setMaxRange(maxCardsCount)
  }, [dispatch, props.setResetFilter])

  const onChangeRangeHandler = (value: [number, number]) => {
    setMinRange(value[0])
    setMaxRange(value[1])
  }

  const onChangeCommittedHandler = useCallback(
    (value: [number, number]) => {
      props.onChangeCommittedRange(value[0] + '', value[1] + '')
    },
    [dispatch, props.onChangeCommittedRange]
  )

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
          <div className={s.sliderValues}>{minRange}</div>
          <SliderFromMateUI
            value={[minRange, maxRange]}
            min={minCardsCount}
            max={maxCardsCount}
            onChangeRange={onChangeRangeHandler}
            onChangeCommitted={onChangeCommittedHandler}
          />
          <div className={s.sliderValues}>{maxRange}</div>
        </div>
      </div>
      <div className={s.clearFilters}>
        <IconButton onClick={onClickClearFiltersHandler}>
          <FilterAltOffOutlinedIcon sx={style(theme)} />
        </IconButton>
      </div>
    </div>
  )
})
