import { Route, Routes } from "react-router-dom";

import { PageNotFound, RoleProtectedRoute } from "../../shared";
import { DashboardRoutes } from "../dashboard";

export const MemberRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <RoleProtectedRoute
            roles={["Member", "ADS", "President", "Secretary"]}
          />
        }
      >
        <Route path="/*" element={<DashboardRoutes />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
