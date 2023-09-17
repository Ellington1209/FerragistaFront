import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from './routers/router';
import { Provider } from "react-redux";
import GlobalStyles from "./themes/Global"
import './utils/TraducoesYup'




import Light from "./themes/Ligth";
import store from "./store/reducers/store";
import { Loading, Notify, Alert } from "./components";



const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={Light}>

      <GlobalStyles />
      <Loading />
      <Notify />
      <Alert />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>

)
export default App;