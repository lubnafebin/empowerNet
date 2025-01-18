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

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<RoleProtectedRoute roles={["CDS", "NHG"]} />}>
        <Route path="/*" element={<DashboardRoutes />} />
      </Route>

      <Route element={<RoleProtectedRoute roles={["CDS"]} />}>
        <Route element={<PermissionProtectedRoute permission="user.read" />}>
          <Route path="/wards/*" element={<WardRoutes />} />
        </Route>
      </Route>

      <Route element={<RoleProtectedRoute roles={["NHG"]} />}>
        <Route element={<PermissionProtectedRoute permission="members.read" />}>
          <Route path="/members/*" element={<MemberRoutes />} />
        </Route>
        <Route element={<PermissionProtectedRoute permission="members.read" />}>
          <Route path="/minutes/*" element={<MinuteRoutes />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
