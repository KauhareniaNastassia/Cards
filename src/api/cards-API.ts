import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:7542/2.0/'
      : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const cardsAPI = {
  getPacks(page: number, pageCount: number) {
    return instance.get(`/cards/pack`, {
      params: {
        page: 1,
        pageCount: 10,
      },
    })
  },
  addPack(name: string, deckCover: string) {
    return instance.post('/cards/pack', { name, deckCover })
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
type ResponseType = {
  cardPacks: [
    {
      _id: string
      user_id: string
      user_name: string
      name: string
      cardsCount: 25
      updated: string
    }
  ]
  cardPacksTotalCount: number
  page: number
  pageCount: number
}
