import { useEffect, useState } from 'react'

import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined'
import { Button, IconButton } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { SliderFromMateUI } from '../../common/SliderFromMateUI/SliderFromMateUI'
import {
  clearFiltersAC,
  getPacksTC,
  ParamsUrlType,
  setShowPackCardsAC,
  updateUrlParamsAC,
} from '../../redux/pack-reducer'
import { filterQueryParams } from '../../utils/filterParams'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import s from './FilterBar.module.css'
import { SearchBar } from './Search/Search'

type propsType = {
  onClickButtonMy: () => void
  onClickButtonAll: () => void
  onChangeCommittedRange: (min: string, max: string) => void
  // setResetFilter: () => void
  valueSearch: string
  // searchValueText: (valueSearch: string) => void
  minRangeURL: string
  maxRangeURL: string
  urlUserID: string
}
export const FilterBar = (props: propsType) => {
  const showPackCards = useAppSelector(state => state.packs.showPackCards)
  const userID = useAppSelector(state => state.profile._id)
  // const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
  // const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
  // const pageCount = useAppSelector(state => state.packs.pageCount)
  // const page = useAppSelector(state => state.packs.page)
  const dispatch = useAppDispatch()
  // const [minRange, setMinRange] = useState<number>(minCardsCount)
  // const [maxRange, setMaxRange] = useState<number>(maxCardsCount)
  //
  const onClickClearFiltersHandler = () => {
    // dispatch(getPacksTC({ page, pageCount }))
    // dispatch(clearFiltersAC())
  }
  //
  // const [searchParams, setSearchParams] = useSearchParams()
  //
  // const pageURL = searchParams.get('page') ? searchParams.get('page') + '' : '1'
  // const pageCountURL = searchParams.get('pageCount') ? searchParams.get('pageCount') + '' : '5'
  // const packNameURL = searchParams.get('packName') ? searchParams.get('packName') + '' : ''
  // const userIDURL = searchParams.get('userID') ? searchParams.get('userID') + '' : ''
  // const minRangeURL = searchParams.get('min') ? searchParams.get('min') + '' : ''
  // const maxRangeURL = searchParams.get('max') ? searchParams.get('max') + '' : ''
  //
  // const urlParams = {
  //   page: pageURL,
  //   pageCount: pageCountURL,
  //   packName: packNameURL,
  //   userID: userIDURL,
  //   min: minRangeURL,
  //   max: maxRangeURL,
  // }
  // const filteredParams = filterQueryParams({ ...urlParams })
  //
  // const onChangeRangeHandler = (value: [number, number]) => {
  //   setMinRange(value[0])
  //   setMaxRange(value[1])
  // }
  //
  // const onChangeCommittedHandler = (value: [number, number]) => {
  //   props.onChangeCommittedRange(value[0] + '', value[1] + '')
  // }
  //
  // useEffect(() => {
  //   setMinRange(minRangeURL ? +minRangeURL : minCardsCount)
  //   setMaxRange(maxRangeURL ? +maxRangeURL : maxCardsCount)
  // }, [minCardsCount, maxCardsCount])
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

  //
  // const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   searchValueText(e.currentTarget.value)
  // }
  // const onFunnelClickHandler = () => {
  //   setResetFilter()
  // }

  useEffect(() => {
    setMinRange(props.minRangeURL ? +props.minRangeURL : minCardsCount)
    setMaxRange(props.maxRangeURL ? +props.maxRangeURL : maxCardsCount)
  }, [minCardsCount, maxCardsCount])

  return (
    <div className={s.wrapper}>
      <div>
        <h3>Search</h3>
        <SearchBar />
      </div>
      <div>
        <h3>Show packs cards</h3>
        <Button
          onClick={() => {
            props.onClickButtonMy()
            dispatch(setShowPackCardsAC('my'))
          }}
          variant={showPackCards === 'my' ? 'contained' : 'outlined'}
        >
          My
        </Button>
        <Button
          onClick={props.onClickButtonAll}
          variant={showPackCards === 'all' ? 'contained' : 'outlined'}
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
