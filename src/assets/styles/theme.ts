import { createTheme } from '@mui/material'
import { red, blue } from '@mui/material/colors'

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
})

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
})
