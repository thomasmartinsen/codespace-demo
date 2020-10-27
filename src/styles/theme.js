import { createMuiTheme } from '@material-ui/core/styles';

const fontFamily = ['Open sans'];

export const theme = createMuiTheme({
  palette: {
    primary: {
      main:'#44546a'
    },
    secondary: {
      main: '#1590CF'
    },
    indicators: {
      green:'#33BA69',
      lightGreen:'#EAF7EF',
      warningYellow:'#F2D327',
      errorRed:'#C63C3C',
    },
    devices: {
      green:'#33BA69',
      red:'#C67F7F',
      azureBlue:'#1EBAE7',
      deepRed:'#290F0F',
      darkBlue:'#005B8E',
      purple:'#BC55C9',
      gold:'#E3A034',
      militaryGreen:'#A5A148'
    },
    defaults: {
      darkBlue:'#44546a',
      white:'#ffffff',
      black:'#000000',
      grey:'#dcdbdb',
      red: '#D0133E'
    },
    generalUi: {
      borders:'#E0E0E0',
      lines:'#C7C7C7',
      icons:'#707070',
      lightIcons:'#b6b6b6',
      background:'#F5F5F5'
    },
    menu: {
      bg:'#002546',
      icons:'#FFFFFF',
      border:'#002546',
      text:'#FFFFFF'
    },
    text: {
      default:'#383838',
      defaultSub:'#6F6F6F',
      white:'#ffffff',
      header:'#000000'
    },
    common: {
      white: '#fff',
      black: '#000',
      textBlack: '#606060',
      offWhite: '#FAFAFA',
      lines: '#E0E0E0',
      cardOutline: '#E5E5E5',
      defaultText: '#383838'
  },
  faded: {
      green:'#EAF7EF',
      amber:'#FBF2BD',
      red:'#EEC5C5'
  },
  tertiary: {
      // Red
      main: '#C67F7F'
  },
  quaternary: {
      // Azure blue
      main: '#1EBAE7'
  },
  quinary: {
      // Deep red
      main: '#290F0F'
  },
  controls: {
      // Grey (Controls)
      main: '#AFAFAF',
      // Dark grey (Menu icons)
      menuIcon: '#6F6F6F',
      // Grey (input field border)
      inputBorder: '#C7C7C7',
      // Lighter grey (Table header background)
      tableHeader: '#EBEBEB',
      // Light Grey (placeholder text)
      placeholder: '#9e9e9e'
  },
  error: {
      main: '#C63C3C'
  }
  },
  spacing: 4,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform:'none'
      }
    },
    MuiInputBase: {
      root: {
        backgroundColor:'white'
      }
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: '#e0e0e0',
      },
      root: {
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: '#b6b6b6'
        },
        "&.Mui-focused $notchedOutline": {
          borderColor: '#6F6F6F',
          borderWidth: 1
        },
        "&.Mui-disabled $notchedOutline": {
          borderColor: '#e0e0e0',
          borderWidth: 1
        }
      },
      focused: {},
      disabled: {},
      error: {},
      inputMarginDense: {
        paddingTop:8,
        paddingBottom:8
      },
      input: {
        "&::placeholder": {
          color: "black",
          opacity:0.6
        },
      }
    },
    MuiFormControl: {
      marginDense: {
        marginTop:4
      }
    },
    MuiTypography: {
      body1: {
        //used as subtitle in block component
          fontSize: 15,
          color: '#383838',
          fontFamily: `${fontFamily}, Regular`,
          fontWeight: 300,
          lineHeight:1.3,
          paddingBottom:2
      },
      body2: {
          fontSize: 15,
          color: '#383838',
          fontFamily: `${fontFamily}, Regular`,
          lineHeight:1.3,
      },
      h1: {
          fontSize: 42,
          color: '#0A0A0A',
          fontFamily: `${fontFamily}, Regular`,
          fontWeight:200,
          lineHeight:1
      },
      h2: {
          fontSize: 30,
          color: '#0A0A0A',
          fontFamily: `${fontFamily}, Regular`,
          fontWeight:200,
          lineHeight:1.5,
          textTransform:'uppercase',
      },
      h3: {
          //used as title in block component (and in appbar)
          fontSize: 22,
          color: '#383838',
          fontFamily: `${fontFamily}, Regular`,
          fontWeight:600,
          lineHeight:1,
          paddingBottom:4
      },
      h4: {
          //breadcrumbs
          fontSize: 22,
          color: '#000000',
          fontFamily: `${fontFamily}, Regular`,
          fontWeight:200,
          lineHeight:1,
          textTransform:'uppercase',
      },
      h5: {
          fontSize: 13,
          color: '#606060',
          fontFamily: `${fontFamily}, Regular`,
          fontWeight: 400
      },
      subtitle1: {
          fontSize: 12,
          color: '#606060',
          lineHeight:1.3,
          fontFamily: `${fontFamily}, Regular`
      },
      subtitle2: {
          fontSize: 14,
          color: '#6F6F6F',
          lineHeight:1.3,
          fontFamily: `${fontFamily}, Regular`
      },
      caption: {
          fontSize: 13,
          color: '#383838',
          lineHeight:1.4,
          fontFamily: `${fontFamily}, Regular`
      }
    },
  },
  typography: {
    useNextVariants: true,
    // fontSize: 16,
    // htmlFontSize: 14,
    color: '#383838',
    fontFamily,
  },
});