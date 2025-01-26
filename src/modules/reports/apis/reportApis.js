import { API } from "../../../utils";

const contentTypeFormData = {
  headers: { "Content-Type": "multipart/form-data" },
};

export const generateReportApi = async (params) => {
  const response = await API.get("nhg/report/generate", {
    params,
    responseType: "blob",
  });
  return response;
};

export const createNewReportSummaryApi = async (formData) => {
  const response = await API.post(
    "nhg/report/upload",
    formData,
    contentTypeFormData,
  );
  return response;
};

export const getAllReportsApi = async (nhgId) => {
  const response = await API.get("nhg/report/all", { params: { nhgId } });
  return response.data;
};

export const deleteReportApi = async (reportId) => {
  const response = await API.delete(`nhg/report/${reportId}/delete`);
  return response.data;
};

export const getReportDetailsApi = async (reportId) => {
  const response = await API.get(`nhg/report/${reportId}`);
  return response.data;
};

export const generateConsolidateReportApi = async (params) => {
  const response = await API.get("nhg/report/consolidate/generate", {
    params,
    responseType: "blob",
  });
  return response;
};

export const uploadConsolidateReportApi = async (formData) => {
  const response = await API.put(
    "nhg/report/consolidate/upload",
    formData,
    contentTypeFormData,
  );
  return response.data;
};
