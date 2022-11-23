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
  getPacks(params: GetPacksParamsType) {
    debugger

    return instance.get<GetPacksResponseType>(`/cards/pack`, {
      params: {
        page: 1,
        pageCount: 10,
        user_id: params.user_id,
        min: params.min,
        max: params.max,
      },
    })
  },
  addNewPack(data: AddNewPackDataType) {
    return instance.post<AddNewPackDataType, AxiosResponse<AddNewPackResponseType>>(
      '/cards/pack',
      data
    )
  },
  deletePack(packID: string) {
    return instance.delete<AxiosResponse<DeletePackResponseType>>(`/cards/pack?id=${packID}`)
  },
  updatePack(data: UpdatePackDataType) {
    return instance.put<UpdatePackDataType, AxiosResponse<UpdatePackResponseType>>(
      `/cards/pack`,
      data
    )
  },
  getCards(cardsPack_id: string) {
    return instance.get(`/cards/card?cardsPack_id=${cardsPack_id}`)
  },
}
export type GetPacksParamsType = {
  page?: number
  packName?: string
  pageCount?: number
  sortPacks?: string
  user_id?: string
  min?: number
  max?: number
}
export type GetPacksResponseType = {
  cardPacks: PacksType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}
export type PacksType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}

export type AddNewPackDataType = {
  cardsPack: {
    name?: string
    deckCover?: string
    private?: boolean
  }
}
export type AddNewPackResponseType = {
  newCardsPack: PackResponseType
  token: string
  tokenDeathTime: number
}
export type PackResponseType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
  deckCover?: any
}
export type DeletePackResponseType = {
  deletedCardsPack: PackResponseType
  token: string
  tokenDeathTime: number
}
export type UpdatePackDataType = {
  cardsPack: {
    _id: string
    name: string
  }
}
export type UpdatePackResponseType = {
  updatedCardsPack: PackResponseType
  token: string
  tokenDeathTime: number
}

export type ddddd = {
  cardPacks: DddddCardPacks[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}
export type DddddCardPacks = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}
