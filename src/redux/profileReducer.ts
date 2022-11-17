import { authAPI } from '../api/auth-API'

import { setAppStatusAC, SetAppSuccessAC } from './app-Reducer'
import { AppThunkType } from './store'

const SET_USER_PROFILE = 'SET-USER-PROFILE'
const UPDATE_PROFILE = 'UPDATE-PROFILE'

const initialState = {
  _id: '111',
  email: 'hohoho@gmail.com',
  name: 'Tatsiana',
  avatar: '',
}

export type UserType = {
  _id: string
  email: string
  name: string
  avatar: string
}

export const profileReducer = (
  state: UserType = initialState,
  action: ProfileReducerAT
): UserType => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        ...action.profile,
      }
    case UPDATE_PROFILE: {
      return { ...state, name: action.name }
    }
    default:
      return state
  }
}
//thunks
/*export const updateUserProfileTC = (name: string) => {
  return (dispatch: Dispatch) => {
    authAPI.updateProfile(name).then(res => {
      if (res.data) {
        dispatch(updateProfile(name))
        dispatch(SetAppSuccessAC('User name successfully changed'))
      }
    })
  }
}*/

export const updateUserProfileTC =
  (name: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await authAPI.updateProfile(name)

      if (res.data) {
        dispatch(setAppStatusAC('succeed'))
        dispatch(updateProfile(name))
        dispatch(SetAppSuccessAC('User name successfully changed'))
      }
    } catch (e) {
      dispatch(setAppStatusAC('failed'))
      console.log(e)
    }
  }

//actions
export const setUserProfile = (profile: UserType) => {
  return { type: SET_USER_PROFILE, profile } as const
}
export const updateProfile = (name: string) => {
  return { type: UPDATE_PROFILE, name } as const
}

//types
export type ProfileReducerAT = SetUserProfileType | UpdateProfileType

type SetUserProfileType = ReturnType<typeof setUserProfile>
type UpdateProfileType = ReturnType<typeof updateProfile>
