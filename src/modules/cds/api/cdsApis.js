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
  try {
    const response = await axios.put(`/ward/update/${wardId}`, wardData);
    return response.data;
  } catch (error) {
    throw new Error("Error updating ward: " + error.message);
  }
};

export const deleteWard = async (wardId) => {
  return await axios.delete(`cds/ward/${wardId}/delete`);
};
