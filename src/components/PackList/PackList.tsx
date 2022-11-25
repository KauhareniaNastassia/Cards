import React, { useEffect, useState } from 'react'

import {
  Button,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
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
import { addNewPackTC, getPacksTC } from '../../redux/pack-reducer'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { FilterBar } from '../FilterBar/FilterBar'

import { Pack } from './Pack/Pack'
import s from './PackList.module.css'

export const PackList = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const packs = useAppSelector(state => state.packs.cardPacks)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const [pageClientCount, setPageCount] = useState(String(pageCount))
  const [page, setPage] = useState(1)
  const dispatch = useAppDispatch()
  let pagesCount = Math.ceil(cardPacksTotalCount / pageCount)

  if (isLoggedIn) {
    useEffect(() => {
      dispatch(getPacksTC({ page, pageCount }))
    }, [])
  }
  if (!isLoggedIn) {
    return <Navigate to={PATH.login} />
  }
  const handleChangePage = (event: unknown, page: number) => {
    setPage(page)
    dispatch(getPacksTC({ page, pageCount }))
  }

  const handleChange = (event: SelectChangeEvent) => {
    setPageCount(event.target.value as string)
    dispatch(getPacksTC({ page, pageCount: Number(event.target.value) }))
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.grey['200'],
      color: theme.palette.common.black,
      fontFamily: 'Montseratt',
      fontWeight: 'bold',
      fontSize: '15px',
    },
  }))

  return (
    <section>
      <div className="container">
        <div className={s.HeaderWrapper}>
          <h2 className={s.title}>Pack list</h2>
          <Button
            variant="contained"
            style={{ borderRadius: '20px' }}
            onClick={() => {
              dispatch(addNewPackTC(''))
            }}
          >
            Add new Pack
          </Button>
        </div>
        <FilterBar />
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
            page={page}
            onChange={handleChangePage}
            count={pagesCount}
          />
          <span className={s.show}>Show</span>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <Select value={pageClientCount} onChange={handleChange}>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>
          <span>Cards per page</span>
        </div>
      </div>
    </section>
  )
}
