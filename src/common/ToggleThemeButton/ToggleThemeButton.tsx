import { SetAppThemeAC } from '../../redux/app-reducer'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'

// import s from './ToggleThemeButton.module.css'

export const ToggleThemeButton = () => {
  const theme = useAppSelector(state => state.app.theme)
  const dispatch = useAppDispatch()

  const HandleChangeTheme = () => {
    dispatch(SetAppThemeAC(theme === 'light' ? 'dark' : 'light'))
  }

  return (
    <div>
      <button onClick={HandleChangeTheme}>theme</button>
    </div>
  )
}
