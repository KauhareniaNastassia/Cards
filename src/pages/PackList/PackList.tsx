import React, { useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import { Navigate, useSearchParams } from 'react-router-dom'

import { PATH } from '../../app/App'
import { AddPackModal } from '../../common/Modals/PackModals/AddPackModal'
import { filterAllParams } from '../../common/utils/filterParams'
import { useAppDispatch, useAppSelector } from '../../common/utils/hooks'
import { useDebounce } from '../../common/utils/useDebounce'
import { FilterBar } from '../../components/FilterBar/FilterBar'
import { PaginationBar } from '../../components/PaginationBar/PaginationBar'
import {
  addNewPackTC,
  getPacksTC,
  setShowPackCardsAC,
  updateUrlParamsAC,
} from '../../redux/pack-reducer'

import s from './PackList.module.css'
import { TableContainerPacks } from './TableContainerPacks/TableContainerPacks'

export const PackList = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [openAddModal, setOpenAddModal] = useState(false)

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const user_id = useAppSelector(state => state.profile._id)
  const paramsSearchState = useAppSelector(state => state.packs.params)
  const pageCount = useAppSelector(state => state.packs.params.pageCount)
  const page = useAppSelector(state => state.packs.params.page)

  const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)

  const pageURL = searchParams.get('page') ? searchParams.get('page') + '' : '1'
  const pageCountURL = searchParams.get('pageCount') ? searchParams.get('pageCount') + '' : '5'
  const packNameURL = searchParams.get('packName') ? searchParams.get('packName') + '' : ''
  const userIDURL = searchParams.get('user_id') ? searchParams.get('user_id') + '' : ''
  const minRangeURL = searchParams.get('min') ? searchParams.get('min') + '' : ''
  const maxRangeURL = searchParams.get('max') ? searchParams.get('max') + '' : ''

  const [packName, setPackName] = useState<string>(packNameURL ? packNameURL : '')
  const debouncedValue = useDebounce<string>(packName, 1000)

  const paginationPages = Math.ceil(cardPacksTotalCount / (pageCount ? +pageCount : 1))

  const urlParamsFilter = filterAllParams({
    page: pageURL,
    pageCount: pageCountURL,
    packName: packNameURL,
    user_id: userIDURL,
    min: minRangeURL,
    max: maxRangeURL,
  })

  const onClickButtonMyHandler = () => {
    const urlParams = {
      ...filterAllParams({
        ...paramsSearchState,
        user_id,
        page: pageURL,
        pageCount: pageCountURL,
        min: minRangeURL,
        max: maxRangeURL,
        packName,
      }),
    }

    dispatch(setShowPackCardsAC('my'))
    dispatch(updateUrlParamsAC({ ...urlParams }))

    setSearchParams({ ...urlParams })
  }

  const onClickButtonAllHandler = () => {
    const urlParams = {
      ...filterAllParams({
        ...paramsSearchState,
        user_id: '',
        page: pageURL,
        pageCount: pageCountURL,
        min: minRangeURL,
        max: maxRangeURL,
        packName,
      }),
    }

    dispatch(setShowPackCardsAC('all'))
    dispatch(updateUrlParamsAC({ ...urlParams }))
    setSearchParams({ ...urlParams })
  }

  const setResetFilterHandler = () => {
    dispatch(updateUrlParamsAC({ page: '1', pageCount: '5', user_id: '', min: '', max: '' }))
    setSearchParams({ page: '1', pageCount: '5' })
    setPackName('')
  }

  const onChangeCommittedRangeHandler = (min: string, max: string) => {
    dispatch(updateUrlParamsAC({ ...paramsSearchState, min, max, user_id: userIDURL }))
    setSearchParams({
      ...filterAllParams({ ...paramsSearchState, min, max, user_id: userIDURL, packName }),
    })
  }

  const addButtonClickHandler = () => {
    setOpenAddModal(true)
  }

  const addPack = (name: string, deckCover: string) => {
    dispatch(addNewPackTC({ name, deckCover }))
  }
  const pageCountHandler = (value: string) => {
    dispatch(updateUrlParamsAC({ ...paramsSearchState, pageCount: value, min: '', max: '' }))
    setSearchParams({
      ...filterAllParams({
        ...paramsSearchState,
        pageCount: value,
        min: minRangeURL,
        max: maxRangeURL,
        userID: userIDURL,
        packName,
      }),
    })
  }

  const changePageHandle = (page: number) => {
    dispatch(updateUrlParamsAC({ ...paramsSearchState, page: page + '' }))
    setSearchParams({
      ...filterAllParams({
        ...paramsSearchState,
        page: page + '',
        userID: userIDURL,
        packName,
      }),
    })
  }

  const searchValueTextHandler = (valueSearch: string) => {
    setPackName(valueSearch)
  }

  useEffect(() => {
    setSearchParams({
      ...filterAllParams({
        ...paramsSearchState,
        pageCount: pageCountURL,
        page: pageURL,
        packName,
        user_id: userIDURL,
        min: minRangeURL,
        max: maxRangeURL,
      }),
    })
  }, [debouncedValue])

  useEffect(() => {
    if (JSON.stringify(paramsSearchState) !== JSON.stringify(urlParamsFilter)) {
      dispatch(updateUrlParamsAC({ ...urlParamsFilter }))
    }
  }, [dispatch, urlParamsFilter])

  useEffect(() => {
    if (JSON.stringify(paramsSearchState) === JSON.stringify(urlParamsFilter)) {
      dispatch(getPacksTC())
    }
  }, [dispatch, paramsSearchState])

  if (!isLoggedIn) {
    return <Navigate to={PATH.login} />
  }

  return (
    <section>
      <div className={s.headerWrapper}>
        <h2 className={s.title}>Pack list</h2>
        <Button
          variant="contained"
          style={{ borderRadius: '20px' }}
          onClick={addButtonClickHandler}
        >
          Add new Pack
        </Button>
      </div>
      <AddPackModal
        title="Add new pack"
        open={openAddModal}
        toggleOpenMode={setOpenAddModal}
        addItem={addPack}
      />
      <FilterBar
        onClickButtonMy={onClickButtonMyHandler}
        onClickButtonAll={onClickButtonAllHandler}
        onChangeCommittedRange={onChangeCommittedRangeHandler}
        setResetFilter={setResetFilterHandler}
        valueSearch={packName}
        searchValueText={searchValueTextHandler}
        minRangeURL={minRangeURL}
        maxRangeURL={maxRangeURL}
        urlUserID={userIDURL}
      />
      <TableContainerPacks />
      <PaginationBar
        handleChangePage={changePageHandle}
        pageCountHandler={pageCountHandler}
        page={+(page ? page : 1)}
        pageCount={+(pageCount ? pageCount : 5)}
        paginationPages={paginationPages}
        selectOption={[5, 10, 20]}
      />
    </section>
  )
}
