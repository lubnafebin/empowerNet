import { Route, Routes } from "react-router-dom";

import { WardRoutes } from "../wards";
import { Dashboard, DashboardRoutes } from "../dashboard";
import {
  AuthProtectedRoute,
  DashboardLayout,
  PageNotFound,
  PermissionProtectedRoute,
  RoleProtectedRoute,
} from "../../shared";
import { AllReports, ReportDetails } from "../reports/containers";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <AuthProtectedRoute>
            <DashboardLayout />
          </AuthProtectedRoute>
        }
      >
        <Route element={<RoleProtectedRoute roles={["CDS"]} />}>
          <Route index element={<Dashboard />} />

          <Route
            element={<PermissionProtectedRoute permission="ward.all.GET" />}
          >
            <Route path="/wards/*" element={<WardRoutes />} />
          </Route>
          <Route path="/report/all">
            <Route index element={<AllReports />} />
            <Route path=":reportId" element={<ReportDetails />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
