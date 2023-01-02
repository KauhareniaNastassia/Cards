import React from 'react'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

import { useAppSelector } from '../../../common/utils/hooks'
import { Pack } from '../Pack/Pack'

import s from './TableContainer.module.css'

export const TableContainerPacks = () => {
  const packs = useAppSelector(state => state.packs.cardPacks)

  return (
    <TableContainer className={s.table} component={Paper}>
      <Table sx={{ fontFamily: 'Montserrat' }} aria-label="simple table">
        <TableHead>
          <TableRow className={s.tableHead}>
            <TableCell align="center">Cover</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Cards</TableCell>
            <TableCell className={s.lastUpdated} align="center">
              Last updated
            </TableCell>
            <TableCell align="center">Created by</TableCell>
            <TableCell align="center">Actions</TableCell>
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
