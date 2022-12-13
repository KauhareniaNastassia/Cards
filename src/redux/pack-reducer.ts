import {
  AddNewPackDataType,
  cardsAPI,
  GetPacksParamsType,
  PacksType,
  UpdatePackDataType,
} from '../api/cards-API'
import { handleServerNetworkError } from '../utils/error-handler'

import { setAppStatusAC, SetAppSuccessAC } from './app-reducer'
import { AppThunkType } from './store'

const initialState = {
  cardPacks: [] as PacksType[],
  cardPacksTotalCount: 0 as number,
  page: 0 as number,
  pageCount: 5 as number,
  showPackCards: 'all' as 'all' | 'my',
  minCardsCount: 0 as number,
  maxCardsCount: 110 as number,
  params: {
    page: '1',
    pageCount: '5',
    min: '0',
    max: '0',
    user_id: '',
    packName: '',
  } as ParamsUrlType,
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
    case 'PACKS/CLEAR_FILTERS':
      return {
        ...state,
        minCardsCount: 0,
        maxCardsCount: 110,
        showPackCards: 'all',
      }
    case 'PACKS/UPDATE_URL_PARAMS':
      return { ...state, params: { ...action.params } }
    default:
      return state
  }
}

export type ParamsUrlType = {
  page?: string
  pageCount?: string
  min?: string
  max?: string
  user_id?: string
  packName?: string
}
//actions
export const updateUrlParamsAC = (params: ParamsUrlType) => ({
  type: 'PACKS/UPDATE_URL_PARAMS' as const,
  params,
})
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
export const clearFiltersAC = () => ({
  type: 'PACKS/CLEAR_FILTERS' as const,
})

//thunks
export const getPacksTC = (): AppThunkType => async (dispatch, getState) => {
  const params = getState().packs.params

  dispatch(setAppStatusAC('loading'))
  try {
    const res = await cardsAPI.getPacks({ ...params })

    dispatch(setPacksAC(res.data.cardPacks))
    dispatch(setTotalPacksCountAC(res.data.cardPacksTotalCount)) //TODO
    dispatch(setAppStatusAC('succeed'))
  } catch (e) {
    handleServerNetworkError(e as { errorMessage: string }, dispatch)
  } finally {
    dispatch(setAppStatusAC('idle'))
  }
}

export const addNewPackTC =
  (data: AddNewPackDataType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.addNewPack(data)

      dispatch(getPacksTC())
      dispatch(SetAppSuccessAC(`${res.newCardsPack.name} was successfully added`))
    } catch (e) {
      handleServerNetworkError(e as { errorMessage: string }, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

export const deletePackTC =
  (packID: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.deletePack(packID)

      dispatch(getPacksTC())
      dispatch(SetAppSuccessAC(`${res.data.deletedCardsPack.name} was successfully removed !!!`))
    } catch (e) {
      handleServerNetworkError(e as { errorMessage: string }, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

export const updatePackTC =
  (data: UpdatePackDataType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      await cardsAPI.updatePack(data)
      dispatch(getPacksTC())
      dispatch(SetAppSuccessAC(`Your Pack was successfully modified!!!`))
    } catch (e) {
      handleServerNetworkError(e as { errorMessage: string }, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
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
  | ReturnType<typeof clearFiltersAC>
  | ReturnType<typeof updateUrlParamsAC>
