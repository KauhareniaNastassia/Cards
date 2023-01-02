import { authAPI, UpdateProfileResponseDataType } from '../api/auth-API'
import { handleServerNetworkError } from '../common/utils/error-handler'

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
      return { ...state, ...action.data }
    }
    default:
      return state
  }
}

//actions
export const setUserProfile = (profile: UserType) => {
  return { type: 'SET-USER-PROFILE', profile } as const
}

export const updateProfile = (data: UpdateProfileResponseDataType) => {
  return { type: 'UPDATE-PROFILE', data } as const
}

export const updateUserProfileTC =
  (name: string, avatar?: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await authAPI.updateProfile(name, avatar)

      dispatch(setAppStatusAC('succeed'))
      dispatch(updateProfile(res.data.updatedUser))
      dispatch(SetAppSuccessAC('User name successfully changed'))
    } catch (e) {
      handleServerNetworkError(e as { errorMessage: string }, dispatch)
    }
  }

//types
export type UserType = typeof initialState
export type ProfileReducerAT = ReturnType<typeof setUserProfile> | ReturnType<typeof updateProfile>
