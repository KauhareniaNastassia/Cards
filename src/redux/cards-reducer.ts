import { cardsAPI } from '../api/cards-API'

import { setAppStatusAC } from './app-reducer'
import { AppThunkType } from './store'

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: CardsReducerAT
): InitialStateType => {
  switch (action.type) {
    case 'SET-CARDS':
      return { ...state, cards: action.cards }
    default:
      return state
  }
}

const initialState = {
  cards: [] as CardType[],
  cardsTotalCount: 0,
  packName: '',
  maxGrade: 0,
  minGrade: 0,
  page: 0,
  pageCount: 0,
  packUserId: '',
}

//thunks
export const setCardsTC =
  (cardsPack_id: string): AppThunkType =>
  dispatch => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.getCards(cardsPack_id).then(res => {
      const cards = res.data.cards

      dispatch(setCardsAC(cards))
      dispatch(setAppStatusAC('succeed'))
    })
  }
//actions
export const setCardsAC = (cards: CardType[]) => {
  return { type: 'SET-CARDS',  cards } as const
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
