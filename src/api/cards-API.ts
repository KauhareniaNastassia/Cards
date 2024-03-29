import { AxiosResponse } from 'axios'

import { ParamsUrlType } from '../redux/pack-reducer'

import { instance } from './instance'

export const cardsAPI = {
  getPacks(params: ParamsUrlType) {
    return instance.get<GetPacksResponseType>(`/cards/pack`, {
      params: {
        page: params.page,
        pageCount: params.pageCount,
        user_id: params.user_id,
        min: params.min,
        max: params.max,
        packName: params.packName,
      },
    })
  },
  addNewPack(data: AddNewPackDataType) {
    return instance.post<AddNewPackDataType, AddNewPackResponseType>('/cards/pack', {
      cardsPack: data,
    })
  },
  deletePack(packID: string) {
    return instance.delete<DeletePackResponseType>(`/cards/pack?id=${packID}`)
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

  addNewCard(card: AddNewCardDataType) {
    return instance.post<AddNewCardResponseType>('/cards/card', {
      card: {
        cardsPack_id: card.cardsPack_id,
        question: card.question,
        answer: card.answer,
        grade: card.grade,
        shots: card.shots,
        questionImg: card.questionImg,
        answerImg: card.answerImg,
      },
    })
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
  updateGradeCard(data: CardLearnType) {
    return instance.put<ResponseCardsLearnType>('cards/grade', data)
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
  type: QuestionType
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
export type CardLearnType = {
  shots: number
  grade: number
  card_id: string
}
export type UpdateCardDataType = {
  card: {
    _id: string
    answer?: string
    answerImg?: string
    questionImg?: string
    question?: string
    grade?: number
    comments?: string
    rating?: number
    type?: QuestionType
  }
}
export type QuestionType = 'Text' | 'Image'
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
  cardsPack_id: string
  question?: string
  answer?: string
  grade?: number
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
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
  answerImg: string
  questionImg: string
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
export type ResponseCardsLearnType = {
  updatedGrade: UpdatedGradeCartType
  token: string
  tokenDeathTime: number
}
export type GetCardsParamsType = {
  packName?: string
  page?: number
  cardsPack_id?: string
  pageCount?: number
  cardQuestion?: string
  cardAnswer?: string
  cardShots?: number
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
  user_id?: string
  user_name?: string
  private?: boolean
  name: string
  path?: string
  grade?: number
  shots?: number
  cardsCount?: number
  type?: string
  rating?: number
  created?: string
  updated?: string
  more_id?: string
  __v?: number
  deckCover: string
}

export type AddNewPackDataType = {
  name: string
  deckCover?: string
  private?: boolean
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
    deckCover?: string
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
  packDeckCover: string
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
  answerImg: string
  questionImg: string
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
export type UpdatedGradeCartType = {
  _id: string
  cardsPack_id: string
  card_id: string
  user_id: string
  grade: number
  shots: number
  more_id: string
  created: string
  updated: string
  __v: number
}
