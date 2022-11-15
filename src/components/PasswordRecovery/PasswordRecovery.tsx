import React from 'react'

import { Button } from '@mui/material'
import TextField from '@mui/material/TextField/TextField'
import { useFormik } from 'formik'
import { Link, Navigate, useParams } from 'react-router-dom'

import { PATH } from '../../app/App'
import { PasswordRecoveryTC } from '../../redux/auth-Reducer'
import { useAppDispatch } from '../../utils/hooks'
import { validateUtil } from '../../utils/validate'
import s from '../SignUp/SignUp.module.css'

export const PasswordRecovery = () => {
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: validateUtil,
    onSubmit: values => {
      if (values.email) {
        dispatch(PasswordRecoveryTC(values.email))
      }
    },
  })

  return (
    <section className={s.wrapp}>
      <div className={s.inner}>
        <h2>Forgot your password?</h2>
        <form className={s.formWrapp} onSubmit={formik.handleSubmit}>
          <TextField
            label="Email"
            placeholder={'Email'}
            {...formik.getFieldProps('email')}
            error={!!(formik.touched.email && formik.errors.email)}
            helperText={formik.errors.email}
          />
          <span>Enter your email address and we will send you further instructions </span>
          <Button type="submit" variant="contained" style={{ borderRadius: '20px' }}>
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
          <Link to={PATH.login}>Try Loggin in</Link>
        </form>
      </div>
    </section>
  )
}
