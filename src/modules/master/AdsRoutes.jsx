import { Route, Routes } from "react-router-dom";

import { Dashboard } from "../dashboard";
import {
  AuthProtectedRoute,
  DashboardLayout,
  PageNotFound,
  PermissionProtectedRoute,
  RoleProtectedRoute,
} from "../../shared";
import { NhgList, NhgOverview } from "../wards/containers";
import { AllReports } from "../reports/containers";
import { AllMembers } from "../members/containers";

export const AdsRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <AuthProtectedRoute>
            <DashboardLayout />
          </AuthProtectedRoute>
        }
      >
        <Route element={<RoleProtectedRoute roles={["ADS"]} />}>
          <Route index element={<Dashboard />} />
          <Route
            element={<PermissionProtectedRoute permission="member.all.GET" />}
          >
            <Route path="/report/all" element={<AllReports />} />
            <Route path="/member/all" element={<AllMembers />} />
            <Route path="/nhgs">
              <Route index element={<NhgList roleType="ads" />} />
              <Route path=":nhgId/overview" element={<NhgOverview />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
