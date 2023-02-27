import { useAppDispatch, useAppSelector } from '../../common/utils/hooks'
import { SetAppThemeAC } from '../../redux/app-reducer'
import { saveState } from '../../redux/localStorage'

import s from './ToggleThemeButton.module.css'

export const ToggleThemeButton = () => {
  const theme = useAppSelector(state => state.app.theme)
  const dispatch = useAppDispatch()

  const HandleChangeTheme = () => {
    if (theme === 'dark') {
      dispatch(SetAppThemeAC('light'))
      saveState('light')
    } else {
      dispatch(SetAppThemeAC('dark'))
      saveState('dark')
    }
  }

  return (
    <div className={s.wrapper}>
      <input id={s.toggle_checkbox} type="checkbox" checked={theme === 'light'} />
      <label onClick={HandleChangeTheme} className={s.label} htmlFor="toggle_checkbox">
        <div id={s.star}>
          <div className={s.star} id={s.star1}>
            ★
          </div>
          <div className={s.star} id={s.star2}>
            ★
          </div>
        </div>
        <div id={s.moon}></div>
      </label>
    </div>
  )
}
