const SET_USER_PROFILE = 'SET-USER-PROFILE'

const initialState = {
  _id: '111',
  email: 'hohoho@gmail.com',
  name: 'Tatsiana',
  avatar:
    'https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=',
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
export const setUserProfile = (profile: UserType) => {
  return { type: SET_USER_PROFILE, profile } as const
}

//types
export type ProfileReducerAT = SetUserProfileType

type SetUserProfileType = ReturnType<typeof setUserProfile>
