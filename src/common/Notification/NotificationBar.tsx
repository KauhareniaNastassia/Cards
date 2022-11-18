import React, { forwardRef, useState } from 'react'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { SetAppErrorAC, SetAppSuccessAC } from '../../redux/app-Reducer'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const NotificationBar = () => {
  const errorMessage = useAppSelector(state => state.app.errorMessage)
  const successMessage = useAppSelector(state => state.app.successMessage)
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      setOpen(false)
      dispatch(SetAppErrorAC(null))
      dispatch(SetAppSuccessAC(null))
    }
    dispatch(SetAppErrorAC(null))
    dispatch(SetAppSuccessAC(null))
  }

  return (
    <div>
      {successMessage && (
        <Snackbar open={!!successMessage} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            {successMessage}
          </Alert>
        </Snackbar>
      )}
      {errorMessage && (
        <Snackbar open={!!errorMessage} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
    </div>
  )
}

export default NotificationBar
