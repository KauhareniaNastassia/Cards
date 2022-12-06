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

  const deleteCardButtonClickHandler = () => {
    setOpenDeleteCardModal(true)
  }

  const deleteCard = () => {
    dispatch(deleteCardTC(props.card._id, props.page, props.pageCount))
  }

  const editCardButtonClickHandler = () => {
    setOpenEditCardModal(true)
  }

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

  return (
    <TableRow key={props.card._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <StyledTableCellRow component="th" scope="row">
        {props.card.question}
        {/*{props.card.type === 'Text' ? (
          props.card.question
        ) : (
          <div>
            <img src={props.card.questionImg} alt={'question image'} />
          </div>
        )}*/}
      </StyledTableCellRow>
      <StyledTableCellRow align="right">
        {props.card.answer}
        {/* {props.card.type === 'Text' ? (
          props.card.answer
        ) : (
          <div>
            <img src={props.card.answerImg} alt={'question image'} />
          </div>
        )}*/}
      </StyledTableCellRow>
      <StyledTableCellRow align="right">
        {moment(`${props.card.updated}`).format('D.M.Y')}
      </StyledTableCellRow>
      <StyledTableCellRow align="right">
        <Rating name="read-only" defaultValue={props.card.grade} precision={0.1} readOnly />
      </StyledTableCellRow>
      <StyledTableCellRow align="right">
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
          editItem={editCard}
        />
        <DeleteCardModal
          title="Delete Card"
          question={props.card.question}
          open={openDeleteCardModal}
          toggleOpenMode={setOpenDeleteCardModal}
          deleteItem={deleteCard}
        />
      </StyledTableCellRow>
    </TableRow>
  )
}
