import React, { useEffect } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import { IconButton, styled, TableCell, tableCellClasses, TableRow } from '@mui/material'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { PacksType } from '../../../api/cards-API'
import { PATH } from '../../../app/App'
import { setCardsTC, setPackIdAC } from '../../../redux/cards-reducer'
import { deletePackTC, updatePackTC } from '../../../redux/pack-reducer'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'
import s from '../PackList.module.css'

export const Pack = (props: PacksType) => {
  const page = useAppSelector(state => state.cards.page)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const onClickSetPack = () => {
    dispatch(
      setCardsTC({
        cardsPack_id: props._id,
        page: page,
        pageCount: pageCount,
        packName: props.name,
      })
    )
    dispatch(setPackIdAC(props._id))
  }

  const StyledTableCellRow = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      fontFamily: 'Montseratt',
      fontSize: '15px',
    },
  }))
  const dispatch = useAppDispatch()
  const myID = useAppSelector(state => state.profile._id)

  return (
    <TableRow
      className={s.tableRow}
      key={props._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <StyledTableCellRow onClick={onClickSetPack} className={s.nameColumn}>
        <Link style={{ textDecoration: 'none', color: 'black' }} to={PATH.pack}>
          {props.name}
        </Link>
      </StyledTableCellRow>
      <StyledTableCellRow align="center">{props.cardsCount}</StyledTableCellRow>
      <StyledTableCellRow className={s.lastUpdated} align="center">
        {moment(`${props.updated}`).format('D.M.Y')}
      </StyledTableCellRow>
      <StyledTableCellRow align="center">{props.user_name}</StyledTableCellRow>
      <StyledTableCellRow align="center">
        <IconButton>
          <SchoolIcon></SchoolIcon>
        </IconButton>
        {myID === props.user_id && (
          <span>
            <IconButton onClick={() => dispatch(updatePackTC(props._id, 'Updated Name'))}>
              <EditIcon></EditIcon>
            </IconButton>
            <IconButton onClick={() => dispatch(deletePackTC(props._id))}>
              <DeleteIcon></DeleteIcon>
            </IconButton>
          </span>
        )}
      </StyledTableCellRow>
    </TableRow>
  )
}
