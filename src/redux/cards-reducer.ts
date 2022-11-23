import { CardPackType, cardsAPI, UpdateCardDataType } from '../api/cards-API'

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
  cardsTotalCount: 0,
  minGrade: 0,
  maxGrade: 0,
  cardsPack_id: '' as string,
}

export const cardsReducer = (
  state: InitialStateType = initialState,
  action: CardsReducerAT
): InitialStateType => {
  switch (action.type) {
    case 'CARDS/SET-CARDS':
      return { ...state, cards: [...action.cards] }
    case 'CARDS/SET_PACK_ID':
      return { ...state, cardsPack_id: action.cardsPack_id }
    default:
      return state
  }
}

//actions
export const setCardsAC = (cards: CardPackType[]) => {
  return { type: 'CARDS/SET-CARDS', cards } as const
}
export const setPackIdAC = (cardsPack_id: string) =>
  ({ type: 'CARDS/SET_PACK_ID', cardsPack_id } as const)
//thunks
export const setCardsTC =
  (cardsPack_id: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.getCards(cardsPack_id)

      dispatch(setCardsAC(res.data.cards))
      dispatch(setAppStatusAC('succeed'))
    } catch (e) {
      console.log(e)
    }
  }

export const addNewCardTC =
  (cardsPack_id: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.addNewCard({ card: { cardsPack_id } })

      dispatch(setCardsTC(cardsPack_id))
      dispatch(setAppStatusAC('succeed'))
    } catch (e) {
      console.log(e)
    }
  }

export const deleteCardTC =
  (cardID: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.deleteCard(cardID)

      dispatch(setCardsTC(res.data.deletedCard.cardsPack_id))
      dispatch(setAppStatusAC('succeed'))
    } catch (e) {
      console.log(e)
    }
  }

export const updateCardTC =
  (card: UpdateCardDataType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.updateCard({ ...card })

      dispatch(setCardsTC(res.data.updatedCard.cardsPack_id))
      dispatch(setAppStatusAC('succeed'))
    } catch (e) {
      console.log(e)
    }
  }
//types
export type CardsReducerAT = ReturnType<typeof setCardsAC> | ReturnType<typeof setPackIdAC>

type InitialStateType = typeof initialState
