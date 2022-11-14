import React from 'react'

import { Button } from '@mui/material'
import TextField from '@mui/material/TextField/TextField'

import InputPassword from '../../common/inputsFromMateUI/InputPassword'

import s from './SignUp.module.css'

const SignUp = () => {
  return (
    <section className={s.wrapp}>
      <div className={s.inner}>
        <h2>Sign Up</h2>
        <form className={s.formWrapp}>
          <TextField name="email" label="Email" placeholder={'Email'} />
          <InputPassword
            nameField={'Password'}
            onChangeText={value => {
              console.log(value)
            }}
          />
          <InputPassword
            nameField={'Confirm Password'}
            onChangeText={value => {
              console.log(value)
            }}
          />
          <Button variant="contained" style={{ borderRadius: '20px' }}>
            Sign Up
          </Button>
          <span>Already have an account?</span>
          <Button variant="text" style={{ color: 'blue' }}>
            Sign In
          </Button>
        </form>
      </div>
    </section>
  )
}

export default SignUp
