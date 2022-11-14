import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import FormControl from '@mui/material/FormControl/FormControl'
import IconButton from '@mui/material/IconButton/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel/InputLabel'
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput/OutlinedInput'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

interface State {
  password: string
  showPassword: boolean
}
type inputPropsType = DefaultInputPropsType &
  OutlinedInputProps & {
    nameField: string
  }

const InputPassword: React.FC<inputPropsType> = ({ nameField, ...restProps }) => {
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false,
  })

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.currentTarget.value })
    // props.onChangeText(event.currentTarget.value)
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">{nameField}</InputLabel>
      <OutlinedInput
        name={nameField}
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        onChange={handleChange('password')}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
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
