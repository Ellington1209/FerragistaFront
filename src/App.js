import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from './routers/router';
import { Provider } from "react-redux";




import Light from "./themes/Ligth";
import store from "./store/reducers/store";
import { Loading } from "./components/Loading";



const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={Light}>
      <Loading/>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>

)
export default App;