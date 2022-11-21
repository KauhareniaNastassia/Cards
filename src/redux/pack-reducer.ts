import { Dispatch } from 'redux'

import { cardsAPI } from '../api/cards-API'

import { AppThunkType } from './store'

const initialState = {
  cardPacks: [
    {
      _id: '',
      user_id: '',
      user_name: '',
      name: '',
      cardsCount: 0,
      updated: '',
      deckCover: '',
    },
  ],
  cardPacksTotalCount: 0,
  page: 0,
  pageCount: 0,
}

type InitialStateType = {
  cardPacks: PackType[]
  cardPacksTotalCount: number
  page: number
  pageCount: number
}
export type PackType = {
  _id: string
  user_id: string
  user_name: string
  name: string
  cardsCount: number
  updated: string
  deckCover: string
}

export const packReducer = (
  state: InitialStateType = initialState,
  action: PackReducerAT
): InitialStateType => {
  switch (action.type) {
    case 'SET-PACKS':
      return { ...state, ...action.packs }
    default:
      return state
  }
}
//thunks
export const getPacksTC = (page: number, pageCount: number): AppThunkType => {
  return (dispatch: Dispatch) => {
    cardsAPI.getPacks(page, pageCount).then(data => {
      dispatch(setPacksAC(data.data))
    })
  }
}
//actions
export const setPacksAC = (packs: PackType[]) => {
  return { type: 'SET-PACKS', packs } as const
}

//types
export type PackReducerAT = SetPacksACType
type SetPacksACType = ReturnType<typeof setPacksAC>
