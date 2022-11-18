import React from 'react'

import { Button } from '@mui/material'
import TextField from '@mui/material/TextField/TextField'
import { useFormik } from 'formik'
import { Link, Navigate } from 'react-router-dom'

import { RegistrationRequestDataType } from '../../api/auth-API'
import { PATH } from '../../app/App'
import s from '../../assets/styles/FormsStyle.module.css'
import InputPassword from '../../common/inputsFromMateUI/InputPassword'
import { RegisterMeTC } from '../../redux/auth-Reducer'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { validateUtil } from '../../utils/validate'

const SignUp = () => {
  const loading = useAppSelector(state => state.app.status)
  const isRegistrationSuccess = useAppSelector(state => state.auth.isRegistrationSuccess)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: validateUtil,
    onSubmit: (values: RegistrationRequestDataType) => {
      dispatch(RegisterMeTC(values))
      formik.resetForm()
    },
  })

  if (isRegistrationSuccess) {
    return <Navigate to={PATH.login} />
  }

  return (
    <section className={s.wrapp}>
      <div className={s.inner}>
        <h2>Sign Up</h2>
        <form className={s.formWrapp} onSubmit={formik.handleSubmit}>
          <TextField
            label="Email"
            placeholder={'Email'}
            {...formik.getFieldProps('email')}
            error={!!(formik.touched.email && formik.errors.email)}
            helperText={formik.errors.email}
          />
          <InputPassword
            nameField={'Password'}
            {...formik.getFieldProps('password')}
            error={!!(formik.touched.password && formik.errors.password)}
          />
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: 'red' }}>{formik.errors.password}</div>
          ) : null}
          <InputPassword
            nameField={'Confirm Password'}
            {...formik.getFieldProps('confirmPassword')}
            error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div>
          ) : null}

          <Button
            disabled={loading === 'loading'}
            type="submit"
            variant="contained"
            style={{ borderRadius: '20px' }}
          >
            Sign Up
          </Button>
          <span className={s.text}>Already have an account?</span>
          <Link to={PATH.login}>SIGN IN</Link>
        </form>
      </div>
    </section>
  )
}

export default SignUp
