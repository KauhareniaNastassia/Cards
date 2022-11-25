import React, { ChangeEvent, useCallback, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { Button, debounce, InputBase } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

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

export const SearchForCards = () => {
  const dispatch = useAppDispatch()
  const cardsPack_id = useAppSelector(state => state.cards.cardsPack_id)
  const [page, setPage] = useState(1)
  const pageCount = useAppSelector(state => state.cards.pageCount)

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log()
    dispatch(setCardsTC({ cardQuestion: e.target.value }))
  }
  const debouncedChangeHandler = useCallback(debounce(changeHandler, 1000), [])

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
            onChange={debouncedChangeHandler}
          />
        </Search>
      </div>

      <Button
        onClick={() => dispatch(addNewCardTC(cardsPack_id, page, pageCount))}
        type="submit"
        variant="contained"
        style={{ borderRadius: '20px', marginTop: '40px' }}
      >
        Add New Card
      </Button>
    </div>
  )
}
