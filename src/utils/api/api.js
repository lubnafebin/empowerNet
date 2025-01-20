import axios from "axios";
import { BASE_URL } from "../../configs";
import { getAuthDetailsServices } from "../services";
// import { clearAppLocalStorage } from '../services';

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const PUBLIC_API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const AUTH_API = axios.create({
  baseURL: BASE_URL + "auth/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const authDetails = getAuthDetailsServices();

    if (authDetails?.accessToken) {
      config.headers["Authorization"] = "Bearer " + authDetails.accessToken;
    }

    if (authDetails?.role?.id) {
      config.headers["Current-Role"] = authDetails.role.id;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      //   clearAppLocalStorage();
      //   window.location.href = '/';
    }
    return Promise.reject(error);
  },
);
