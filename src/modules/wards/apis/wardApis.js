import { API } from "../../../utils";

export const getWardDetailsApi = async (wardId) => {
  const response = await API.get(`cds/ward/${wardId}`);
  return response.data;
};

export const getWardListApi = async () => {
  const response = await API.get("cds/wards");
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

export const getWardNhgListApi = async (wardId) => {
  const response = await API.get("ward/nhg/all", { params: { wardId } });
  return response.data;
};
