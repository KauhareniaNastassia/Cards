import React from 'react'

import { Button } from '@mui/material'
import { useFormik } from 'formik'

import InputPassword from '../../common/inputsFromMateUI/InputPassword'
import { validateUtil } from '../../utils/validate'
import s from '../SignUp/SignUp.module.css'

export const CreateNewPassword = () => {
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: validateUtil,
    onSubmit: values => {
      console.log('submit')
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <section className={s.wrapp}>
      <div className={s.inner}>
        <h2>Create New Password</h2>
        <form className={s.formWrapp} onSubmit={formik.handleSubmit}>
          <InputPassword
            nameField={'Password'}
            {...formik.getFieldProps('password')}
            error={!!(formik.touched.password && formik.errors.password)}
          />
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: 'red' }}>{formik.errors.password}</div>
          ) : null}
          <span style={{ opacity: '50%' }}>
            Create new password and we will send you further instructions to email
          </span>
          <Button
            type="submit"
            variant="contained"
            style={{ borderRadius: '20px', textTransform: 'inherit' }}
          >
            Create new password
          </Button>
        </form>
      </div>
    </section>
  )
}
