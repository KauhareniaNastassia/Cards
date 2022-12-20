import { createTheme } from '@mui/material'
import { red, blue, grey, common } from '@mui/material/colors'

//https://mui.com/material-ui/customization/theme-components/#global-style-overrides

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
  components: {
    MuiTableCell: {
      defaultProps: {
        style: {
          backgroundColor: grey['200'],
          color: common.black,
          fontFamily: 'Montseratt',
          fontWeight: 'bold',
          fontSize: '15px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      },
    },
  },
})

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
  components: {
    MuiTableCell: {
      defaultProps: {
        style: {
          backgroundColor: common.black,
          color: common.white,
          fontFamily: 'Montseratt',
          fontWeight: 'bold',
          fontSize: '15px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      },
    },
    MuiPaginationItem: {
      defaultProps: {
        style: {
          color: common.white,
        },
      },
    },
    MuiNativeSelect: {
      defaultProps: {
        style: {
          color: common.white,
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        style: {
          color: common.white,
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        style: {
          color: common.white,
          backgroundColor: grey[500],
        },
      },
    },
  },
})
