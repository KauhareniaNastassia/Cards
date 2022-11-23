import {
  AddNewPackDataType,
  cardsAPI,
  GetPacksParamsType,
  PacksType,
  UpdatePackDataType,
} from '../api/cards-API'

import { setAppStatusAC } from './app-reducer'
import { AppThunkType } from './store'

const initialState = {
  cardPacks: [
    {
      _id: '',
      user_id: '',
      user_name: '',
      private: false,
      name: '',
      path: '',
      grade: 0,
      shots: 0,
      cardsCount: 0,
      type: '',
      rating: 0,
      created: '',
      updated: '',
      more_id: '',
      __v: 0,
    },
  ] as PacksType[],
  cardPacksTotalCount: 0 as number,
  page: 0 as number,
  pageCount: 5 as number,
  showPackCards: 'all' as 'all' | 'my',
  minCardsCount: 0 as number,
  maxCardsCount: 100 as number,
}

type PackReducerStateType = typeof initialState

export const packReducer = (
  state: PackReducerStateType = initialState,
  action: PackReducerAT
): PackReducerStateType => {
  switch (action.type) {
    case 'PACKS/SET_PACKS':
      return { ...state, cardPacks: [...action.packs] }
    case 'PACKS/ADD_NEW_PACK':
      return { ...state, cardPacks: [action.newPack, ...state.cardPacks] }
    case 'PACKS/UPDATE_PACK':
      return {
        ...state,
        cardPacks: [
          ...state.cardPacks.map(pack =>
            pack._id === action.newPack._id ? { ...action.newPack } : pack
          ),
        ],
      }
    case 'PACKS/SET_SHOW_PACKS_CARDS':
      return { ...state, showPackCards: action.value }
    case 'PACKS/SET_MIN_CARDS_COUNT':
      return { ...state, minCardsCount: action.value }
    case 'PACKS/SET_MAX_CARDS_COUNT':
      return { ...state, maxCardsCount: action.value }
    case 'PACKS/SET_TOTAL_PACKS_COUNT':
      return { ...state, cardPacksTotalCount: action.value }
    default:
      return state
  }
}

//actions
export const setPacksAC = (packs: PacksType[]) => ({ type: 'PACKS/SET_PACKS' as const, packs })
export const addNewPackAC = (newPack: PacksType) =>
  ({
    type: 'PACKS/ADD_NEW_PACK',
    newPack,
  } as const)
export const updatePackAC = (newPack: PacksType) =>
  ({
    type: 'PACKS/UPDATE_PACK',
    newPack,
  } as const)
export const setShowPackCardsAC = (value: 'my' | 'all') =>
  ({
    type: 'PACKS/SET_SHOW_PACKS_CARDS',
    value,
  } as const)
export const setMinCardsCountAC = (value: number) =>
  ({
    type: 'PACKS/SET_MIN_CARDS_COUNT',
    value,
  } as const)
export const setMaxCardsCountAC = (value: number) => ({
  type: 'PACKS/SET_MAX_CARDS_COUNT' as const,
  value,
})
export const setTotalPacksCountAC = (value: number) =>
  ({
    type: 'PACKS/SET_TOTAL_PACKS_COUNT',
    value,
  } as const)

//thunks
export const getPacksTC =
  (params: GetPacksParamsType): AppThunkType =>
  async dispatch => {
    try {
      const res = await cardsAPI.getPacks({ ...params })

      dispatch(setPacksAC(res.data.cardPacks))
      dispatch(setTotalPacksCountAC(res.data.cardPacksTotalCount))
    } catch (e) {
      console.log(e)
    }
  }
export const addNewPackTC =
  (name?: string, deckCover?: string): AppThunkType =>
  async dispatch => {
    const newForPack: AddNewPackDataType = { cardsPack: { name, deckCover } }

    dispatch(setAppStatusAC('loading'))

    try {
      const res = await cardsAPI.addNewPack(newForPack)

      const newPack: PacksType = {
        _id: res.data.newCardsPack._id,
        user_name: res.data.newCardsPack.user_name,
        user_id: res.data.newCardsPack.user_id,
        updated: res.data.newCardsPack.updated,
        name: res.data.newCardsPack.name,
        cardsCount: res.data.newCardsPack.cardsCount,
        // deckCover: deckCover ? deckCover : '',
        __v: res.data.newCardsPack.__v,
        type: res.data.newCardsPack.type,
        created: res.data.newCardsPack.created,
        grade: res.data.newCardsPack.grade,
        more_id: res.data.newCardsPack.more_id,
        path: res.data.newCardsPack.path,
        private: res.data.newCardsPack.private,
        rating: res.data.newCardsPack.rating,
        shots: res.data.newCardsPack.shots,
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

      dispatch(getPacksTC({ page: 1, pageCount: 10 }))
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
      const updatedPack: PacksType = {
        _id: res.data.updatedCardsPack._id,
        name: res.data.updatedCardsPack.name,
        user_name: res.data.updatedCardsPack.user_name,
        user_id: res.data.updatedCardsPack.user_id,
        updated: res.data.updatedCardsPack.updated,
        cardsCount: res.data.updatedCardsPack.cardsCount,
        // deckCover: res.data.updatedCardsPack.deckCover,
        __v: res.data.updatedCardsPack.__v,
        type: res.data.updatedCardsPack.type,
        created: res.data.updatedCardsPack.created,
        shots: res.data.updatedCardsPack.shots,
        rating: res.data.updatedCardsPack.rating,
        private: res.data.updatedCardsPack.private,
        path: res.data.updatedCardsPack.path,
        more_id: res.data.updatedCardsPack.more_id,
        grade: res.data.updatedCardsPack.grade,
      }

      dispatch(updatePackAC(updatedPack))
      dispatch(setAppStatusAC('succeed'))
    } catch (e) {
      console.log(e)
    }
  }

export const setShowPackCardsTC =
  (userID?: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      if (userID) {
        const res = await cardsAPI.getPacks({ user_id: userID, page: 1, pageCount: 10 })

        dispatch(setPacksAC(res.data.cardPacks))
        dispatch(setShowPackCardsAC('my'))
        dispatch(setAppStatusAC('succeed'))
      } else {
        const res = await cardsAPI.getPacks({ page: 1, pageCount: 10 })

        dispatch(setPacksAC(res.data.cardPacks))
        dispatch(setShowPackCardsAC('all'))
        dispatch(setAppStatusAC('succeed'))
      }
    } catch (e) {
      console.log(e)
    }
  }
//types
export type PackReducerAT =
  | ReturnType<typeof setPacksAC>
  | ReturnType<typeof addNewPackAC>
  | ReturnType<typeof updatePackAC>
  | ReturnType<typeof setShowPackCardsAC>
  | ReturnType<typeof setMinCardsCountAC>
  | ReturnType<typeof setMaxCardsCountAC>
  | ReturnType<typeof setTotalPacksCountAC>
