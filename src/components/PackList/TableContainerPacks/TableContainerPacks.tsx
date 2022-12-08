import React from 'react'

import {
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

import { useAppSelector } from '../../../utils/hooks'
import { Pack } from '../Pack/Pack'

import s from './TableContainer.module.css'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey['200'],
    color: theme.palette.common.black,
    fontFamily: 'Montseratt',
    fontWeight: 'bold',
    fontSize: '15px',
  },
}))

export const TableContainerPacks = () => {
  const packs = useAppSelector(state => state.packs.cardPacks)

  return (
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
  )
}
