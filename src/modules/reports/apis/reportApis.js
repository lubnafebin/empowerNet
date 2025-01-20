import { API } from "../../../utils";

export const generateReportApi = async (params) => {
  const response = await API.get("nhg/report/generate", {
    params,
    responseType: "blob",
  });
  return response;
};
