import React, { useState } from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  Button,
  IconButton,
  Pagination,
  Paper,
  Rating,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { PATH } from '../../app/App'
import { AddCardModal } from '../../common/Modals/CardModals/AddCardModal'
import { DeleteCardModal } from '../../common/Modals/CardModals/DeleteCardModal'
import { EditCardModal } from '../../common/Modals/CardModals/EditCardModal'
import { addNewCardTC, deleteCardTC, setCardsTC, updateCardTC } from '../../redux/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { SearchForCards } from '../PackList/SettingsForCards/SearchForCards'

import { Card } from './Card/Card'
import s from './CardsList.module.css'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey['200'],
    color: theme.palette.common.black,
    fontFamily: 'Montseratt',
    fontWeight: 'bold',
    fontSize: '15px',
  },
}))

export const CardsList = () => {
  const cards = useAppSelector(state => state.cards.cards)
  const packName = useAppSelector(state => state.cards.packName)
  const myID = useAppSelector(state => state.profile._id)
  const cardsPack_id = useAppSelector(state => state.cards.cardsPack_id)
  const [page, setPage] = useState(1)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const pagesCount = Math.ceil(cardsTotalCount / pageCount)
  const dispatch = useAppDispatch()
  const [openDeleteCardModal, setOpenDeleteCardModal] = useState(false)
  const [openEditCardModal, setOpenEditCardModal] = useState(false)
  const [openAddCardModal, setOpenAddCardModal] = useState(false)

  const StyledTableCellRow = styled(TableCell)(({}) => ({
    [`&.${tableCellClasses.body}`]: {
      fontFamily: 'Montseratt',
      fontSize: '15px',
    },
  }))
  const handleChangePage = (event: unknown, page: number) => {
    setPage(page)
    dispatch(setCardsTC({ cardsPack_id, page }))
  }

  const deleteCard = (cardId: string) => {
    dispatch(deleteCardTC(cardId, page, pageCount))
  }

  const deleteCardButtonClickHandler = () => {
    setOpenDeleteCardModal(true)
  }

  const editCardButtonClickHandler = () => {
    setOpenEditCardModal(true)
  }

  const addCard = (question: string, answer: string) => {
    dispatch(addNewCardTC(cardsPack_id, page, pageCount, question, answer))
  }

  const addCardButtonClickHandler = () => {
    setOpenAddCardModal(true)
  }

  return (
    <div>
      <div className={s.arrow}>
        <Link to={PATH.packList} className={s.link}>
          <ArrowBackIcon fontSize={'small'} /> Back to Packs List
        </Link>
      </div>
      <div className={s.packName}>{packName}</div>

      {cards.length === 0 ? (
        <div className={s.div}>
          <div className={s.span}>This pack is empty. Click add new card to fill this pack</div>
          <Button
            onClick={
              addCardButtonClickHandler /*() =>
                dispatch(addNewCardTC(cardsPack_id, page, pageCount))*/
            }
            type="submit"
            variant="contained"
            style={{ borderRadius: '20px', marginTop: '40px' }}
          >
            Add New Card
          </Button>
          <AddCardModal
            title="Add new card"
            open={openAddCardModal}
            toggleOpenMode={setOpenAddCardModal}
            addItem={addCard}
          />
        </div>
      ) : (
        <div>
          <SearchForCards />
          <TableContainer className={s.table} component={Paper}>
            <Table sx={{ minWidth: 650, fontFamily: 'Montserrat' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Question</StyledTableCell>
                  <StyledTableCell align="right">Answer</StyledTableCell>
                  <StyledTableCell align="right">Last updated</StyledTableCell>
                  <StyledTableCell align="right">Grade</StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {cards.map(card => (
                  /*<Card key={card._id} card={card} page={page} pageCount={pageCount} />*/
                  <TableRow
                    key={card._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCellRow component="th" scope="row">
                      {card.question}
                    </StyledTableCellRow>
                    <StyledTableCellRow align="right">{card.answer}</StyledTableCellRow>
                    <StyledTableCellRow align="right">
                      {moment(`${card.updated}`).format('D.M.Y')}
                    </StyledTableCellRow>
                    <StyledTableCellRow align="right">
                      <Rating name="half-rating" defaultValue={card.grade} precision={0.1} />
                    </StyledTableCellRow>
                    <StyledTableCellRow align="right">
                      {myID === card.user_id && (
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
                        cardQuestion={card.question}
                        cardAnswer={card.answer}
                        open={openEditCardModal}
                        toggleOpenMode={setOpenEditCardModal}
                        editItem={(newQuestion: string, newAnswer: string) =>
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
                        }
                      />
                      <DeleteCardModal
                        title="Delete Card"
                        question={card.question}
                        open={openDeleteCardModal}
                        toggleOpenMode={setOpenDeleteCardModal}
                        deleteItem={() => dispatch(deleteCardTC(card._id, page, pageCount))}
                      />
                    </StyledTableCellRow>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      <Pagination
        className={s.pagination}
        color="primary"
        shape="rounded"
        page={page}
        onChange={handleChangePage}
        count={pagesCount}
      />
    </div>
  )
}
