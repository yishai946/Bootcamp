import { createTheme } from '@mui/material/styles';

const LightTheme = createTheme({
  palette: {
    primary: {
      main: '#057c59',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
      contrastText: '#057c59',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e1e1e',
      secondary: '#616161',
    },
    divider: '#e0e0e0',
  },
  typography: {
    fontFamily: `'Roboto', 'Helvetica', 'Arial', sans-serif`,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        padding: 0,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
});

export default LightTheme;
