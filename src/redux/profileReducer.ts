const SET_USER_PROFILE = 'SET-USER-PROFILE'

const initialState = {
  _id: '111',
  email: 'hohoho@gmail.com',
  name: 'Tatsiana',
  avatar:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI-SfCS7BGFuSKOXfVz_4UspTZDGuRJX42Rwpcopk&s',
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

    default:
      return state
  }
}
//thunks

//actions
export const setUserProfile = (_id: string, email: string, name: string, avatar: string) => {
  return { type: SET_USER_PROFILE, profile: { _id, email, name, avatar } } as const
}

//types
export type ProfileReducerAT = SetUserProfileType

type SetUserProfileType = ReturnType<typeof setUserProfile>
