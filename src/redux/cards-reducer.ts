import { cardsAPI } from '../api/cards-API'

import { setAppStatusAC } from './app-reducer'
import { AppThunkType } from './store'

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: CardsReducerAT
): InitialStateType => {
  switch (action.type) {
    case 'SET-CARDS':
      return { ...state, [action.userId]: action.cards }
    default:
      return state
  }
}

const initialState = {
  cards: [
    {
      answer: '',
      question: '',
      cardsPack_id: '',
      grade: 0,
      shots: 0,
      user_id: '',
      updated: '',
      _id: '',
    },
  ],
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  page: 0,
  pageCount: 0,
  packUserId: '',
}

//thunks
export const setCardsTC =
  (userId: string): AppThunkType =>
  dispatch => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.getCards(userId).then(res => {
      const cards = res.data.data.cards

      dispatch(setCardsAC(userId, cards))
      dispatch(setAppStatusAC('succeed'))
    })
  }
//actions
export const setCardsAC = (userId: string, cards: CardType[]) => {
  return { type: 'SET-CARDS', userId, cards } as const
}
//types
export type CardsReducerAT = SetCardsACType
type SetCardsACType = ReturnType<typeof setCardsAC>
type InitialStateType = typeof initialState
export type CardType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  updated: string
  _id: string
}
