import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { Button, debounce, InputBase } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import { Link, useSearchParams } from 'react-router-dom'

import { PATH } from '../../../app/App'
import { AddCardModal } from '../../../common/Modals/CardModals/AddCardModal'
import { addNewCardTC, setCardsTC } from '../../../redux/cards-reducer'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'

import s from './SearchForCards.module.css'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  color: 'lightgrey',
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  border: '1px solid lightgrey',
  borderRadius: '4px',
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    /*transition: theme.transitions.create('width'),*/
    width: '300px',
  },
}))

type PropsType = {
  onChange: (value: string) => void
}
export const SearchForCards = (props: PropsType) => {
  const myID = useAppSelector(state => state.profile._id)
  const userID = useAppSelector(state => state.cards.packUserId)
  const dispatch = useAppDispatch()
  const cardsPack_id = useAppSelector(state => state.cards.cardsPack_id)
  const packName = useAppSelector(state => state.cards.packName)
  const [page, setPage] = useState(1)
  const pageCount = useAppSelector(state => state.cards.pageCount)

  const [openAddCardModal, setOpenAddCardModal] = useState(false)

  const addCard = (question: string, answer: string) => {
    dispatch(addNewCardTC(cardsPack_id, page, pageCount, question, answer))
  }

  const addCardButtonClickHandler = () => {
    setOpenAddCardModal(true)
  }

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value)
  }

  const onClickLearnHandler = () => {
    dispatch(setCardsTC({ packName, cardsPack_id, page }))
  }

  return (
    <div className={s.settingsBlock}>
      <div>
        <h3>Search</h3>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Provide your text"
            inputProps={{ 'aria-label': 'search' }}
            type="text"
            onChange={changeHandler}
          />
        </Search>
      </div>

      {myID === userID ? (
        <>
          <Button
            onClick={addCardButtonClickHandler}
            type="submit"
            variant="contained"
            style={{ borderRadius: '20px', marginTop: '40px' }}
          >
            <AddCardModal
              title="Add new card"
              open={openAddCardModal}
              toggleOpenMode={setOpenAddCardModal}
              addItem={addCard}
            />
            Add New Card
          </Button>
        </>
      ) : (
        <>
          <Link
            style={{ textDecoration: 'none', color: 'gray' }}
            to={`${PATH.learn}${cardsPack_id}`}
          >
            <Button
              onClick={onClickLearnHandler}
              type="submit"
              variant="contained"
              style={{ borderRadius: '20px', marginTop: '40px' }}
            >
              Learn to pack
            </Button>
          </Link>
        </>
      )}
    </div>
  )
}
