import React, { DetailedHTMLProps, InputHTMLAttributes, useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import FormControl from '@mui/material/FormControl/FormControl'
import IconButton from '@mui/material/IconButton/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel/InputLabel'
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput/OutlinedInput'

import t from '../../assets/styles/ThemeStyles.module.css'
import { useAppSelector } from '../../utils/hooks'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type inputPropsType = DefaultInputPropsType &
  OutlinedInputProps & {
    nameField: string
  }

const InputPassword: React.FC<inputPropsType> = ({ nameField, value, onChange, ...restProps }) => {
  const [eye, setEye] = useState<boolean>(false)

  const theme = useAppSelector(state => state.app.theme)

  const handleClickShowPassword = () => {
    setEye(!eye)
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <FormControl variant="outlined" className={t[theme]}>
      <InputLabel className={t[theme]} htmlFor="outlined-adornment-password">
        {nameField}
      </InputLabel>
      <OutlinedInput
        type={eye ? 'text' : 'password'}
        value={value}
        className={t[theme]}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {eye ? <VisibilityOff className={t[theme]} /> : <Visibility className={t[theme]} />}
            </IconButton>
          </InputAdornment>
        }
        label={nameField}
        {...restProps}
      />
    </FormControl>
  )
}

export default InputPassword
