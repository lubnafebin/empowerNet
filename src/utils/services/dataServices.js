import { API, PUBLIC_API } from "../api";

export const getCdsListApi = async () => {
  const response = await PUBLIC_API.get(`data/cds`);
  return response.data;
};

export const getWardListApi = async ({ cdsId }) => {
  const response = await PUBLIC_API.get(`data/${cdsId}/wards`);
  return response.data;
};

export const getDistrictsByStateIdApi = async ({ stateId = 1 }) => {
  const response = await PUBLIC_API.get(`data/${stateId}/districts`);
  return response.data;
};

export const getAllNhgMembersApi = async (nhgId) => {
  const response = await API.get(`data/${nhgId}/members`);
  return response.data;
};
