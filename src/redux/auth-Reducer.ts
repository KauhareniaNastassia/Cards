import {
  authAPI,
  LogInRequestDataType,
  PasswordRecoveryDataType,
  RegistrationRequestDataType,
  setNewPasswordDataType,
} from '../api/auth-API'
import { handleServerNetworkError } from '../utils/error-handler'

import { setAppStatusAC, SetAppSuccessAC } from './app-Reducer'
import { setUserProfile } from './profileReducer'
import { AppDispatchType, AppThunkType } from './store'

export type authReducerStateType = {
  isLoggedIn: boolean
  emailRecovery: string
  token: string
  isRegistrationSuccess: boolean
}

const initState: authReducerStateType = {
  isLoggedIn: false,
  emailRecovery: '',
  token: '',
  isRegistrationSuccess: false,
}

export const authReducer = (state = initState, action: authReducerAT): authReducerStateType => {
  switch (action.type) {
    case 'auth/IS-PERSON-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    case 'auth/IS-PASS_RECOVERY_MESSAGE-SENT':
      return { ...state, emailRecovery: action.email }
    case 'auth/SET-NEW-PASSWORD-TOKEN':
      return { ...state, token: action.token }
    case 'auth/SET-REGISTRATION-RESULT':
      return { ...state, isRegistrationSuccess: action.value }

    default:
      return state
  }
}

export type authReducerAT =
  | ReturnType<typeof isLoggedInAC>
  | ReturnType<typeof MessageRecoverySentAC>
  | ReturnType<typeof setNewPassTokenAC>
  | ReturnType<typeof setRegistrationResultAC>

//////   Actions  ///////////
export const isLoggedInAC = (value: boolean) =>
  ({ type: 'auth/IS-PERSON-LOGGED-IN', value } as const)
export const MessageRecoverySentAC = (email: string) =>
  ({ type: 'auth/IS-PASS_RECOVERY_MESSAGE-SENT', email } as const)
export const setNewPassTokenAC = (token: string) =>
  ({ type: 'auth/SET-NEW-PASSWORD-TOKEN', token } as const)
export const setRegistrationResultAC = (value: boolean) =>
  ({ type: 'auth/SET-REGISTRATION-RESULT', value } as const)

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
      dispatch(setAppStatusAC('loading'))
      const res = await authAPI.registration(values)

      if (res.data.addedUser._id) {
        dispatch(setRegistrationResultAC(true))
        dispatch(setAppStatusAC('succeed'))
        dispatch(SetAppSuccessAC('Registration is successful'))
      }
    } catch (e) {
      handleServerNetworkError(e as { errorMessage: string }, dispatch)
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

    dispatch(setAppStatusAC('loading'))
    try {
      const res = await authAPI.passwordRecovery(data)

      if (res.data.success) {
        dispatch(MessageRecoverySentAC(email))
        dispatch(setAppStatusAC('succeed'))
        dispatch(SetAppSuccessAC('Check your email to recover your password'))
      }
    } catch (e) {
      handleServerNetworkError(e as { errorMessage: string }, dispatch)
    }
  }
export const setNewPasswordTC =
  (data: setNewPasswordDataType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await authAPI.setNewPassword(data)

      if (!res.data.error) {
        dispatch(setNewPassTokenAC(data.resetPasswordToken))
        dispatch(setAppStatusAC('succeed'))
        dispatch(SetAppSuccessAC('Your Password was successfully changed!'))
      }
    } catch (e) {
      handleServerNetworkError(e as { errorMessage: string }, dispatch)
    }
  }

export const loginTC =
  (data: LogInRequestDataType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await authAPI.logIn(data)

      if (res.data._id) {
        dispatch(isLoggedInAC(true))
        dispatch(setUserProfile(res.data))
        dispatch(setAppStatusAC('succeed'))
        dispatch(SetAppSuccessAC('Login is successful'))
      }
    } catch (e) {
      handleServerNetworkError(e as { errorMessage: string }, dispatch)
    }
  }

export const logOutTC = () => async (dispatch: AppDispatchType) => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await authAPI.logout()

    console.log(res)

    if (res.data.info) {
      dispatch(isLoggedInAC(false))
      dispatch(setAppStatusAC('succeed'))
      dispatch(SetAppSuccessAC('Logout is successful'))
    }
  } catch (e) {
    handleServerNetworkError(e as { errorMessage: string }, dispatch)
  }
}
