import { API, AUTH_API } from "../../../utils";

export const doSignUpApi = async (data, accountType) => {
  const response = await AUTH_API.post(`register/${accountType}`, data);
  return response.data;
};

export const doSignInApi = async (data) => {
  const response = await AUTH_API.post(`sign-in`, data);
  return response.data;
};

/**
 * Updates the user's password.
 *
 * @param {Object} params - The parameters for updating the password.
 * @param {string} params.currentPassword - The current password of the user.
 * @param {string} params.newPassword - The new password to be set.
 * @returns {Promise<Object>} The response from the API.
 */
export const updatePasswordApi = async (params) => {
  return await API.put("/password/update", params);
};
