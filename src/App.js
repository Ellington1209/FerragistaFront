import { ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from './routers/router';
import { Provider } from "react-redux";




import Light from "./themes/Ligth";
import store from "./store/reducers/store";
import { Loading, Notify } from "./components";



const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={Light}>
      <Loading />
      <Notify />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>

)
export default App;