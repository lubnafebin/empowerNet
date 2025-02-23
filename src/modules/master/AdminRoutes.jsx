import { Route, Routes } from "react-router-dom";

import { WardRoutes } from "../wards";
import { Dashboard } from "../dashboard";
import {
  AuthProtectedRoute,
  DashboardLayout,
  PageNotFound,
  PermissionProtectedRoute,
  RoleProtectedRoute,
} from "../../shared";
import { AllReports, ReportDetails } from "../reports/containers";
import { PageManageProfile } from "../auth";

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
          <Route path="/profile" element={<PageManageProfile />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
