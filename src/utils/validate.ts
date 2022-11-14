type validateType = {
  email?: string
  name?: string
  password?: string
}

export const validateUtil = (values: validateType) => {
  const errors: validateType = {}

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 4) {
    errors.password = 'Password Must be 4 characters or more'
  }

  // if (!values.firstName) {
  //   errors.firstName = 'Required'
  // } else if (values.firstName.length > 15) {
  //   errors.firstName = 'Must be 15 characters or less'
  // }

  return errors
}
