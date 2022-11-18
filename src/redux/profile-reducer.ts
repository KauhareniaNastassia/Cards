import { authAPI } from '../api/auth-API'
import { handleServerNetworkError } from '../utils/error-handler'

import { setAppStatusAC, SetAppSuccessAC } from './app-reducer'
import { AppThunkType } from './store'

const initialState = {
  _id: '',
  email: '',
  name: '',
  avatar: '',
}

export const profileReducer = (
  state: UserType = initialState,
  action: ProfileReducerAT
): UserType => {
  switch (action.type) {
    case 'SET-USER-PROFILE':
      return {
        ...state,
        ...action.profile,
      }
    case 'UPDATE-PROFILE': {
      return { ...state, name: action.name }
    }
    default:
      return state
  }
}

export const updateUserProfileTC =
  (name: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await authAPI.updateProfile(name)

      dispatch(setAppStatusAC('succeed'))
      dispatch(updateProfile(name))
      dispatch(SetAppSuccessAC('User name successfully changed'))
    } catch (e) {
      handleServerNetworkError(e as { errorMessage: string }, dispatch)
    }
  }

//actions
export const setUserProfile = (profile: UserType) => {
  return { type: 'SET-USER-PROFILE', profile } as const
}

export const updateProfile = (name: string) => {
  return { type: 'UPDATE-PROFILE', name } as const
}

//types
export type UserType = typeof initialState
export type ProfileReducerAT = ReturnType<typeof setUserProfile> | ReturnType<typeof updateProfile>
