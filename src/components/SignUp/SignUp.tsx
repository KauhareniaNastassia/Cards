import React from 'react'

import { Button } from '@mui/material'
import TextField from '@mui/material/TextField/TextField'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'

import { PATH } from '../../app/App'
import InputPassword from '../../common/inputsFromMateUI/InputPassword'
import { validateUtil } from '../../utils/validate'

import s from './SignUp.module.css'

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: validateUtil,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    },
  })

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
          <Button type="submit" variant="contained" style={{ borderRadius: '20px' }}>
            Sign Up
          </Button>
          <span>Already have an account?</span>
          <Link to={PATH.Login}>SIGN IN</Link>
        </form>
      </div>
    </section>
  )
}

export default SignUp
