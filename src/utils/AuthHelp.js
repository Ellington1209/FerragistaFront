export const TOKEN_KEY = "access_token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
// export const loginSetToken = token => {
//   localStorage.setItem(TOKEN_KEY, token);
// };
export const logoutRemoveToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};