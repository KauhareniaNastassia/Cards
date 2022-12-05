import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'

import {
  Button,
  Pagination,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import NativeSelect from '@mui/material/NativeSelect'
import { Navigate, useSearchParams } from 'react-router-dom'

import { PATH } from '../../app/App'
import { AddPackModal } from '../../common/Modals/PackModals/AddPackModal'
import {
  addNewPackTC,
  getPacksTC,
  setShowPackCardsAC,
  updateUrlParamsAC,
} from '../../redux/pack-reducer'
import { filterAllParams } from '../../utils/filterParams'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { useDebounce } from '../../utils/useDebounce'
import { FilterBar } from '../FilterBar/FilterBar'

import { Pack } from './Pack/Pack'
import s from './PackList.module.css'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey['200'],
    color: theme.palette.common.black,
    fontFamily: 'Montseratt',
    fontWeight: 'bold',
    fontSize: '15px',
  },
}))
const StyledTableCellRow = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontFamily: 'Montseratt',
    fontSize: '15px',
  },
}))

export const PackList = () => {
  const dispatch = useAppDispatch()
  const packs = useAppSelector(state => state.packs.cardPacks)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const user_id = useAppSelector(state => state.profile._id)
  const paramsSearchState = useAppSelector(state => state.packs.params)
  const pageCount = useAppSelector(state => state.packs.params.pageCount)
  const page = useAppSelector(state => state.packs.params.page)
  const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)

  const [searchParams, setSearchParams] = useSearchParams()

  const pageURL = searchParams.get('page') ? searchParams.get('page') + '' : '1'
  const pageCountURL = searchParams.get('pageCount') ? searchParams.get('pageCount') + '' : '5'
  const packNameURL = searchParams.get('packName') ? searchParams.get('packName') + '' : ''
  const userIDURL = searchParams.get('user_id') ? searchParams.get('user_id') + '' : ''
  const minRangeURL = searchParams.get('min') ? searchParams.get('min') + '' : ''
  const maxRangeURL = searchParams.get('max') ? searchParams.get('max') + '' : ''

  const [packName, setPackName] = useState<string>(packNameURL ? packNameURL : '')
  const [openAddModal, setOpenAddModal] = useState(false)

  const debouncedValue = useDebounce<string>(packName, 1000)

  const urlParamsFilter = filterAllParams({
    page: pageURL,
    pageCount: pageCountURL,
    packName: packNameURL,
    user_id: userIDURL,
    min: minRangeURL,
    max: maxRangeURL,
  })

  const onClickButtonMyHandler = useCallback(() => {
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
  }, [dispatch])

  const onClickButtonAllHandler = useCallback(() => {
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
  }, [dispatch])

  const setResetFilterHandler = useCallback(() => {
    dispatch(updateUrlParamsAC({ page: '1', pageCount: '5', user_id: '', min: '', max: '' }))
    setSearchParams({ page: '1', pageCount: '5' })
    setPackName('')
  }, [dispatch])

  const onChangeCommittedRangeHandler = useCallback(
    (min: string, max: string) => {
      dispatch(updateUrlParamsAC({ ...paramsSearchState, min, max, user_id: userIDURL }))
      setSearchParams({
        ...filterAllParams({ ...paramsSearchState, min, max, user_id: userIDURL, packName }),
      })
    },
    [dispatch]
  )

  const addButtonClickHandler = () => {
    setOpenAddModal(true)
  }

  const addPack = (name: string, deckCover: string) => {
    dispatch(addNewPackTC(name, deckCover))
  }
  const pageCountHandler = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const value = e.currentTarget.value

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
    },
    [dispatch]
  )

  const changePageHandle = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      dispatch(updateUrlParamsAC({ ...paramsSearchState, page: page + '' }))
      setSearchParams({
        ...filterAllParams({
          ...paramsSearchState,
          page: page + '',
          userID: userIDURL,
          packName,
        }),
      })
    },
    [dispatch]
  )

  const searchValueTextHandler = useCallback(
    (valueSearch: string) => {
      setPackName(valueSearch)
    },
    [dispatch]
  )

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
      <div className="container">
        <div className={s.HeaderWrapper}>
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
        <TableContainer className={s.table} component={Paper}>
          <Table sx={{ fontFamily: 'Montserrat' }} aria-label="simple table">
            <TableHead>
              <TableRow className={s.tableHead}>
                <StyledTableCell align="left">Cover</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="center">Cards</StyledTableCell>
                <StyledTableCell className={s.lastUpdated} align="center">
                  Last updated
                </StyledTableCell>
                <StyledTableCell align="center">Created by</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {packs.map(pack => (
                <Pack
                  key={pack._id}
                  _id={pack._id}
                  name={pack.name}
                  user_name={pack.user_name}
                  user_id={pack.user_id}
                  cardsCount={pack.cardsCount}
                  updated={pack.updated}
                  deckCover={pack.deckCover}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={s.paginationWithSelect}>
          <Pagination
            className={s.pagination}
            color="primary"
            shape="rounded"
            page={+(page ? page : 1)}
            count={cardPacksTotalCount}
            onChange={changePageHandle}
          />
          <span className={s.show}>Show</span>
          <NativeSelect value={pageCount} onChange={pageCountHandler}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </NativeSelect>
          <span>Cards per page</span>
        </div>
      </div>
    </section>
  )
}
