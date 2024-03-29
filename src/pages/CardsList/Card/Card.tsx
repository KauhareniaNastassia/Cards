import React, { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { IconButton, Rating, styled, TableCell, tableCellClasses, TableRow } from '@mui/material'
import dayjs from 'dayjs'

import { CardPackType } from '../../../api/cards-API'
import { DeleteCardModal } from '../../../common/Modals/CardModals/DeleteCardModal'
import { EditCardModal } from '../../../common/Modals/CardModals/EditCardModal'
import { useAppDispatch, useAppSelector } from '../../../common/utils/hooks'
import { deleteCardTC, updateCardTC } from '../../../redux/cards-reducer'

const StyledTableCellRow = styled(TableCell)(({}) => ({
  [`&.${tableCellClasses.body}`]: {
    fontFamily: 'Montseratt',
    fontSize: '15px',
  },
}))

type CardPropsType = {
  card: CardPackType
}

export const Card = (props: CardPropsType) => {
  const myID = useAppSelector(state => state.profile._id)
  const theme = useAppSelector(state => state.app.theme)
  const [openDeleteCardModal, setOpenDeleteCardModal] = useState(false)
  const [openEditCardModal, setOpenEditCardModal] = useState(false)
  const dispatch = useAppDispatch()
  let question = () => {
    return props.card.question.length > 300 ? (
      <img style={{ maxWidth: '105px' }} src={props.card.question} alt={'question image'} />
    ) : (
      props.card.question
    )
  }
  let answer = () => {
    return props.card.answer.length > 300 ? (
      <img style={{ maxWidth: '105px' }} src={props.card.answer} alt={'answer image'} />
    ) : (
      props.card.answer
    )
  }

  const deleteCardButtonClickHandler = () => {
    setOpenDeleteCardModal(true)
  }

  const deleteCard = () => {
    dispatch(deleteCardTC(props.card._id))
  }

  const editCardButtonClickHandler = () => {
    setOpenEditCardModal(true)
  }

  const editCard = (
    newQuestion: string,
    newAnswer: string,
    newQuestionImg: string,
    newAnswerImg: string
  ) => {
    dispatch(
      updateCardTC({
        card: {
          _id: props.card._id,
          answer: newAnswer,
          question: newQuestion,
          questionImg: newQuestionImg,
          answerImg: newAnswerImg,
        },
      })
    )
  }

  return (
    <TableRow key={props.card._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <StyledTableCellRow component="th" scope="row">
        {props.card.questionImg ? (
          <img style={{ maxWidth: '105px' }} src={props.card.questionImg} alt={'question image'} />
        ) : (
          question()
        )}
      </StyledTableCellRow>
      <StyledTableCellRow align="right">
        {props.card.answerImg ? (
          <img style={{ maxWidth: '105px' }} src={props.card.answerImg} alt={'answer image'} />
        ) : (
          answer()
        )}
      </StyledTableCellRow>
      <StyledTableCellRow align="right">
        {String(dayjs(`${props.card.updated}`).format('DD.MM.YYYY'))}
      </StyledTableCellRow>
      <StyledTableCellRow align="right">
        {theme === 'light' ? (
          <Rating name="read-only" defaultValue={props.card.grade} precision={0.1} readOnly />
        ) : (
          <Rating
            name="read-only"
            defaultValue={props.card.grade}
            precision={0.1}
            emptyIcon={<StarBorderIcon sx={{ color: 'white' }} />}
            readOnly
          />
        )}
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
          cardQuestionImg={props.card.questionImg}
          cardAnswerImg={props.card.answerImg}
          questionType={props.card.type}
          open={openEditCardModal}
          toggleOpenMode={setOpenEditCardModal}
          editItem={editCard}
        />
        <DeleteCardModal
          title="Delete Card"
          question={props.card.question}
          cardQuestionImg={props.card.questionImg}
          open={openDeleteCardModal}
          toggleOpenMode={setOpenDeleteCardModal}
          deleteItem={deleteCard}
        />
      </StyledTableCellRow>
    </TableRow>
  )
}
