import { AxiosResponse } from 'axios'

import { instance } from './instance'

export const authAPI = {
  registration(values: RegistrationRequestDataType) {
    return instance.post<RegistrationRequestDataType, AxiosResponse<RegistrationResponseType>>(
      '/auth/register',
      values
    )
  },
  me() {
    return instance.post<ResponseUserType>(`/auth/me`)
  },
  logIn(data: LogInRequestDataType) {
    return instance.post<LogInRequestDataType, AxiosResponse<LogInResponseUserDataType>>(
      '/auth/login',
      data
    )
  },
  updateProfile(name: string) {
    return instance.put<{ name: string }, AxiosResponse<ResponseType>>(`/auth/me`, {
      name,
    })
  },
  logout() {
    return instance.delete<AxiosResponse<{ info: string }>>(`/auth/me`)
  },
  passwordRecovery(data: PasswordRecoveryDataType) {
    return instance.post<PasswordRecoveryDataType, AxiosResponse<PasswordRecoveryResponseType>>(
      'https://neko-back.herokuapp.com/2.0/auth/forgot',
      data
    )
  },
  setNewPassword(data: SetNewPasswordDataType) {
    return instance.post<SetNewPasswordDataType, AxiosResponse<SetNewPasswordResponseTye>>(
      'https://neko-back.herokuapp.com/2.0/auth/set-new-password',
      data
    )
  },
  userBlock() {
    return instance.post('/auth/block')
  },
}

//types
export type RegistrationRequestDataType = {
  email: string
  password: string
  confirmPassword?: string
}

type RegistrationResponseType = {
  addedUser: ResponseUserType
  email: string
  in: string
  error: string
}

type ResponseUserType<D = {}> = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  avatar: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  data: D
}

export type LogInRequestDataType = {
  email: string
  password: string
  rememberMe: boolean
}

export type LogInResponseUserDataType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: number
  avatar: string
}

export type PasswordRecoveryDataType = {
  email: string
  message: string
}

export type BadPasswordRecoveryResponseType = {
  error: string
  email: string
  in: string
}

type PasswordRecoveryResponseType = BadPasswordRecoveryResponseType & {
  answer: boolean
  html: boolean
  info: string
  success: boolean
}

export type SetNewPasswordDataType = {
  password: string
  resetPasswordToken: string
}

type SetNewPasswordResponseTye = {
  info: string
  error: string
}
