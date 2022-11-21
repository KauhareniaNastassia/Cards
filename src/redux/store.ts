import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { appReducer, AppReducerAT } from './app-reducer'
import { authReducer, AuthReducerAT } from './auth-reducer'
import { packReducer, PackReducerAT } from './pack-reducer'
import { profileReducer, ProfileReducerAT } from './profile-reducer'

const RootReducer = combineReducers({
  profile: profileReducer,
  auth: authReducer,
  app: appReducer,
  packs: packReducer,
})

export const store = createStore(RootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof RootReducer>
export type AppActionsType = AuthReducerAT | AppReducerAT | ProfileReducerAT | PackReducerAT
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionsType
>
// @ts-ignore
window.store = store // for dev
