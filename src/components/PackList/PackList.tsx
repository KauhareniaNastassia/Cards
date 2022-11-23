import React, { useEffect, useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import {
  Button,
  IconButton,
  Pagination,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import moment from 'moment/moment'
import { Link, Navigate } from 'react-router-dom'

import { PATH } from '../../app/App'
import { setCardsTC } from '../../redux/cards-reducer'
import { addNewPackTC, deletePackTC, getPacksTC, updatePackTC } from '../../redux/pack-reducer'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { FilterBar } from '../FilterBar/FilterBar'

import s from './PackList.module.css'

export const PackList = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const currentPage = useAppSelector(state => state.packs.page)
  const packs = useAppSelector(state => state.packs.cardPacks)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const myID = useAppSelector(state => state.profile._id)
  const [rowsPerPage, setRowsPerPage] = useState(pageCount)
  const [page, setPage] = useState(1)
  const dispatch = useAppDispatch()
  const pagesCount = Math.ceil(cardPacksTotalCount / pageCount)

  if (isLoggedIn) {
    useEffect(() => {
      dispatch(getPacksTC(page, pageCount))
    }, [])
  }
  if (!isLoggedIn) {
    return <Navigate to={PATH.login} />
  }
  const handleChangePage = (event: unknown, page: number) => {
    console.log(page, pageCount)
    setPage(page)
    dispatch(getPacksTC(page, pageCount))
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(page)
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
  const StyledTableCellRow = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      fontFamily: 'Montseratt',
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
              dispatch(addNewPackTC('nazar'))
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
                <TableRow
                  className={s.tableRow}
                  key={pack._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCellRow
                    onClick={() => {
                      dispatch(setCardsTC(pack._id, pack.name))
                    }}
                    className={s.nameColumn}
                  >
                    <Link style={{ textDecoration: 'none', color: 'black' }} to={PATH.pack}>
                      {pack.name}
                    </Link>
                  </StyledTableCellRow>
                  <StyledTableCellRow align="center">{pack.cardsCount}</StyledTableCellRow>
                  <StyledTableCellRow className={s.lastUpdated} align="center">
                    {moment(`${pack.updated}`).format('D.M.Y')}
                  </StyledTableCellRow>
                  <StyledTableCellRow align="center">{pack.user_name}</StyledTableCellRow>
                  <StyledTableCellRow align="center">
                    <IconButton>
                      <SchoolIcon></SchoolIcon>
                    </IconButton>
                    {myID === pack.user_id && (
                      <span>
                        <IconButton
                          onClick={() => dispatch(updatePackTC(pack._id, 'Updated Name'))}
                        >
                          <EditIcon></EditIcon>
                        </IconButton>
                        <IconButton onClick={() => dispatch(deletePackTC(pack._id))}>
                          <DeleteIcon></DeleteIcon>
                        </IconButton>
                      </span>
                    )}
                  </StyledTableCellRow>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          className={s.pagination}
          color="primary"
          shape="rounded"
          page={page}
          onChange={handleChangePage}
          count={pagesCount}
        />
      </div>
    </section>
  )
}
