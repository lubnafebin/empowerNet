import { PUBLIC_API } from "../api";

export const getCdsListApi = async () => {
  const response = await PUBLIC_API.get(`data/cds`);
  return response.data;
};

export const getWardListApi = async ({ cdsId }) => {
  const response = await PUBLIC_API.get(`data/${cdsId}/wards`);
  return response.data;
};
