import { createTheme } from "@mui/material";
import { indigo } from "@mui/material/colors";

const Ligth = createTheme({
    palette: {
        primary: {
            main: indigo[500],
            light: indigo[200],
            dark: indigo[900],
            contrastText: '#fff'
        }    
    },
})

export default Ligth;