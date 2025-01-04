import axiosInstance from "axios";
import { BASE_URL } from "../../configs";
export const axios = axiosInstance.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoibmlsYXZ1a3VkdW1iYXNocmVlQGdtYWlsLmNvbSIsInJvbGVJZCI6MiwiaWF0IjoxNzM1OTg0ODE0LCJleHAiOjE3MzY0MTY4MTR9.HjR53VEDMCqia53MeEZqhU8TOoPIS9EBRyaR5AlMuC4`,
    Accept: "application/json",
  },
});
