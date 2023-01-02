import React, { useCallback, useEffect, useState } from 'react'

import { debounce } from '@mui/material'
import Button from '@mui/material/Button'
import { useParams, useSearchParams } from 'react-router-dom'

import defaultPackCover from '../../assets/picture/noImage.jpg'
import { BackToPackList } from '../../common/BackArrow/BackToPackList'
import { AddCardModal } from '../../common/Modals/CardModals/AddCardModal'
import { useAppDispatch, useAppSelector } from '../../common/utils/hooks'
import { PaginationBar } from '../../components/PaginationBar/PaginationBar'
import { addNewCardTC, setCardsTC } from '../../redux/cards-reducer'
import { SearchForCards } from '../PackList/SearchForCards/SearchForCards'

import { CardListPopover } from './CardListPopover/CardListPopover'
import s from './CardsList.module.css'
import { CardTableContainer } from './CardTableContainer/CardTableContainer'

export const CardsList = () => {
  const packDeckCover = useAppSelector(state => state.cards.packDeckCover)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const myID = useAppSelector(state => state.profile._id)
  const userID = useAppSelector(state => state.cards.packUserId)
  const { packID } = useParams()
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const cards = useAppSelector(state => state.cards.cards)
  const pageUrl = searchParams.get('page') ? searchParams.get('page') + '' : '1'
  const pageCountUrl = searchParams.get('pageCount') ? searchParams.get('pageCount') + '' : '5'
  const cardQuestionUrl = searchParams.get('cardQuestion')
    ? searchParams.get('cardQuestion') + ''
    : ''

  const [openAddCardModal, setOpenAddCardModal] = useState(false)
  const [params, setParams] = useState({
    page: 1,
    pageCount: 5,
    cardQuestion: '',
  })

  const paginationPages = Math.ceil(cardsTotalCount / params.pageCount)

  useEffect(() => {
    setSearchParams({ page: pageUrl, pageCount: pageCountUrl, cardQuestion: cardQuestionUrl })
    setParams({ page: +pageUrl, pageCount: +pageCountUrl, cardQuestion: cardQuestionUrl })
    dispatch(
      setCardsTC({
        cardsPack_id: packID,
        page: +pageUrl,
        pageCount: +pageCountUrl,
        cardQuestion: cardQuestionUrl,
      })
    )
  }, [dispatch, pageUrl, pageCountUrl, cardQuestionUrl])

  const handleChangePage = (page: number) => {
    setParams({ ...params, page })
    setSearchParams({ page: page + '' })
  }

  const pageCountHandler = (value: string) => {
    setParams({ ...params, pageCount: +value })
    setSearchParams({ pageCount: value })
  }

  const debouncedChangeHandler = useCallback(
    debounce((value: string) => {
      setParams({ ...params, cardQuestion: value })
      setSearchParams({ cardQuestion: value })
    }, 1000),
    []
  )
  const addCard = (
    cardsPack_id: string,
    question: string,
    answer: string,
    questionImg: string,
    answerImg: string
  ) => {
    dispatch(addNewCardTC(cardsPack_id, question, answer, questionImg, answerImg))
  }

  const addCardButtonClickHandler = () => {
    setOpenAddCardModal(true)
  }

  return (
    <section>
      <BackToPackList />
      <div>
        <div className={s.headerWrapper}>
          <CardListPopover />
          <img
            className={s.packDeckCover}
            src={packDeckCover ? packDeckCover : defaultPackCover}
            alt={'deck cover'}
          />
          {cards.length >= 1 && <SearchForCards onChange={debouncedChangeHandler} />}
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
              <div className={s.span}>This pack is empty.</div>
            )}
          </div>
        ) : (
          <CardTableContainer />
        )}
        <PaginationBar
          handleChangePage={handleChangePage}
          pageCountHandler={pageCountHandler}
          page={+(params.page ? params.page : 1)}
          pageCount={params.pageCount}
          paginationPages={paginationPages}
          selectOption={[5, 10, 20, 40, 100]}
        />
      </div>
    </section>
  )
}
