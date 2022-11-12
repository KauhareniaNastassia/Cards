export type initialStateType = {}

const initState: initialStateType = {}

export const reducer = (state = initState, action: ActionsType): initialStateType => {
  // fix any
  switch (action.type) {
    case 'BASE-ACTION':
      return state

    default:
      return state
  }
}

type ActionsType = baseACType

type baseACType = ReturnType<typeof baseAC>
export const baseAC = () => {
  return {
    type: 'BASE-ACTION',
    payload: {},
  } as const
} // fix any
