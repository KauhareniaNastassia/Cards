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

// https://www.youtube.com/watch?v=U8f01SM8Kq4&t=542s     =>    localstorage в Redux part 2 (PreloadedState)
// https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e
