import React, { useEffect, useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import {
  Button,
  IconButton,
  InputLabel,
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
  TablePagination,
  TableRow,
} from '@mui/material'
import FormControl from '@mui/material/FormControl/FormControl'
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
  const packs = useAppSelector(state => state.packs.cardPacks)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const myID = useAppSelector(state => state.profile._id)
  const [pageClientCount, setPageCount] = useState(String(pageCount))
  const [page, setPage] = useState(1)
  const dispatch = useAppDispatch()
  const pagesCount = Math.ceil(cardPacksTotalCount / pageCount)

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
