import {
  CardLearnType,
  CardPackType,
  cardsAPI,
  GetCardsParamsType,
  GetCardsResponseType,
  UpdateCardDataType,
  UpdatedGradeCartType,
} from '../api/cards-API'

import { setAppStatusAC } from './app-reducer'
import { AppThunkType } from './store'

const initialState = {
  cards: [
    {
      _id: '',
      cardsPack_id: '',
      user_id: '',
      answer: '',
      question: '',
      grade: 0,
      shots: 0,
      comments: '',
      type: '',
      rating: 0,
      more_id: '',
      created: '',
      updated: '',
      __v: 0,
    },
  ] as CardPackType[],
  packUserId: '',
  packName: '',
  packPrivate: false,
  packCreated: '',
  packUpdated: '',
  page: 0,
  pageCount: 0,
  cardsTotalCount: 0 as number,
  minGrade: 0,
  maxGrade: 0,
  cardsPack_id: '' as string,
}

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: CardsReducerAT
): InitialStateType => {
  switch (action.type) {
    case 'CARDS/SET_CARDS':
      return {
        ...state,
        cards: action.data.cards,
        packName: action.data.packName,
        page: action.data.page,
      }
    case 'CARDS/SET_PACK_ID':
      return { ...state, cardsPack_id: action.cardsPack_id }
    case 'CARDS/SET_TOTAL_CARDS_COUNT':
      return { ...state, cardsTotalCount: action.cardsTotalCount }
    case 'CARDS/SET_CARDS_LEARN_DATA': {
      return {
        ...state,
        cards: state.cards.map(el =>
          el._id === action.data.card_id ? { ...el, grade: action.data.grade } : el
        ),
      }
    }
    default:
      return state
  }
}

//actions
export const setCardsAC = (data: GetCardsResponseType) => {
  return { type: 'CARDS/SET_CARDS', data } as const
}
export const setCardsLearnDataAC = (data: UpdatedGradeCartType) =>
  ({ type: 'CARDS/SET_CARDS_LEARN_DATA', data } as const)
export const setPackIdAC = (cardsPack_id: string) =>
  ({ type: 'CARDS/SET_PACK_ID', cardsPack_id } as const)
export const setTotalCardsCountAC = (cardsTotalCount: number) =>
  ({
    type: 'CARDS/SET_TOTAL_CARDS_COUNT',
    cardsTotalCount,
  } as const)

//thunks
export const setCardsTC =
  (params: GetCardsParamsType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.getCards(params)

      dispatch(setCardsAC(res.data))
      dispatch(setAppStatusAC('succeed'))
      dispatch(setTotalCardsCountAC(res.data.cardsTotalCount))
    } catch (e) {
      console.log(e)
    }
  }
export const setLearnCardsTC =
  (params: GetCardsParamsType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.getCards(params)

      dispatch(setCardsAC(res.data))
      dispatch(setAppStatusAC('succeed'))
    } catch (e) {
      console.log(e)
    }
  }
export const createLearnCardsTC =
  (data: CardLearnType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.updateGradeCard(data)

      dispatch(setCardsLearnDataAC(res.data.updatedGrade))
    } catch (e) {
      console.log(e)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }
export const addNewCardTC =
  (
    cardsPack_id: string,
    page: number,
    pageCount: number,
    question: string,
    answer: string
  ): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.addNewCard({ card: { cardsPack_id, question, answer } })

      dispatch(setCardsTC({ cardsPack_id, page, pageCount }))
      dispatch(setAppStatusAC('succeed'))
    } catch (e) {
      console.log(e)
    }
  }

export const deleteCardTC =
  (cardID: string, page: number, pageCount: number): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.deleteCard(cardID)

      dispatch(setCardsTC({ cardsPack_id: res.data.deletedCard.cardsPack_id, page, pageCount }))
      dispatch(setAppStatusAC('succeed'))
    } catch (e) {
      console.log(e)
    }
  }

export const updateCardTC =
  (card: UpdateCardDataType, page: number, pageCount: number): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.updateCard({ ...card })

      dispatch(setCardsTC({ cardsPack_id: res.data.updatedCard.cardsPack_id, page, pageCount }))
      dispatch(setAppStatusAC('succeed'))
    } catch (e) {
      console.log(e)
    }
  }
//types
export type CardsReducerAT =
  | ReturnType<typeof setCardsAC>
  | ReturnType<typeof setPackIdAC>
  | ReturnType<typeof setTotalCardsCountAC>
  | ReturnType<typeof setCardsLearnDataAC>

type InitialStateType = typeof initialState
