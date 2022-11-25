import { useEffect } from 'react'

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
import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import s from './FilterBar.module.css'
import { SearchBar } from './Search/Search'

export const FilterBar = () => {
  const showPackCards = useAppSelector(state => state.packs.showPackCards)
  const userID = useAppSelector(state => state.profile._id)
  const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const page = useAppSelector(state => state.packs.page)
  const dispatch = useAppDispatch()

  const onClickClearFiltersHandler = () => {
    // dispatch(getPacksTC({ page, pageCount }))
    // dispatch(clearFiltersAC())
  }

  useEffect(() => {
    dispatch(updateUrlParamsAC({ ...urlParams }))
    dispatch(getPacksTC())
  }, [])

  const [searchParams, setSearchParams] = useSearchParams()

  const pageUrl = searchParams.get('page') ? searchParams.get('page') : '1'
  const pageCountUrl = searchParams.get('pageCount') ? searchParams.get('pageCount') : '5'
  const packNameUrl = searchParams.get('packName') ? searchParams.get('packName') : ''
  const userIdUrl = searchParams.get('userID') ? searchParams.get('userID') : ''
  const minRangeUrl = searchParams.get('min') ? searchParams.get('min') : ''
  const maxRangeUrl = searchParams.get('max') ? searchParams.get('max') : ''

  const urlParams = {
    page: pageUrl,
    pageCount: pageCountUrl,
    packName: packNameUrl,
    userID: userIdUrl,
    max: maxRangeUrl,
    min: minRangeUrl,
  }

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
            setSearchParams({ user_id: userID })
            dispatch(setShowPackCardsAC('my'))
            //dispatch(setShowPackCardsTC(userID))
          }}
          variant={showPackCards === 'my' ? 'contained' : 'outlined'}
        >
          My
        </Button>
        <Button
          onClick={() => {
            setSearchParams({ page: '2', pageCount: '5' })
            dispatch(setShowPackCardsAC('all'))
            //dispatch(setShowPackCardsTC())
          }}
          variant={showPackCards === 'all' ? 'contained' : 'outlined'}
        >
          All
        </Button>
      </div>
      <div>
        <h3>Number of cards</h3>
        <div className={s.sliderWrap}>
          <span className={s.sliderValues}>{minCardsCount}</span>
          <SliderFromMateUI />
          <span className={s.sliderValues}>{maxCardsCount}</span>
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
