import { axios } from "../../../utils";

//member api

export const createMember = async (memberData) => {
  return await axios.post("nhg/member/create", memberData, {
    headers: {
      "Content-Type": "multipart/form-data", // Ensure this header is used for file uploads
    },
  });
};

export const getNhgMembers = async () => {
  return await axios.get("nhg/member/all");
};

export const updateMember = async (memberId, memberData) => {
  return await axios.put(`nhg/member/${memberId}/update`, memberData);
};

export const viewMemberDetails = async (memberId) => {
  return await axios.get(`nhg/member/${memberId}/details`);
};

//role api

export const deleteRole = async (roleId) => {
  return await axios.delete(`nhg/role/${roleId}/delete`);
};

//meeting minutes api

export const createMeeting = async (meetingData) => {
  return await axios.post("nhg/meeting/create", meetingData);
};

export const getAllMeetings = async () => {
  return await axios.get("nhg/meeting/all");
};

//meeting agenda api
export const getMeetingAgendas = async (meetingId) => {
  return await axios.get(`nhg/meeting/${meetingId}/agendas`);
};
