import React, { useEffect, useState } from 'react'

import {
  Button,
  IconButton,
  MenuItem,
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
import FormControl from '@mui/material/FormControl/FormControl'
import { Navigate } from 'react-router-dom'

import { PATH } from '../../app/App'
import { AddPackModal } from '../../common/Modals/PackModals/AddPackModal'
import { addNewPackTC, getPacksTC } from '../../redux/pack-reducer'
import {
  addNewPackTC,
  deletePackTC,
  getPacksTC,
  setShowPackCardsAC,
  updatePackTC,
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

  const [searchParams, setSearchParams] = useSearchParams()

  const pageURL = searchParams.get('page') ? searchParams.get('page') + '' : '1'
  const pageCountURL = searchParams.get('pageCount') ? searchParams.get('pageCount') + '' : '5'
  const packNameURL = searchParams.get('packName') ? searchParams.get('packName') + '' : ''
  const userIDURL = searchParams.get('user_id') ? searchParams.get('user_id') + '' : ''
  const minRangeURL = searchParams.get('min') ? searchParams.get('min') + '' : ''
  const maxRangeURL = searchParams.get('max') ? searchParams.get('max') + '' : ''

  const [packName, setPackName] = useState<string>(packNameURL ? packNameURL : '')

  const debouncedValue = useDebounce<string>(packName, 500)

  const urlParamsFilter = filterAllParams({
    page: pageURL,
    pageCount: pageCountURL,
    packName: packNameURL,
    user_id: userIDURL,
    min: minRangeURL,
    max: maxRangeURL,
  })

  // const cardsPage = useAppSelector(state => state.cards.page)
  // const cardsPageCount = useAppSelector(state => state.cards.pageCount)
  // const pageCount = useAppSelector(state => state.packs.pageCount)
  // const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  // const [pageClientCount, setPageCount] = useState(String(pageCount))
  // const [page, setPage] = useState(1)
  // let pagesCount = Math.ceil(cardPacksTotalCount / pageCount)
  //
  // const handleChangePage = (event: unknown, page: number) => {
  //   setPage(page)
  //   dispatch(getPacksTC())
  // }
  //
  // const handleChange = (event: SelectChangeEvent) => {
  //   setPageCount(event.target.value as string)
  //   dispatch(getPacksTC())
  // }

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

  const onChangeCommittedRangeHandler = (min: string, max: string) => {
    dispatch(updateUrlParamsAC({ ...paramsSearchState, min, max, user_id: userIDURL }))
    setSearchParams({
      ...filterAllParams({ ...paramsSearchState, min, max, user_id: userIDURL, packName }),
    })
  }

  useEffect(() => {
    if (JSON.stringify(paramsSearchState) !== JSON.stringify(urlParamsFilter))
      dispatch(updateUrlParamsAC({ ...urlParamsFilter }))
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
          title="Add Pack"
          open={openAddModal}
          toggleOpenMode={setOpenAddModal}
          addItem={addPack}
        />
        <FilterBar />
        <FilterBar
          onClickButtonMy={onClickButtonMyHandler}
          onClickButtonAll={onClickButtonAllHandler}
          onChangeCommittedRange={onChangeCommittedRangeHandler}
          // setResetFilter={setResetFilterHandler}
          valueSearch={packName}
          // searchValueText={searchValueTextHandler}
          minRangeURL={minRangeURL}
          maxRangeURL={maxRangeURL}
          urlUserID={userIDURL}
        />
        <TableContainer className={s.table} component={Paper}>
          <Table sx={{ fontFamily: 'Montserrat' }} aria-label="simple table">
            <TableHead>
              <TableRow className={s.tableHead}>
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
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  _id={pack._id}
                  name={pack.name}
                  user_name={pack.user_name}
                  user_id={pack.user_id}
                  cardsCount={pack.cardsCount}
                  updated={pack.updated}
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
            // page={page}
            // onChange={handleChangePage}
            // count={pagesCount}
          />
          <span className={s.show}>Show</span>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            {/*<Select value={pageClientCount} onChange={handleChange}>*/}
            {/*  <MenuItem value={5}>5</MenuItem>*/}
            {/*  <MenuItem value={10}>10</MenuItem>*/}
            {/*  <MenuItem value={20}>20</MenuItem>*/}
            {/*</Select>*/}
          </FormControl>
          <span>Cards per page</span>
        </div>
      </div>
    </section>
  )
}
