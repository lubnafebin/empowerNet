import { Route, Routes } from "react-router-dom";

import { DashboardRoutes } from "../dashboard";
import { PageNotFound, RoleProtectedRoute } from "../../shared";

export const AdsRoutes = () => {
  return (
    <Routes>
      <Route element={<RoleProtectedRoute roles={["ADS"]} />}>
        <Route index element={<DashboardRoutes />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
