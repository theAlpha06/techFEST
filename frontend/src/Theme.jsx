import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    primary:{
        main: "rgb(20,25,16)"
    },
    // secondary:{
    //     main:grey[700]
    // },
    light:{
      main:"#2de230"
    },
    // grey:{
    //   main:grey[500]
    // }
  },
  breakpoints: {
    values: {
      xs: 300,
      sm: 450,
      md: 770,
      lg: 1024,
      xl:1350,
    }
  }
});

function Theme({children}) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default Theme;
