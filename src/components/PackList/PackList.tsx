import React, { useEffect, useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import {
  Button,
  IconButton,
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

import { getPacksTC } from '../../redux/pack-reducer'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import s from './PackList.module.css'

export const PackList = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const currentPage = useAppSelector(state => state.packs.page)
  const packs = useAppSelector(state => state.packs.cardPacks)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const maxPacksCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const [rowsPerPage, setRowsPerPage] = useState(pageCount)
  const [page, setPage] = useState(currentPage)
  const dispatch = useAppDispatch()

  if (isLoggedIn) {
    useEffect(() => {
      dispatch(getPacksTC(page, pageCount))
    }, [])
  }
  const handleChangePage = (event: unknown, page: number) => {
    setPage(page)
    dispatch(getPacksTC(page, pageCount))
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
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
    <div>
      <div className={s.wrapper}>
        <span style={{ fontSize: '25px', fontWeight: 'bold' }}>Pack list</span>
        <Button type="submit" variant="contained" style={{ borderRadius: '20px' }}>
          Add new Pack
        </Button>
      </div>
      <TableContainer className={s.table} component={Paper}>
        <Table sx={{ minWidth: 650, fontFamily: 'Montserrat' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Cards</StyledTableCell>
              <StyledTableCell align="right">Last updated</StyledTableCell>
              <StyledTableCell align="right">Created by</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packs.map(pack => (
              <TableRow key={pack._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <StyledTableCellRow component="th" scope="row">
                  {pack.name}
                </StyledTableCellRow>
                <StyledTableCellRow align="right">{pack.cardsCount}</StyledTableCellRow>
                <StyledTableCellRow align="right">
                  {moment(`${pack.updated}`).format('D.M.Y')}
                </StyledTableCellRow>
                <StyledTableCellRow align="right">{pack.user_name}</StyledTableCellRow>
                <StyledTableCellRow align="right">
                  <IconButton>
                    <SchoolIcon></SchoolIcon>
                  </IconButton>
                  <IconButton>
                    <EditIcon></EditIcon>
                  </IconButton>
                  <IconButton>
                    <DeleteIcon></DeleteIcon>
                  </IconButton>
                </StyledTableCellRow>
              </TableRow>
            ))}
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={maxPacksCount}
              rowsPerPage={pageCount}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
