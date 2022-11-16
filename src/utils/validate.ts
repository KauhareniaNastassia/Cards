type validateType = {
  email?: string
  name?: string
  rememberMe?: boolean
  password?: string
  confirmPassword?: string
}

export const validateUtil = (values: validateType) => {
  const errors: validateType = {}

  if (values.email !== undefined) {
    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
  }
  if (values.password !== undefined) {
    if (!values.password) {
      errors.password = 'Required'
    } else if (values.password.length < 7) {
      errors.password = 'Password Must be 7 characters or more'
    }
  }
  if (values.confirmPassword !== undefined) {
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Required'
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Password is not the same !!!'
    }
  }

  // if (!values.firstName) {
  //   errors.firstName = 'Required'
  // } else if (values.firstName.length > 15) {
  //   errors.firstName = 'Must be 15 characters or less'
  // }

  return errors
}
