import axios from "axios";
import { getToken } from "../auth";

export const BASE_URL = "http://localhost:7989/api";

export const myAxios = axios.create({
  baseURL: BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

privateAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    console.log(token);

    if (token) {
     // console.log(config);
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
