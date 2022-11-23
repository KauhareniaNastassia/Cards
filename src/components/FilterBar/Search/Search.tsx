import {ChangeEvent, useCallback} from 'react'

import SearchIcon from '@mui/icons-material/Search'
import {debounce, InputBase} from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import {getPacksTC} from "../../../redux/pack-reducer";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  /*[theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },*/
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

type SearchBarPropsType = {
  value: string
  /*searchValue: string | undefined
  searchHandler: (value: string) => void*/
}

export const SearchBar = (props: SearchBarPropsType) => {
  const searchValue = useAppSelector(state => state.packs.searchPackValue)
  const dispatch = useAppDispatch()

  const onChangeSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    /*props.searchHandler(e.currentTarget.value)*/
  }

  /*const debouncedChangeHandler = useCallback(
    debounce(() => dispatch(getPacksTC({  })), 1000),
    [searchValue]
  )*/

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Provide your text"
        inputProps={{ 'aria-label': 'search' }}
        /*value={props.searchValue ? props.searchValue : ''}*/
        value={props.value}
        onChange={onChangeSearchHandler}
      />
    </Search>
  )
}
