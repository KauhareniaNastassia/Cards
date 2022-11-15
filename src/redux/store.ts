import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { appReducer, appReducerAT } from './app-Reducer'
import { authReducer, authReducerAT } from './auth-Reducer'
import { profileReducer, ProfileReducerAT } from './profileReducer'

const RootReducer = combineReducers({
  profile: profileReducer,
  auth: authReducer,
  app: appReducer,
})

export const store = createStore(RootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof RootReducer>
export type AppActionsType = authReducerAT | appReducerAT | ProfileReducerAT
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionsType
>
// @ts-ignore
window.store = store // for dev
