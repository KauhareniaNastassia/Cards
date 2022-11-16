import React from 'react'

import { Button, FormControlLabel } from '@mui/material'
import TextField from '@mui/material/TextField/TextField'
import { useFormik } from 'formik'
import { Link, Navigate } from 'react-router-dom'

import { LogInRequestDataType } from '../../api/auth-API'
import { PATH } from '../../app/App'
import Checkbox from '../../common/Checkbox/Checkbox'
import InputPassword from '../../common/inputsFromMateUI/InputPassword'
import { loginTC } from '../../redux/auth-Reducer'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { validateUtil } from '../../utils/validate'

import s from './Login.module.css'

const Login = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: validateUtil,
    onSubmit: (values: LogInRequestDataType) => {
      dispatch(loginTC(values))
      /* alert(JSON.stringify(values, null, 2))*/
      formik.resetForm()
    },
  })

  if (isLoggedIn) {
    return <Navigate to={PATH.profile} />
  }

  return (
    <section className={s.wrapp}>
      <div className={s.inner}>
        <h2>Sign In</h2>
        <form className={s.formWrapp} onSubmit={formik.handleSubmit}>
          <TextField
            label="Email"
            placeholder={'Email'}
            {...formik.getFieldProps('email')}
            error={!!(formik.touched.email && formik.errors.email)}
            helperText={formik.errors.email}
          />

          <InputPassword
            className={s.inputPassword}
            nameField={'Password'}
            {...formik.getFieldProps('password')}
            error={!!(formik.touched.password && formik.errors.password)}
          />
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: 'red' }}>{formik.errors.password}</div>
          ) : null}

          <FormControlLabel
            className={s.formControlLabel}
            label={'Remember me'}
            control={
              <Checkbox
                {...formik.getFieldProps('rememberMe')}
                checked={formik.values.rememberMe}
              />
            }
          />

          <div className={s.passwordRecoveryLinkBlock}>
            <Link className={s.passwordRecoveryLink} to={PATH.passwordRecovery}>
              Forgot password?
            </Link>
          </div>

          <Button type="submit" variant="contained" style={{ borderRadius: '20px' }}>
            Sign In
          </Button>

          <span className={s.haveAnAccountBlock}>Already have an account?</span>
          <Link className={s.navigateToLink} to={PATH.registration}>
            SIGN UP
          </Link>
        </form>
      </div>
    </section>
  )
}

export default Login
