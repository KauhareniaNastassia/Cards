import {
  authAPI,
  LogInRequestDataType,
  PasswordRecoveryDataType,
  RegistrationRequestDataType,
  SetNewPasswordDataType,
} from '../api/auth-API'
import { handleServerNetworkError } from '../common/utils/error-handler'

import { setAppStatusAC, SetAppSuccessAC } from './app-reducer'
import { setUserProfile } from './profile-reducer'
import { AppDispatchType, AppThunkType } from './store'

const initState = {
  isLoggedIn: false,
  emailRecovery: '',
  token: '',
  isRegistrationSuccess: false,
}

export const authReducer = (state = initState, action: AuthReducerAT): AuthReducerStateType => {
  switch (action.type) {
    case 'AUTH/IS-PERSON-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    case 'AUTH/IS-PASS_RECOVERY_MESSAGE-SENT':
      return { ...state, emailRecovery: action.email }
    case 'AUTH/SET-NEW-PASSWORD-TOKEN':
      return { ...state, token: action.token }
    case 'AUTH/SET-REGISTRATION-RESULT':
      return { ...state, isRegistrationSuccess: action.value }

    default:
      return state
  }
}

//types
export type AuthReducerStateType = typeof initState
export type AuthReducerAT =
  | ReturnType<typeof isLoggedInAC>
  | ReturnType<typeof MessageRecoverySentAC>
  | ReturnType<typeof setNewPassTokenAC>
  | ReturnType<typeof setRegistrationResultAC>

//actions
export const isLoggedInAC = (value: boolean) =>
  ({ type: 'AUTH/IS-PERSON-LOGGED-IN', value } as const)

export const MessageRecoverySentAC = (email: string) =>
  ({ type: 'AUTH/IS-PASS_RECOVERY_MESSAGE-SENT', email } as const)

export const setNewPassTokenAC = (token: string) =>
  ({ type: 'AUTH/SET-NEW-PASSWORD-TOKEN', token } as const)

export const setRegistrationResultAC = (value: boolean) =>
  ({ type: 'AUTH/SET-REGISTRATION-RESULT', value } as const)

//thunks
export const RegisterMeTC =
  (values: RegistrationRequestDataType): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      const res = await authAPI.registration(values)

      dispatch(setRegistrationResultAC(true))
      dispatch(setAppStatusAC('succeed'))
      dispatch(SetAppSuccessAC('Registration is successful'))
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

      dispatch(MessageRecoverySentAC(email))
      dispatch(setAppStatusAC('succeed'))
      dispatch(SetAppSuccessAC('Check your email to recover your password'))
    } catch (e) {
      handleServerNetworkError(e as { errorMessage: string }, dispatch)
    }
  }

export const setNewPasswordTC =
  (data: SetNewPasswordDataType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await authAPI.setNewPassword(data)

      dispatch(setNewPassTokenAC(data.resetPasswordToken))
      dispatch(setAppStatusAC('succeed'))
      dispatch(SetAppSuccessAC('Your Password was successfully changed!'))
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

      dispatch(isLoggedInAC(true))
      dispatch(setUserProfile(res.data))
      dispatch(setAppStatusAC('succeed'))
      dispatch(SetAppSuccessAC('Login is successful'))
    } catch (e) {
      handleServerNetworkError(e as { errorMessage: string }, dispatch)
    }
  }

export const logOutTC = () => async (dispatch: AppDispatchType) => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await authAPI.logout()

    dispatch(isLoggedInAC(false))
    dispatch(setAppStatusAC('succeed'))
    dispatch(SetAppSuccessAC('Logout is successful'))
  } catch (e) {
    handleServerNetworkError(e as { errorMessage: string }, dispatch)
  }
}
