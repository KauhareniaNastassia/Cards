import React from 'react'

import { Button, Checkbox, FormControlLabel, FormHelperText } from '@mui/material'
import TextField from '@mui/material/TextField/TextField'
import { useFormik } from 'formik'
import { Link, Navigate } from 'react-router-dom'

import { LogInRequestDataType } from '../../api/auth-API'
import { PATH } from '../../app/App'
import t from '../../assets/styles/ThemeStyles.module.css'
import InputPassword from '../../common/InputFromMUI/InputPassword'
import { useAppDispatch, useAppSelector } from '../../common/utils/hooks'
import { validateUtil } from '../../common/utils/validate'
import { loginTC } from '../../redux/auth-reducer'

import s from './Login.module.css'

export const Login = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const loading = useAppSelector(state => state.app.status)
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.app.theme)
  const formik = useFormik({
    initialValues: {
      email: 'nya-admin@nya.nya',
      password: '1qazxcvBG',
      rememberMe: false,
    },
    validate: validateUtil,
    onSubmit: (values: LogInRequestDataType) => {
      dispatch(loginTC(values))
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
            margin="normal"
            className={s.textField}
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
            <FormHelperText sx={{ color: 'error.main', paddingLeft: '15px' }} id="">
              {formik.errors.password}
            </FormHelperText>
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
            <Link className={`${s.passwordRecoveryLink} ${t[theme]}`} to={PATH.passwordRecovery}>
              Forgot password?
            </Link>
          </div>

          <Button
            disabled={loading === 'loading'}
            type="submit"
            variant="contained"
            style={{ borderRadius: '20px', margin: '15px 0px' }}
          >
            Sign In
          </Button>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <span className={s.haveAnAccountBlock}>You don't have an account?</span>
          <Link className={s.navigateToLink} to={PATH.registration}>
            SIGN UP
          </Link>
        </form>
      </div>
    </section>
  )
}
