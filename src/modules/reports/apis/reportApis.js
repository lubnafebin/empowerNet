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

export const getAllReportsApi = async () => {
  const response = await API.get("nhg/report/all");
  return response.data;
};
