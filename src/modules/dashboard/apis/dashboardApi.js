import { API } from '../../../utils';
export const getDashboardAnalyticsApi = async ({ profituneId }) => {
  return await API.get(
    profituneId ? `/Home/BIP/${profituneId}` : '/Home/Admin',
  );
};
