import { axios } from "../api";

export const getCds = async () => {
  return await axios.get("data/cds");
};

export const getWardsApi = async (cdsId) => {
  return await axios.get(`data/${cdsId}/wards`);
};

export const getDistrict = async () => {
  return await axios.get(`data/districts`);
};
