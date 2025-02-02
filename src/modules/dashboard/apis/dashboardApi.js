import { API } from "../../../utils";
export const getDashboardAnalyticsApi = async (params) => {
  const response = await API.get("/data/dashboard/details", { params });
  return response.data;
};
