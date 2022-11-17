import { authAPI } from '../api/auth-API'

import { isLoggedInAC } from './auth-Reducer'
import { setUserProfile } from './profileReducer'
import { AppThunkType } from './store'

export type AppStatusType = 'idle' | 'loading' | 'succeed' | 'failed'

type appReducerStateType = {
  status: AppStatusType
  errorMessage: null | string
  isInitialized: boolean
  successMessage: string | null
}

const initialState: appReducerStateType = {
  status: 'idle',
  errorMessage: null,
  successMessage: null,
  isInitialized: false,
}

export const appReducer = (state = initialState, action: appReducerAT): appReducerStateType => {
  switch (action.type) {
    case 'APP/IS-INITIALIZE':
      return { ...state, isInitialized: action.value }
    case 'APP/SET-APP-STATUS':
      return { ...state, status: action.status }
    case 'APP/SET-APP-ERROR-MESSAGE':
      return { ...state, errorMessage: action.errorMessage }
    case 'APP/SET-APP-SUCCESS-MESSAGE':
      return { ...state, successMessage: action.successMessage }
    default:
      return state
  }
}

export type appReducerAT =
  | ReturnType<typeof IsInitializedAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof SetAppErrorAC>
  | ReturnType<typeof SetAppSuccessAC>

////////    Actions   /////////
export const IsInitializedAC = (value: boolean) => ({
  type: 'APP/IS-INITIALIZE' as const,
  value,
})
export const setAppStatusAC = (status: AppStatusType) => ({
  type: 'APP/SET-APP-STATUS' as const,
  status,
})

export const SetAppErrorAC = (errorMessage: string | null) => ({
  type: 'APP/SET-APP-ERROR-MESSAGE' as const,
  errorMessage,
})
export const SetAppSuccessAC = (successMessage: string | null) => ({
  type: 'APP/SET-APP-SUCCESS-MESSAGE' as const,
  successMessage,
})
////////    Thunks   /////////
export const initializeAppTC = (): AppThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await authAPI.me()

    console.log(res)
    if (res.data._id) {
      dispatch(isLoggedInAC(true))
      dispatch(IsInitializedAC(true))
      dispatch(setUserProfile(res.data))
    }
    dispatch(setAppStatusAC('succeed'))
  } catch (e) {
    dispatch(IsInitializedAC(true))
    dispatch(setAppStatusAC('failed'))
    console.log(e)
  }
}
