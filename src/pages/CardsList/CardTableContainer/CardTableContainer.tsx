import React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useAppSelector } from '../../../common/utils/hooks'
import { Card } from '../Card/Card'
import s from '../CardsList.module.css'

export const CardTableContainer = () => {
  const cards = useAppSelector(state => state.cards.cards)

  return (
    <div>
      <TableContainer className={s.table} component={Paper}>
        <Table sx={{ minWidth: 650, fontFamily: 'Montserrat' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell align="right">Answer</TableCell>
              <TableCell align="right">Last updated</TableCell>
              <TableCell align="right">Grade</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cards.map(card => (
              <Card key={card._id} card={card} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
