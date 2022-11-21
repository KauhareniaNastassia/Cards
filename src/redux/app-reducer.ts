import { authAPI } from '../api/auth-API'

import { isLoggedInAC } from './auth-reducer'
import { setUserProfile } from './profile-reducer'
import { AppThunkType } from './store'

export type AppStatusType = 'idle' | 'loading' | 'succeed' | 'failed'

type AppReducerStateType = typeof initialState

const initialState = {
  status: 'idle' as AppStatusType,
  errorMessage: null as null | string,
  successMessage: null as null | string,
  isInitialized: false,
}

export const appReducer = (state = initialState, action: AppReducerAT): AppReducerStateType => {
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

//types
export type AppReducerAT =
  | ReturnType<typeof IsInitializedAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof SetAppErrorAC>
  | ReturnType<typeof SetAppSuccessAC>

//actions
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

//thunks
export const initializeAppTC = (): AppThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await authAPI.me()

    dispatch(isLoggedInAC(true))
    dispatch(IsInitializedAC(true))
    dispatch(setUserProfile(res.data))
    dispatch(setAppStatusAC('succeed'))
  } catch (e) {
    dispatch(IsInitializedAC(true))
    dispatch(setAppStatusAC('failed'))
    console.log(e)
  }
}
