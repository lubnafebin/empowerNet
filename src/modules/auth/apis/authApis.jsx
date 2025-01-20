import { AUTH_API } from "../../../utils";

export const doSignUpApi = async (data, accountType) => {
  const response = await AUTH_API.post(`register/${accountType}`, data);
  return response.data;
};

export const doSignInApi = async (data) => {
  const response = await AUTH_API.post(`sign-in`, data);
  return response.data;
};
