import { Route, Routes } from "react-router-dom";

import { WardRoutes } from "../wards";
import { DashboardRoutes } from "../dashboard";
import {
  PageNotFound,
  PermissionProtectedRoute,
  RoleProtectedRoute,
} from "../../shared";
import { MemberRoutes } from "../members";
import { MinuteRoutes } from "../minutes";
import { ReportRoutes } from "../reports/ReportRoutes";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<RoleProtectedRoute roles={["CDS", "NHG"]} />}>
        <Route path="/*" element={<DashboardRoutes />} />
      </Route>

      <Route element={<RoleProtectedRoute roles={["CDS"]} />}>
        <Route element={<PermissionProtectedRoute permission="ward.all.GET" />}>
          <Route path="/wards/*" element={<WardRoutes />} />
        </Route>
      </Route>

      <Route element={<RoleProtectedRoute roles={["NHG"]} />}>
        <Route
          element={<PermissionProtectedRoute permission="member.all.GET" />}
        >
          <Route path="/members/*" element={<MemberRoutes />} />
        </Route>
        <Route
          element={<PermissionProtectedRoute permission="meeting.all.GET" />}
        >
          <Route path="/minutes/*" element={<MinuteRoutes />} />
        </Route>
        <Route
          element={<PermissionProtectedRoute permission="report.all.GET" />}
        >
          <Route path="/reports/*" element={<ReportRoutes />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
