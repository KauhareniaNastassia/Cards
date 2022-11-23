import { CardPackType, cardsAPI } from '../api/cards-API'

import { setAppStatusAC } from './app-reducer'
import { AppThunkType } from './store'

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: CardsReducerAT
): InitialStateType => {
  switch (action.type) {
    case 'SET-CARDS':
      return { ...state, cards: [...action.cards] }
    default:
      return state
  }
}

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
  cardsTotalCount: 0,
  minGrade: 0,
  maxGrade: 0,
  token: '',
  tokenDeathTime: 0,
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
export const setCardsAC = (cards: CardPackType[]) => {
  return { type: 'SET-CARDS', cards } as const
}
//types
export type CardsReducerAT = SetCardsACType
type SetCardsACType = ReturnType<typeof setCardsAC>
type InitialStateType = typeof initialState
