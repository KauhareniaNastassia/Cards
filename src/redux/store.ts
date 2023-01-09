import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { appReducer, AppReducerAT } from './app-reducer'
import { authReducer, AuthReducerAT } from './auth-reducer'
import { cardsReducer, CardsReducerAT } from './cards-reducer'
import { packReducer, PackReducerAT } from './pack-reducer'
import { profileReducer, ProfileReducerAT } from './profile-reducer'

const RootReducer = combineReducers({
  profile: profileReducer,
  auth: authReducer,
  app: appReducer,
  packs: packReducer,
  cards: cardsReducer,
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunk)))

export type AppRootStateType = ReturnType<typeof RootReducer>
export type AppActionsType =
  | AuthReducerAT
  | AppReducerAT
  | ProfileReducerAT
  | PackReducerAT
  | CardsReducerAT
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionsType
>
// @ts-ignore
window.store = store
