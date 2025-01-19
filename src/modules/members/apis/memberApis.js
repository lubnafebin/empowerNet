import { API } from "../../../utils";
const contentTypeFormData = {
  headers: { "Content-Type": "multipart/form-data" },
};

export const getMemberDetailsApi = async (wardId) => {
  const response = await API.get(`cds/ward/${wardId}`);
  return response.data;
};

export const getMemberListApi = async () => {
  const response = await API.get("nhg/member/all");
  return response.data;
};

export const createMemberApi = async (params) => {
  const response = await API.post(
    "nhg/member/create",
    params,
    contentTypeFormData,
  );
  return response.data;
};

export const updateMemberApi = async ({ params, wardId }) => {
  const response = await API.put(`cds/ward/${wardId}/update`, params);
  return response.data;
};

export const deleteMemberApi = async ({ wardId }) => {
  const response = await API.delete(`cds/ward/${wardId}/delete`);
  return response.data;
};
