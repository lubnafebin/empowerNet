import { API } from "../../../utils";

export const getWardDetailsApi = async (wardId) => {
  const response = await API.get(`cds/ward/${wardId}`);
  return response.data;
};

export const getMinuteListApi = async () => {
  const response = await API.get("nhg/meeting/all");
  return response.data;
};

export const createWardApi = async (params) => {
  const response = await API.post("cds/ward/create", params);
  return response.data;
};

export const updateWardApi = async ({ params, wardId }) => {
  const response = await API.put(`cds/ward/${wardId}/update`, params);
  return response.data;
};

export const deleteWardApi = async ({ wardId }) => {
  const response = await API.delete(`cds/ward/${wardId}/delete`);
  return response.data;
};
