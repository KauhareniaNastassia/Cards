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

import { useAppSelector } from '../../../utils/hooks'
import { Pack } from '../Pack/Pack'

import s from './TableContainer.module.css'

export const TableContainerPacks = () => {
  const packs = useAppSelector(state => state.packs.cardPacks)
  const theme = useAppSelector(state => state.app.theme)
  const classTheme = theme === 'dark' ? s.headText : s.headTextLight
  const tableHeadNamesArray = [
    { text: 'Cover' },
    { text: 'Name' },
    { text: 'Cards' },
    { text: 'Last updated' },
    { text: 'Created by' },
    { text: 'Actions' },
  ]

  return (
    <TableContainer className={s.table} component={Paper}>
      <Table sx={{ fontFamily: 'Montserrat' }} aria-label="simple table">
        <TableHead>
          <TableRow className={theme === 'dark' ? s.tableHeadDark : s.tableHeadLight}>
            {tableHeadNamesArray.map(name => {
              return (
                <TableCell align="center" key={name.text} className={classTheme}>
                  {name.text}
                </TableCell>
              )
            })}
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
