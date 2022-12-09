import React, { useState } from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import Button from '@mui/material/Button'
import Pagination from '@mui/material/Pagination'
import Paper from '@mui/material/Paper'
import styled from '@mui/material/styles/styled'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import defaultPackCover from '../../assets/picture/noImage.jpg'
import { BackToPackList } from '../../common/BackArrow/BackToPackList'
import { AddCardModal } from '../../common/Modals/CardModals/AddCardModal'
import { addNewCardTC, setCardsTC } from '../../redux/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { SearchForCards } from '../PackList/SearchForCards/SearchForCards'

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
  const packDeckCover = useAppSelector(state => state.cards.packDeckCover)
  const cardsPack_id = useAppSelector(state => state.cards.cardsPack_id)
  const [page, setPage] = useState(1)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const pagesCount = Math.ceil(cardsTotalCount / pageCount)
  const dispatch = useAppDispatch()
  const [openAddCardModal, setOpenAddCardModal] = useState(false)
  const myID = useAppSelector(state => state.profile._id)
  const userID = useAppSelector(state => state.cards.packUserId)

  const handleChangePage = (event: unknown, page: number) => {
    setPage(page)
    dispatch(setCardsTC({ cardsPack_id, page }))
  }

  const addCard = (question: string, answer: string) => {
    dispatch(addNewCardTC(cardsPack_id, page, pageCount, question, answer))
  }

  const addCardButtonClickHandler = () => {
    setOpenAddCardModal(true)
  }

  return (
    <div>
      <BackToPackList />
      <div>
        <div className={s.headerWrapper}>
          <div className={s.packName}>
            {packName} <MoreVertIcon />
          </div>
          <img
            className={s.packDeckCover}
            src={packDeckCover ? packDeckCover : defaultPackCover}
            alt={'deck cover'}
          />
        </div>
        {cards.length === 0 ? (
          <div className={s.div}>
            {myID === userID ? (
              <>
                <div className={s.span}>
                  This pack is empty. Click add new card to fill this pack
                </div>
                <Button
                  onClick={addCardButtonClickHandler}
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
              </>
            ) : (
              <>
                <div className={s.span}>This pack is empty.</div>
              </>
            )}
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
                    <Card key={card._id} card={card} page={page} pageCount={pageCount} />
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
    </div>
  )
}
