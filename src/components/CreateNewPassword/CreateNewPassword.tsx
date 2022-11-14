import React from 'react'

import { Button } from '@mui/material'

import InputPassword from '../../common/inputsFromMateUI/InputPassword'
import s from '../SignUp/SignUp.module.css'

export const CreateNewPassword = () => {
  return (
    <section className={s.wrapp}>
      <div className={s.inner}>
        <h2>Create New Password</h2>
        <form className={s.formWrapp}>
          <InputPassword
            nameField={'Password'}
            onChangeText={value => {
              console.log(value)
            }}
          />
          <span style={{ opacity: '50%' }}>
            Create new password and we will send you further instructions to email
          </span>
          <Button variant="contained" style={{ borderRadius: '20px', textTransform: 'inherit' }}>
            Create new password
          </Button>
        </form>
      </div>
    </section>
  )
}
