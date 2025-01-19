import { API } from "../../../utils";

export const getMinuteDetailsApi = async (wardId) => {
  const response = await API.get(`cds/ward/${wardId}`);
  return response.data;
};

export const getMinuteListApi = async () => {
  const response = await API.get("nhg/meeting/all");
  return response.data;
};

export const createMinuteApi = async (params) => {
  const response = await API.post("nhg/meeting/create", params);
  return response.data;
};

export const updateMinuteApi = async ({ params, wardId }) => {
  const response = await API.put(`cds/ward/${wardId}/update`, params);
  return response.data;
};

export const deleteMinuteApi = async ({ wardId }) => {
  const response = await API.delete(`cds/ward/${wardId}/delete`);
  return response.data;
};

// Agenda
export const getMeetingAgendaListApi = async (meetingId) => {
  const response = await API.get(`nhg/meeting/${meetingId}/agendas`);
  return response.data;
};

// Transactions
export const getMeetingTransactionListApi = async (meetingId) => {
  const response = await API.get(`nhg/meeting/${meetingId}/transactions`);
  return response.data;
};

export const deleteAgendaApi = async () => {};
export const getAgendaDetailsApi = async () => {};
export const updateAgendaApi = async () => {};

export const deleteTransactionApi = async () => {};
export const getTransactionDetailsApi = async () => {};
export const updateTransactionApi = async () => {};
