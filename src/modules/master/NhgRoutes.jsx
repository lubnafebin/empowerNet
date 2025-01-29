import { Route, Routes } from "react-router-dom";

import { DashboardRoutes } from "../dashboard";
import {
  PageNotFound,
  PermissionProtectedRoute,
  RoleProtectedRoute,
} from "../../shared";
import { ReportRoutes } from "../reports/ReportRoutes";
import { MinuteRoutes } from "../minutes";
import { MembersRoutes } from "../members";

export const NhgRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <RoleProtectedRoute
            roles={["NHG", "President", "Secretary", "ADS"]}
          />
        }
      >
        <Route path="/*" element={<DashboardRoutes />} />

        <Route
          element={<PermissionProtectedRoute permission="member.all.GET" />}
        >
          <Route path="/members/*" element={<MembersRoutes />} />
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
