import React, { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SchoolIcon from '@mui/icons-material/School'
import { Popover } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { cardsAPI } from '../../../api/cards-API'
import { PATH } from '../../../app/App'
import SuperButton from '../../../common/Button/SuperButton/SuperButton'
import { DeletePackModal } from '../../../common/Modals/PackModals/DeletePackModal'
import { EditPackModal } from '../../../common/Modals/PackModals/EditPackModal'
import { setCardsTC } from '../../../redux/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'

import s from './CardListPopover.module.css'

export const CardListPopover = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const dispatch = useAppDispatch()
  const { packID } = useParams()
  const navigate = useNavigate()
  const packDeckCover = useAppSelector(state => state.cards.packDeckCover)
  const myID = useAppSelector(state => state.profile._id)
  const userID = useAppSelector(state => state.cards.packUserId)

  const theme = useAppSelector(state => state.app.theme)
  const packName = useAppSelector(state => state.cards.packName)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  const deletePack = async () => {
    if (packID) {
      await cardsAPI.deletePack(packID)
      navigate(`${PATH.packList}`)
    }
  }

  const editPackItem = async (name: string, deckCover: string) => {
    if (packID) {
      await cardsAPI.updatePack({ cardsPack: { _id: packID, name, deckCover } })
      dispatch(setCardsTC({ cardsPack_id: packID }))
    }
  }

  return (
    <div className={s.packName}>
      {packName}{' '}
      {myID === userID && (
        <div>
          <button className={s.button} onClick={handleClick}>
            <MoreVertIcon className={theme === 'dark' ? s.moreIconBlack : s.moreIcon} />
          </button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <div className={s.popover}>
              <Link to={PATH.learn}>
                <SuperButton className={s.superButton} onClick={handleClose}>
                  <div className={s.icon}>
                    <SchoolIcon sx={{ marginRight: '5px' }} /> Learn
                  </div>
                </SuperButton>
              </Link>
              <SuperButton
                onClick={() => {
                  setOpenEditModal(true)
                }}
                className={s.superButton}
              >
                <div className={s.icon}>
                  <EditIcon /> Edit
                </div>
              </SuperButton>
              <SuperButton
                onClick={() => {
                  setOpenDeleteModal(true)
                }}
                className={s.superButton}
              >
                <div className={s.icon}>
                  <DeleteIcon /> Delete
                </div>
              </SuperButton>
            </div>
          </Popover>
          <DeletePackModal
            title="Delete Pack"
            name={packName}
            open={openDeleteModal}
            toggleOpenMode={setOpenDeleteModal}
            deleteItem={deletePack}
          />
          <EditPackModal
            itemTitle={packName}
            title="Edit Pack"
            toggleOpenMode={setOpenEditModal}
            open={openEditModal}
            editItem={editPackItem}
            img={packDeckCover}
          />
        </div>
      )}
    </div>
  )
}
