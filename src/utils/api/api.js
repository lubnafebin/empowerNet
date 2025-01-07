import axiosInstance from "axios";
import { BASE_URL } from "../../configs";
export const axios = axiosInstance.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
axios.interceptors.request.use(
  (config) => {
    const authDetails = localStorage.getItem("authDetails");
    if (authDetails) {
      const parsedAuthDetails = JSON.parse(authDetails);
      config.headers.Authorization = `Bearer ${parsedAuthDetails.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
