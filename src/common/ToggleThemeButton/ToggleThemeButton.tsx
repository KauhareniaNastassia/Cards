import { SetAppThemeAC } from '../../redux/app-reducer'
import { saveState } from '../../redux/localStorage.'
import { store } from '../../redux/store'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'

export const ToggleThemeButton = () => {
  const theme = useAppSelector(state => state.app.theme)
  const dispatch = useAppDispatch()

  const HandleChangeTheme = () => {
    dispatch(SetAppThemeAC(theme === 'light' ? 'dark' : 'light'))
    saveState(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div>
      <button onClick={HandleChangeTheme}>theme</button>
    </div>
  )
}
