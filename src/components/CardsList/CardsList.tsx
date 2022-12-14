import React, { useCallback, useEffect, useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SchoolIcon from '@mui/icons-material/School'
import { debounce, Popover } from '@mui/material'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import styled from '@mui/material/styles/styled'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { cardsAPI } from '../../api/cards-API'
import { PATH } from '../../app/App'
import defaultPackCover from '../../assets/picture/noImage.jpg'
import { BackToPackList } from '../../common/BackArrow/BackToPackList'
import SuperButton from '../../common/Button/SuperButton/SuperButton'
import { AddCardModal } from '../../common/Modals/CardModals/AddCardModal'
import { DeletePackModal } from '../../common/Modals/PackModals/DeletePackModal'
import { EditPackModal } from '../../common/Modals/PackModals/EditPackModal'
import { PaginationBar } from '../../common/PaginationBar/PaginationBar'
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
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const cards = useAppSelector(state => state.cards.cards)

  const packName = useAppSelector(state => state.cards.packName)
  const packDeckCover = useAppSelector(state => state.cards.packDeckCover)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const myID = useAppSelector(state => state.profile._id)
  const userID = useAppSelector(state => state.cards.packUserId)

  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const { packID } = useParams()
  const navigate = useNavigate()
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
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

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
    <section>
      <BackToPackList />
      <div>
        <div className={s.headerWrapper}>
          <div className={s.packName}>
            {packName}{' '}
            {myID === userID && (
              <div>
                <button className={s.button} onClick={handleClick}>
                  <MoreVertIcon className={s.moreIcon} />
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
              <>
                <div className={s.span}>This pack is empty.</div>
              </>
            )}
          </div>
        ) : (
          <div>
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
                    <Card key={card._id} card={card} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
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
