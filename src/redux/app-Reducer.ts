import { authAPI } from '../api/auth-API'

import { isLoggedInAC } from './auth-Reducer'
import { AppThunkType } from './store'

export type AppStatusType = 'idle' | 'loading' | 'succeed' | 'failed'

type appReducerStateType = {
  status: AppStatusType
  error: null | string
  isInitialized: boolean
}

const initialState: appReducerStateType = {
  status: 'idle',
  error: null,
  isInitialized: false,
}

export const appReducer = (state = initialState, action: appReducerAT): appReducerStateType => {
  switch (action.type) {
    case 'APP/IS-INITIALIZE':
      return { ...state, isInitialized: action.value }
    case 'APP/SET-APP-STATUS':
      return { ...state, status: action.status }
    default:
      return state
  }
}

export type appReducerAT = ReturnType<typeof IsInitializedAC> | ReturnType<typeof setAppStatusAC>

////////    Actions   /////////
export const IsInitializedAC = (value: boolean) => {
  return {
    type: 'APP/IS-INITIALIZE',
    value,
  } as const
}
export const setAppStatusAC = (status: AppStatusType) => {
  return {
    type: 'APP/SET-APP-STATUS',
    status,
  } as const
}
////////    Thunks   /////////
export const initializeAppTC = (): AppThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await authAPI.me()

    console.log(res)
    if (res.data._id) {
      dispatch(isLoggedInAC(true))
      dispatch(IsInitializedAC(true))
    }
    dispatch(setAppStatusAC('succeed'))
  } catch (e) {
    dispatch(setAppStatusAC('failed'))
    console.log(e)
  }
}
