import { authAPI } from '../api/auth-API'

import { isLoggedInAC } from './auth-Reducer'
import { AppThunkType } from './store'

export type RequestStatusType = 'idle' | 'loading' | 'succeed' | 'failed'

type appReducerStateType = {
  status: RequestStatusType
  error: null | string
  isInitialized: boolean
}

const initialState: appReducerStateType = {
  status: 'idle',
  error: null,
  isInitialized: false,
}

export const appReducer = (state = initialState, action: appReducerAT): appReducerStateType => {
  // fix any
  switch (action.type) {
    case 'APP/IS-INITIALIZE':
      return { ...state, isInitialized: action.value }

    default:
      return state
  }
}

export type appReducerAT = ReturnType<typeof IsInitializedAC>

////////    Actions   /////////
export const IsInitializedAC = (value: boolean) => {
  return {
    type: 'APP/IS-INITIALIZE',
    value,
  } as const
}

////////    Thunks   /////////
export const initializeAppTC = (): AppThunkType => async dispatch => {
  try {
    const res = await authAPI.me()

    if (res.data.data._id) {
      dispatch(isLoggedInAC(true))
      dispatch(IsInitializedAC(true))
    }
  } catch (e) {
    console.log(e)
  }
}
