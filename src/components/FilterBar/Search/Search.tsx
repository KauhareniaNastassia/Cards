import { ChangeEvent, useCallback } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { debounce, InputBase } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

import { getPacksTC } from '../../../redux/pack-reducer'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'

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
  value: string
}
export const SearchBar = (props: PropsType) => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.currentTarget.value)
  }
  const debouncedChangeHandler = useCallback(debounce(changeHandler, 1000), [])

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Provide your text"
        inputProps={{ 'aria-label': 'search' }}
        type="text"
        onChange={changeHandler}
        value={props.value}
      />
    </Search>
  )
}
