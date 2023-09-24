import { createTheme } from "@mui/material";
import { indigo, grey, red } from "@mui/material/colors";


const Ligth = createTheme({
    palette: {
        primary: {
            main: indigo[500],
            light: indigo[200],
            dark: indigo[900],
            contrastText: '#fff'
        },
        secondary:{
            main: grey[500],
            light: grey[200],
            dark: grey[900],
            contrastText: '#fff'
        }
    },
    typography: {
        fontFamily: "'Roboto', sans-serif",
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 600,
        fontWeightBold: 700,
        fontSize: 16,
       
        h1: {
          fontWeight: 700,
          fontSize: '48px !important',
           color:grey[800]
        },
        h2: {
          fontWeight: 600,
          fontSize: '2rem',
           color:grey[700]
        },
        h3: {
          fontWeight: 600,
          fontSize: '2rem',
           color:grey[700]
        },
        h4: {
          fontWeight: 600,
          fontSize: '1.6rem',
           color:grey[700]
        },
        h5: {
          fontWeight: 400,
          fontSize: '1.4rem',
          color:grey[700]
        },
        h6: {
          fontWeight: 500,
          fontSize: '2.2rem',
           color:grey[700]
        },
        body1: {
          fontWeight: 400,
          fontSize: '1.6rem',
          color:grey[700]
        },
        body2: {
          fontWeight: 400,
          fontSize: '1.4rem',
           color:grey[200]
        },
        caption: {
          fontWeight: 400,
          fontSize: '1.2rem',
           color:grey[200]
        },
        subtitle1: {
          fontWeight: 200,
          fontSize: '1.6rem',
           color:grey[200]
        },
        subtitle2: {
          fontWeight: 200,
          fontSize: '1.2rem',
           color:red[500]
        },

      },
})

export default Ligth;