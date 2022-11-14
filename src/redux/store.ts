import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { appReducer, appReducerAT } from './app-Reducer'
import { authReducer, authReducerAT } from './auth-Reducer'

const RootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
})

export const store = createStore(RootReducer, applyMiddleware(thunk))

export type RootReducerType = ReturnType<typeof RootReducer>
export type AppActionsType = authReducerAT | appReducerAT
export type AppDispatchType = ThunkDispatch<RootReducerType, unknown, AppActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  RootReducerType,
  unknown,
  AppActionsType
>
// @ts-ignore
window.store = store // for dev
