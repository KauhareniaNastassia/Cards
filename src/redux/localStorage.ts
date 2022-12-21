export enum KEY {
  THEME = 'theme:',
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(KEY.THEME)

    if (serializedState === null) {
      return undefined
    }

    return serializedState
  } catch (err) {
    return undefined
  }
}

export const saveState = (theme: string) => {
  try {
    localStorage.setItem(KEY.THEME, theme)
  } catch {
    // ignore write errors
  }
}
