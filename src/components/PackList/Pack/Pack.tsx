import React, { useEffect } from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import {
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
import moment from 'moment'
import { Link } from 'react-router-dom'

import { PATH } from '../../../app/App'
import { setCardsAC, setCardsTC } from '../../../redux/cards-reducer'
import { getPacksTC } from '../../../redux/pack-reducer'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'

import s from './Pack.module.css'

export const Pack = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const cards = useAppSelector(state => state.cards.cards)

  if (isLoggedIn) {
    useEffect(() => {
      dispatch(setCardsTC('632396da83d8092fb8c2de72'))
    }, [])
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
      <div className={s.arrow}>
        <Link to={PATH.home} className={s.link}>
          <ArrowBackIcon fontSize={'small'} /> Back to Packs List
        </Link>
      </div>
      <div className={s.packName}>Pack Name</div>
      <TableContainer className={s.table} component={Paper}>
        <Table sx={{ minWidth: 650, fontFamily: 'Montserrat' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Question</StyledTableCell>
              <StyledTableCell align="right">Answer</StyledTableCell>
              <StyledTableCell align="right">Last updated</StyledTableCell>
              <StyledTableCell align="right">Grade</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map(card => (
              <TableRow key={card._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <StyledTableCellRow component="th" scope="row">
                  {card.question}
                </StyledTableCellRow>
                <StyledTableCellRow align="right">{card.answer}</StyledTableCellRow>
                <StyledTableCellRow align="right">
                  {moment(`${card.updated}`).format('D.M.Y')}
                </StyledTableCellRow>
                <StyledTableCellRow align="right">{card.grade}</StyledTableCellRow>
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
              count={300}
              rowsPerPage={20}
              page={10}
              onPageChange={() => {}}
              onRowsPerPageChange={() => {}}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}