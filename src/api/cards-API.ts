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
    return instance.get<GetPacksResponseType>(`/cards/pack`, {
      params: {
        page: params.page,
        pageCount: params.pageCount,
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
  getCards(params: GetCardsParamsType) {
    return instance.get<GetCardsResponseType>(`/cards/card`, {
      params: {
        cardsPack_id: params.cardsPack_id,
        page: params.page,
        pageCount: params.pageCount,
        cardQuestion: params.cardQuestion,
      },
    })
  },

  addNewCard(data: AddNewCardDataType) {
    return instance.post<AddNewCardResponseType>('/cards/card', data)
  },
  deleteCard(cardID: string) {
    return instance.delete<DeleteCardResponseType>('/cards/card', {
      params: {
        id: cardID,
      },
    })
  },
  updateCard(data: UpdateCardDataType) {
    return instance.put<UpdatedCardResponseType>('/cards/card', data)
  },
}
export type UpdatedCardResponseType = {
  updatedCard: UpdatedCardType
  token: string
  tokenDeathTime: number
}
export type UpdatedCardType = {
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
  answerImg: string
  answerVideo: string
  questionImg: string
  questionVideo: string
}
export type UpdateCardDataType = {
  card: {
    _id: string
    answer?: string
    question?: string
    grade?: number
    comments?: string
    rating?: number
  }
}
export type DeleteCardResponseType = {
  deletedCard: DeletedCardType
  token: string
  tokenDeathTime: number
}
export type DeletedCardType = {
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
export type AddNewCardDataType = {
  card: {
    cardsPack_id: string
    question?: string //"no question"
    answer?: string //"no answer"
    grade?: number // 0..5
    shots?: number
    answerImg?: string // "url or base 64"
    questionImg?: string // "url or base 64"
    questionVideo?: string // "url or base 64"
    answerVideo?: string // "url or base 64"
  }
}
export type AddNewCardResponseType = {
  newCard: ResponseCardType
  token: string
  tokenDeathTime: number
}
export type ResponseCardType = {
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
export type GetPacksParamsType = {
  page?: number
  packName?: string
  pageCount?: number
  sortPacks?: string
  user_id?: string
  min?: number
  max?: number
}
export type GetCardsParamsType = {
  packName?: string
  page?: number
  cardsPack_id?: string
  pageCount?: number
  cardQuestion?: string
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
