import { API } from "../../../utils";
const contentTypeFormData = {
  headers: { "Content-Type": "multipart/form-data" },
};

export const getMemberDetailsApi = async (memberId) => {
  const response = await API.get(`nhg/member/${memberId}/details`);
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

export const updateMemberApi = async ({ params, memberId }) => {
  const response = await API.put(
    `nhg/member/${memberId}/update`,
    params,
    contentTypeFormData,
  );
  return response.data;
};

export const deleteMemberApi = async ({ memberId }) => {
  const response = await API.delete(`cds/ward/${memberId}/delete`);
  return response.data;
};
