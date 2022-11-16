import {
  authAPI,
  PasswordRecoveryDataType,
  RegistrationRequestDataType,
  setNewPasswordDataType,
} from '../api/auth-API'

import { IsInitializedAC } from './app-Reducer'
import { AppThunkType } from './store'

export type authReducerStateType = {
  isLoggedIn: boolean
  emailRecovery: string
  token: string
}

const initState: authReducerStateType = {
  isLoggedIn: false,
  emailRecovery: '',
  token: '',
}

export const authReducer = (state = initState, action: authReducerAT): authReducerStateType => {
  switch (action.type) {
    case 'auth/IS-PERSON-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    case 'auth/IS-PASS_RECOVERY_MESSAGE-SENT':
      return { ...state, emailRecovery: action.email }
    case 'auth/SET-NEW-PASSWORD-TOKEN':
      return { ...state, token: action.token }

    default:
      return state
  }
}

export type authReducerAT =
  | ReturnType<typeof isLoggedInAC>
  | ReturnType<typeof MessageRecoverySentAC>
  | ReturnType<typeof setNewPassTokenAC>

//////   Actions  ///////////
export const isLoggedInAC = (value: boolean) =>
  ({ type: 'auth/IS-PERSON-LOGGED-IN', value } as const)
export const MessageRecoverySentAC = (email: string) =>
  ({ type: 'auth/IS-PASS_RECOVERY_MESSAGE-SENT', email } as const)
export const setNewPassTokenAC = (token: string) =>
  ({ type: 'auth/SET-NEW-PASSWORD-TOKEN', token } as const)

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
        // dispatch(isLoggedInAC(true))
        dispatch(IsInitializedAC(true))
      }
    } catch (e) {
      console.log(e)
    }
  }

export const PasswordRecoveryTC =
  (email: string): AppThunkType =>
  async dispatch => {
    const data: PasswordRecoveryDataType = {
      email: email,
      message: `<div style="background-color: lime; padding: 15px">
password recovery link:
<a href='http://localhost:3000/Cards#/createNewPassword/$token$'>
link</a>
</div>`,
    }

    try {
      //dispatch(loader)
      const res = await authAPI.passwordRecovery(data)

      if (res.data.success) {
        dispatch(MessageRecoverySentAC(email))
      }
    } catch (e) {
      console.log(e)
    }
  }
export const setNewPasswordTC =
  (data: setNewPasswordDataType): AppThunkType =>
  async dispatch => {
    try {
      const res = await authAPI.setNewPassword(data)

      if (!res.data.error) {
        dispatch(setNewPassTokenAC(data.resetPasswordToken))
      }
    } catch (e) {
      console.log(e)
    }
  }
