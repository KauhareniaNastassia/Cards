import React, { memo, useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

import { PacksType } from '../../../api/cards-API'
import { PATH } from '../../../app/App'
import defaultPackCover from '../../../assets/picture/noImage.jpg'
import { DeletePackModal } from '../../../common/Modals/PackModals/DeletePackModal'
import { EditPackModal } from '../../../common/Modals/PackModals/EditPackModal'
import { useAppDispatch, useAppSelector } from '../../../common/utils/hooks'
import { setCardsTC } from '../../../redux/cards-reducer'
import { deletePackTC, updatePackTC } from '../../../redux/pack-reducer'
import s from '../PackList.module.css'

export const Pack = memo((props: PacksType) => {
  const page = useAppSelector(state => state.cards.page)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const dispatch = useAppDispatch()
  const myID = useAppSelector(state => state.profile._id)
  const theme = useAppSelector(state => state.app.theme)
  const style = (theme: 'dark' | 'light') => {
    return theme === 'dark'
      ? { textDecoration: 'none', color: 'white' }
      : { textDecoration: 'none', color: 'black' }
  }

  const deleteButtonClickHandler = () => {
    setOpenDeleteModal(true)
  }

  const deletePack = () => {
    dispatch(deletePackTC(props._id))
  }

  const editButtonClickHandler = () => {
    setOpenEditModal(true)
  }

  const editPackItem = (name: string, deckCover: string) => {
    dispatch(updatePackTC({ cardsPack: { _id: props._id, name, deckCover } }))
  }
  const onClickLearnHandler = () => {
    dispatch(setCardsTC({ packName: props.name, cardsPack_id: props._id, page }))
  }

  return (
    <TableRow
      className={s.tableRow}
      key={props._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell className={s.deckCoverColumn} align="center">
        <img
          style={{ width: '57px', height: '36px' }}
          src={props.deckCover ? props.deckCover : defaultPackCover}
          alt="img"
        />
      </TableCell>
      <TableCell className={s.nameColumn}>
        <Link style={style(theme)} to={`/pack/${props._id}`}>
          {props.name}
        </Link>
      </TableCell>
      <TableCell align="center">{props.cardsCount}</TableCell>
      <TableCell className={s.lastUpdated} align="center">
        {String(dayjs(`${props.updated}`).format('DD.MM.YYYY'))}
      </TableCell>
      <TableCell align="center">{props.user_name}</TableCell>
      <TableCell align="center">
        <IconButton>
          <Link style={{ textDecoration: 'none', color: 'gray' }} to={`${PATH.learn}${props._id}`}>
            <SchoolIcon onClick={onClickLearnHandler}></SchoolIcon>
          </Link>
        </IconButton>
        {myID === props.user_id && (
          <span>
            <IconButton onClick={editButtonClickHandler}>
              <EditIcon></EditIcon>
            </IconButton>
            <IconButton onClick={deleteButtonClickHandler}>
              <DeleteIcon></DeleteIcon>
            </IconButton>
          </span>
        )}
        <DeletePackModal
          title="Delete Pack"
          name={props.name}
          open={openDeleteModal}
          toggleOpenMode={setOpenDeleteModal}
          deleteItem={deletePack}
        />
        <EditPackModal
          itemTitle={props.name}
          title="Edit Pack"
          toggleOpenMode={setOpenEditModal}
          open={openEditModal}
          editItem={editPackItem}
          img={props.deckCover}
        />
      </TableCell>
    </TableRow>
  )
})
