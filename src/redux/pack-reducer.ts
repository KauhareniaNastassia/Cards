import { Dispatch } from 'redux'

import { AddNewPackDataType, cardsAPI, UpdatePackDataType } from '../api/cards-API'

import { setAppStatusAC } from './app-reducer'
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
    case 'packs/SET_PACKS':
      return { ...state, ...action.packs }
    case 'packs/ADD_NEW_PACK':
      return { ...state, cardPacks: [action.newPack, ...state.cardPacks] }
    case 'packs/UPDATE_PACK':
      return {
        ...state,
        cardPacks: [
          ...state.cardPacks.map(pack =>
            pack._id === action.newPack._id ? { ...action.newPack } : pack
          ),
        ],
      }
    default:
      return state
  }
}

//actions
export const setPacksAC = (packs: PackType[]) => ({ type: 'packs/SET_PACKS' as const, packs })
export const addNewPackAC = (newPack: PackType) => ({
  type: 'packs/ADD_NEW_PACK' as const,
  newPack,
})
export const updatePackAC = (newPack: PackType) => ({ type: 'packs/UPDATE_PACK' as const, newPack })

//thunks
export const getPacksTC = (page: number, pageCount: number): AppThunkType => {
  return (dispatch: Dispatch) => {
    cardsAPI.getPacks(page, pageCount).then(data => {
      dispatch(setPacksAC(data.data))
    })
  }
}
export const addNewPackTC =
  (name?: string, deckCover?: string): AppThunkType =>
  async dispatch => {
    const newForPack: AddNewPackDataType = { cardsPack: { name, deckCover } }

    dispatch(setAppStatusAC('loading'))

    try {
      const res = await cardsAPI.addNewPack(newForPack)

      const newPack: PackType = {
        _id: res.data.newCardsPack._id,
        user_name: res.data.newCardsPack.user_name,
        user_id: res.data.newCardsPack.user_id,
        updated: res.data.newCardsPack.updated,
        name: res.data.newCardsPack.name,
        cardsCount: res.data.newCardsPack.cardsCount,
        deckCover: deckCover ? deckCover : '',
      }

      dispatch(addNewPackAC(newPack))
      dispatch(setAppStatusAC('succeed'))
    } catch (e) {
      console.log(e)
    }
  }
export const deletePackTC =
  (packID: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.deletePack(packID)

      dispatch(getPacksTC(1, 10))
      dispatch(setAppStatusAC('succeed'))
    } catch (e) {
      console.log(e)
    }
  }
export const updatePackTC =
  (packID: string, newName: string): AppThunkType =>
  async dispatch => {
    const updatedForPack: UpdatePackDataType = { cardsPack: { _id: packID, name: newName } }

    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.updatePack(updatedForPack)
      const updatedPack: PackType = {
        _id: res.data.updatedCardsPack._id,
        name: res.data.updatedCardsPack.name,
        user_name: res.data.updatedCardsPack.user_name,
        user_id: res.data.updatedCardsPack.user_id,
        updated: res.data.updatedCardsPack.updated,
        cardsCount: res.data.updatedCardsPack.cardsCount,
        deckCover: res.data.updatedCardsPack.deckCover,
      }

      dispatch(updatePackAC(updatedPack))
      dispatch(setAppStatusAC('succeed'))
    } catch (e) {
      console.log(e)
    }
  }
//types
export type PackReducerAT =
  | ReturnType<typeof setPacksAC>
  | ReturnType<typeof addNewPackAC>
  | ReturnType<typeof updatePackAC>
