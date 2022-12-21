import { createTheme } from '@mui/material'
import { blue, common, grey, red } from '@mui/material/colors'

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
    MuiModal: {
      defaultProps: {
        style: {
          backgroundColor: '#28282B',
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        style: {
          color: '#7e7e7f',
        },
      },
    },
    MuiRating: {
      defaultProps: {
        style: {
          textDecoration: common.white,
          color: 'red',
        },
      },
    },

    MuiTableCell: {
      defaultProps: {
        style: {
          backgroundColor: '#28282B',
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
