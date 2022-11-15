import { Dispatch } from 'redux'

import { authAPI, RegistrationRequestDataType } from '../api/auth-API'

import { IsInitializedAC } from './app-Reducer'
import { AppThunkType } from './store'

export type authReducerStateType = { isLoggedIn: boolean }

const initState: authReducerStateType = {
  isLoggedIn: false,
}

export const authReducer = (state = initState, action: authReducerAT): authReducerStateType => {
  switch (action.type) {
    case 'auth/IS-PERSON-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }

    default:
      return state
  }
}

export type authReducerAT = ReturnType<typeof isLoggedInAC> | setAuthUserDataType

//////   Actions  ///////////
export const isLoggedInAC = (value: boolean) =>
  ({ type: 'auth/IS-PERSON-LOGGED-IN', value } as const)
type setAuthUserDataType = ReturnType<typeof setAuthUserData>
export const setAuthUserData = (
  email: string,
  name: string,
  _id: string,
  avatar: string,
  isLoggedIn: boolean
) => {
  return { type: 'SET-USER-DATA', payload: { email, name, _id, avatar, isLoggedIn } } as const
}
//////   Thunks  ///////////

export const RegisterMeTC =
  (values: RegistrationRequestDataType): AppThunkType =>
  async dispatch => {
    try {
      //dispatch(loading)  для крутилки что идет запрос
      const res = await authAPI.registration(values)

      if (res.data.addedUser._id) {
        dispatch(isLoggedInAC(true))
        dispatch(IsInitializedAC(true))
      }
    } catch (e) {
      console.log(e)
    }
  }
