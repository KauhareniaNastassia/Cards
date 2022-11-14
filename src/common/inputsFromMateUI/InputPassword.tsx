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

type inputPropsType = DefaultInputPropsType &
  OutlinedInputProps & {
    nameField: string
  }

const InputPassword: React.FC<inputPropsType> = ({ nameField, value, onChange, ...restProps }) => {
  const [eye, setEye] = useState<boolean>(false)

  // console.log('input')
  // const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
  //   setValues({ ...values, [prop]: event.currentTarget.value })
  //   // props.onChangeText(event.currentTarget.value)
  // }

  const handleClickShowPassword = () => {
    setEye(!eye)
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  console.log('InputPassword')

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">{nameField}</InputLabel>
      <OutlinedInput
        // name={nameField}
        type={eye ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {eye ? <VisibilityOff /> : <Visibility />}
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
