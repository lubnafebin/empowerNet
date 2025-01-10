import { axios } from "../../../utils";

export const createWard = async (wardData) => {
  return await axios.post("cds/ward/create", {
    ...wardData,
  });
};

export const getWards = async ({ page, limit }) => {
  return await axios.get(`/cds/wards?page=${page}&limit=${limit}`);
};

export const updateWard = async (wardId, wardData) => {
  return await axios.put(`cds/ward/${wardId}/update`, wardData);
};

export const deleteWard = async (wardId) => {
  return await axios.delete(`cds/ward/${wardId}/delete`);
};
