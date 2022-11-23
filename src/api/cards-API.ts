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
  getPacks(page: number, pageCount: number, userID?: string) {
    return instance.get<GetPacksResponseType>(`/cards/pack`, {
      params: {
        page: page,
        pageCount: pageCount,
        user_id: userID,
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
  getCards(cardsPack_id: string, packName: string) {
    return instance.get<GetCardsResponseType>(`/cards/card`, {
      params: {
        cardsPack_id: cardsPack_id,
        packName: packName,
      },
    })
  },
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

export type GetCardsResponseType = {
  cards: CardPackType[]
  packUserId: string
  packName: string
  packPrivate: boolean
  packCreated: string
  packUpdated: string
  page: number
  pageCount: number
  cardsTotalCount: number
  minGrade: number
  maxGrade: number
  token: string
  tokenDeathTime: number
}
export type CardPackType = {
  _id: string
  cardsPack_id: string
  user_id: string
  answer: string
  question: string
  grade: number
  shots: number
  comments: string
  type: string
  rating: number
  more_id: string
  created: string
  updated: string
  __v: number
}
