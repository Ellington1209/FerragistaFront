import { Http } from "../../conf/GlobalConf";
import { changeloading } from "./loading.action";
import { changeNotify } from './notify.actions';

export const actionTypes = {
  GET_TOKEN: "GET_TOKEN",
  LOGOUT: "LOGOUT",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  CHANGE: "CHANGE",
};

export const getToken = (token) => ({
  type: actionTypes.GET_TOKEN,
  token,
});
export const removeToken = () => ({
  type: actionTypes.LOGOUT,
});
export const loginSuccess = (bool) => ({
  type: actionTypes.SUCCESS,
  bool,
});
export const loginError = (error) => ({
  type: actionTypes.ERROR,
  error,
});
export const changeValue = (payload) => ({
  type: actionTypes.CHANGE,
  payload,
});
export const loading = (bool, msg = null) => ({
  type: actionTypes.LOADING,
  isLoading: {
    active: bool,
    msg: msg,
  },
});
export const getUserToken = () => (dispatch) => {
  dispatch(loading(true));
  const token = localStorage.getItem("access_token");
  dispatch(loading(false));
  if (token) {
    dispatch(getToken(token));
  }
};
export const showWelcomeMessage = () => {
  return {
    type: "SHOW_WELCOME_MESSAGE",
    message: "Bem-vindo!",
  };
};

export const setUserToken = (token) => (dispatch) => {
  localStorage.setItem("access_token", token);
  dispatch(loading(false));
  dispatch(loginSuccess(true));
};
export const login = (credentials) => {
 
  return (dispatch) => {
    dispatch(
      changeloading({
        open: true,
        msg: "Autenticando usuario...",
      })
    );
    return Http.post("/oauth/token", {
      grant_type: "password",
      client_id: "2",
      client_secret: "3aQZdrYi3kfWrNwRbhFLfc4WeK0dD1WDLGpRvZw9",
      username: credentials.username,
      password: credentials.password,
    }).then((res) => {
     
      dispatch(
        changeloading({
          open: false,
          msg: "",
        })
      );

      if (typeof res !== "undefined") {
        dispatch(setUserToken(res.data.access_token));
      }
    })
    .catch((error) => {
      dispatch(changeloading({ open: false }));
      if (typeof error.response !== "undefined") {
        if (error.response.status === 401 || error.response.status === 400 ) {
          dispatch(
            changeNotify({
              open: true,
              class: "error",
              msg: "E-mail ou senha incorretos",
            })
          );
        }
      } else {
        dispatch(
          changeNotify({
            open: true,
            class: "error",
            msg: "Error ao se conectar ao servidor ",
          })
        );
      }
    });
  };
};