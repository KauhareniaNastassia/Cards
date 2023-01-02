import React from 'react'

import { Button, FormHelperText } from '@mui/material'
import { useFormik } from 'formik'
import { Navigate, useParams } from 'react-router-dom'

import { SetNewPasswordDataType } from '../../api/auth-API'
import { PATH } from '../../app/App'
import s from '../../assets/styles/FormsStyle.module.css'
import InputPassword from '../../common/InputFromMUI/InputPassword'
import { setNewPasswordTC } from '../../redux/auth-reducer'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { validateUtil } from '../../utils/validate'

export const CreateNewPassword = () => {
  const { token } = useParams()
  const dispatch = useAppDispatch()
  const success = useAppSelector(state => state.auth.token)
  const loading = useAppSelector(state => state.app.status)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: validateUtil,
    onSubmit: values => {
      if (values.password && token) {
        const data: SetNewPasswordDataType = {
          password: values.password,
          resetPasswordToken: token,
        }

        dispatch(setNewPasswordTC(data))
      }
    },
  })

  if (success) {
    return <Navigate to={PATH.login} />
  }
  if (isLoggedIn) {
    return <Navigate to={PATH.profile} />
  }

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
            <FormHelperText sx={{ color: 'error.main', paddingLeft: '15px' }} id="">
              {formik.errors.password}
            </FormHelperText>
          ) : null}
          <span style={{ opacity: '50%', margin: '15px 0px' }}>
            Create new password and we will send you further instructions to email
          </span>
          <Button
            disabled={loading === 'loading'}
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
