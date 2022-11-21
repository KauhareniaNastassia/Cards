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
  ] as PackType[],
  cardPacksTotalCount: 0 as number,
  page: 0 as number,
  pageCount: 5 as number,
}

type PackReducerStateType = typeof initialState

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
  state: PackReducerStateType = initialState,
  action: PackReducerAT
): PackReducerStateType => {
  switch (action.type) {
    case 'PACKS/SET_PACKS':
      return { ...state, ...action.packs }
    case 'PACKS/ADD_NEW_PACK':
      // eslint-disable-next-line no-case-declarations
      const newPack: PackType = {
        _id: 'sds',
        name: 'new pack',
        user_name: 'nazar',
        cardsCount: 0,
        updated: '',
        deckCover: '',
        user_id: 'whewed',
      }

      return { ...state, cardPacks: [newPack, ...state.cardPacks] }
    default:
      return state
  }
}

//actions
export const setPacksAC = (packs: PackType[]) => ({ type: 'PACKS/SET_PACKS' as const, packs })
export const addNewPackAC = () => ({ type: 'PACKS/ADD_NEW_PACK' as const })

//thunks
export const getPacksTC = (page: number, pageCount: number): AppThunkType => {
  return (dispatch: Dispatch) => {
    cardsAPI.getPacks(page, pageCount).then(data => {
      dispatch(setPacksAC(data.data))
    })
  }
}

//types
export type PackReducerAT = ReturnType<typeof setPacksAC> | ReturnType<typeof addNewPackAC>
