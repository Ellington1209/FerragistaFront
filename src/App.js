import  Light  from "./themes/Ligth";
import { Button, TextField, ThemeProvider } from "@mui/material";


const App = () => (
  <ThemeProvider theme={Light}>   
    <Button >aqui</Button>
    <TextField fullWidth> nome</TextField>
  </ThemeProvider>
 
)
export default App;