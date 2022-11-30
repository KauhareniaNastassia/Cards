import React, { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton, Rating, styled, TableCell, tableCellClasses, TableRow } from '@mui/material'
import moment from 'moment'

import { CardPackType } from '../../../api/cards-API'
import { DeleteCardModal } from '../../../common/Modals/CardModals/DeleteCardModal'
import { EditCardModal } from '../../../common/Modals/CardModals/EditCardModal'
import { deleteCardTC, updateCardTC } from '../../../redux/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'
import s from '../CardsList.module.css'

type CardPropsType = {
  card: CardPackType
  page: number
  pageCount: number
}

export const Card = (props: CardPropsType) => {
  const myID = useAppSelector(state => state.profile._id)
  const [openDeleteCardModal, setOpenDeleteCardModal] = useState(false)
  const [openEditCardModal, setOpenEditCardModal] = useState(false)
  const dispatch = useAppDispatch()

  const StyledTableCellRow = styled(TableCell)(({}) => ({
    [`&.${tableCellClasses.body}`]: {
      fontFamily: 'Montseratt',
      fontSize: '15px',
    },
  }))

  const editCard = (newQuestion: string, newAnswer: string) => {
    dispatch(
      updateCardTC(
        {
          card: {
            _id: props.card._id,
            answer: newAnswer,
            question: newQuestion,
          },
        },
        props.page,
        props.pageCount
      )
    )
  }

  const editCardButtonClickHandler = () => {
    setOpenEditCardModal(true)
  }

  const deleteCard = () => {
    dispatch(deleteCardTC(props.card._id, props.page, props.pageCount))
  }

  const deleteCardButtonClickHandler = () => {
    setOpenDeleteCardModal(true)
  }

  return (
    <div>
      <TableRow
        key={props.card._id}
        className={s.tableRow}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <StyledTableCellRow className={s.nameColumn} component="th" scope="row">
          {props.card.question}
        </StyledTableCellRow>
        <StyledTableCellRow align="center">{props.card.answer}</StyledTableCellRow>
        <StyledTableCellRow align="center">
          {moment(`${props.card.updated}`).format('D.M.Y')}
        </StyledTableCellRow>
        <StyledTableCellRow align="center">
          <Rating name="half-rating" defaultValue={props.card.grade} precision={0.1} />
        </StyledTableCellRow>
        <StyledTableCellRow align="center">
          {myID === props.card.user_id && (
            <span>
              <IconButton onClick={editCardButtonClickHandler}>
                <EditIcon></EditIcon>
              </IconButton>
              <IconButton onClick={deleteCardButtonClickHandler}>
                <DeleteIcon></DeleteIcon>
              </IconButton>
            </span>
          )}
          <EditCardModal
            title="Edit Card"
            cardQuestion={props.card.question}
            cardAnswer={props.card.answer}
            open={openEditCardModal}
            toggleOpenMode={setOpenEditCardModal}
            editItem={
              editCard /*(newQuestion: string, newAnswer: string) =>
              dispatch(
                updateCardTC(
                  {
                    card: {
                      _id: card._id,
                      answer: newAnswer,
                      question: newQuestion,
                    },
                  },
                  page,
                  pageCount
                )
              )
            */
            }
          />
          <DeleteCardModal
            title="Delete Card"
            question={props.card.question}
            open={openDeleteCardModal}
            toggleOpenMode={setOpenDeleteCardModal}
            deleteItem={deleteCard /*() => dispatch(deleteCardTC(card._id, page, pageCount))*/}
          />
        </StyledTableCellRow>
      </TableRow>
    </div>
  )
}
