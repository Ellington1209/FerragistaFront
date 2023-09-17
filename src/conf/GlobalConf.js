import Axios from "axios";
import { getToken } from "../utils/AuthHelp";


export const rootUrl = "http://127.0.0.1:8000/";
//export const rootUrl = `https://${window.location.hostname}:443/`;

export const Http = Axios.create({
  baseURL: rootUrl,
});

Http.interceptors.request.use(async (config) => {
  const token = getToken();
 // config.headers["Content-Type"]= 'application/json'
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



//"Content-Type": "multipart/form-data" 