import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:7542/2.0/'
      : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const cardsAPI = {
  registration() {
    return instance.post('/auth/register', {})
  },
  me() {
    return instance.post('/auth/me', {})
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
