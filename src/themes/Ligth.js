import { createTheme } from "@mui/material";
import { indigo, grey } from "@mui/material/colors";


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
})

export default Ligth;