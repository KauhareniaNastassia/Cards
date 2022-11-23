const initialState = {
  name: undefined as string | undefined,
}

export type PackSearchReducerStateType = typeof initialState

export const packSearchReducer = (
  state: PackSearchReducerStateType = initialState,
  action: PackSearchReducerAT
): PackSearchReducerStateType => {
  switch (action.type) {
    case 'search/SEARCH_PACKS': {
      if (!action.name) {
        action.name = undefined
      }

      return {
        ...state,
        name: action.name,
      }
    }
    default:
      return state
  }
}

//actions
export const searchPacksByNameAC = (name: string | undefined) => ({
  type: 'search/SEARCH_PACKS' as const,
  name,
})

//types
export type PackSearchReducerAT = ReturnType<typeof searchPacksByNameAC>
