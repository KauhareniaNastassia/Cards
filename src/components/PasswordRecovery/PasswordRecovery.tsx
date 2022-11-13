import React from 'react'

import { Button } from '@mui/material'
import TextField from '@mui/material/TextField/TextField'

import s from '../SignUp/SignUp.module.css'

export const PasswordRecovery = () => {
  return (
    <section className={s.wrapp}>
      <div className={s.inner}>
        <h2>Forgot your password?</h2>
        <form className={s.formWrapp}>
          <TextField name="email" label="Email" placeholder={'Email'} />
          <span>Enter your email address and we will send you further instructions </span>
          <Button variant="contained" style={{ borderRadius: '20px' }}>
            Send Instructions
          </Button>
          <Button
            variant="text"
            style={{
              opacity: '0.5',
              fontSize: '12',
              textTransform: 'inherit',
              color: 'black',
            }}
          >
            Did you remember your password?
          </Button>
          <Button variant="text" style={{ color: 'blue', textTransform: 'inherit' }}>
            Try logging in
          </Button>
        </form>
      </div>
    </section>
  )
}
