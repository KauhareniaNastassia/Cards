import axios, { AxiosResponse } from 'axios'

import { UserType } from '../redux/profileReducer'

export const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  // baseURL:
  //   process.env.NODE_ENV === 'development'
  //     ? 'http://localhost:7542/2.0/'
  //     : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const authAPI = {
  registration(values: RegistrationRequestDataType) {
    return instance.post<RegistrationRequestDataType, AxiosResponse<RegistrationResponseType>>(
      '/auth/register',
      values
    )
  },
  me(token: string) {
    return instance.post<AxiosResponse<ResponseUserType>>(`/auth/me?token=${token}`)
  },
  logIn(data: LogInRequestDataType) {
    return instance.post<LogInRequestDataType, AxiosResponse<LogInResponseUserDataType>>(
      '/auth/login',
      data
    )
  },
  updateProfile(user: UserType) {
    return instance.put<UserType, AxiosResponse<ResponseUserType<{ name: string }>>>(
      `/auth/me`,
      user
    )
  },
  logout() {
    return instance.delete<{}, AxiosResponse<{ info: string }>>(`/auth/me`, {})
  },
  // passwordRecovery работает только на heroku  не забить пофиксить .env
  passwordRecovery(data: PasswordRecoveryDataType) {
    return axios.post<PasswordRecoveryDataType, AxiosResponse<PasswordRecoveryResponseType>>(
      'https://neko-back.herokuapp.com/2.0/auth/forgot',
      data
    )
  },
  setNewPassword() {
    return instance.post('/auth/set-new-password', {})
  },
  userBlock() {
    return instance.post('/auth/block', {})
  },
}

// Когда всьо заработает нужно розбить типи красиво с дженериками
//////   Types    //////
export type RegistrationRequestDataType = {
  email: string
  password: string
  confirmPassword?: string
}
type RegistrationResponseType = {
  addedUser: ResponseUserType
  error?: string
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
// export type registrationNegativeResponseType = {
//   error: string
//   in: string
//   isEmailValid: boolean
//   isPassValid: boolean
//   emailRegExp: string
//   passwordRegExp: string
// }
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
export type BedPasswordRecoveryResponseType = {
  error: string
  email: string
  in: string
}
type PasswordRecoveryResponseType = BedPasswordRecoveryResponseType & {
  answer: boolean
  html: boolean
  info: string
  success: boolean
}
