import axios, { AxiosResponse } from 'axios'

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
  updateProfile() {
    return instance.put(`/auth/me`)
  },
  logout() {
    return instance.delete(`/auth/me`)
  },
  passwordRecovery() {
    return instance.post('/auth/forgot', {})
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

type ResponseUserType = {
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
