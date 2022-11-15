const initialState = {
  profile: null,
}

export interface IProfile {
  profile: IUser | null
}

export interface IUser {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
}

export const profileReducer = (state = initialState, action: ProfileReducerAT): IProfile => {
  switch (action.type) {
    case 'SET-USER-PROFILE':
      return { ...state, profile: action.profile }

    default:
      return state
  }
}
type SetUserProfileType = ReturnType<typeof setUserProfile>
export const setUserProfile = (profile: IUser | null) => {
  return { type: 'SET-USER-PROFILE', profile } as const
}
export type ProfileReducerAT = SetUserProfileType
