import { axios } from "../../../utils";

export const signup = async (userData, type) => {
  const endpoint = type === "nhg" ? "/auth/register/nhg" : "/auth/register/cds";
  console.log("Making API call to:", endpoint, "with data:", userData);
  return await axios.post(endpoint, userData);
};

export const login = async (credentials) => {
  return await axios.post("/auth/sign-in", credentials);
};
