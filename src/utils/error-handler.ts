import axios from 'axios'
import { Dispatch } from 'redux'

import { SetAppErrorAC, setAppStatusAC } from '../redux/app-reducer'

export const handleServerNetworkError = (
  err: { errorMessage: string },
  dispatch: Dispatch<ReturnType<typeof SetAppErrorAC> | ReturnType<typeof setAppStatusAC>>
) => {
  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? (err.response.data as { error: string }).error : err.message

    dispatch(setAppStatusAC('failed'))
    dispatch(SetAppErrorAC(error))
  }
}
