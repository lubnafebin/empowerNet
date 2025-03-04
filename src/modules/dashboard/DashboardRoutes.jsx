import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./containers";
import {
  AuthProtectedRoute,
  DashboardLayout,
  PageNotFound,
  RoleProtectedRoute,
} from "../../shared";
import { PageManageProfile } from "../auth/containers";
import { PageMyPassbook } from "../members/containers";

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <AuthProtectedRoute>
            <DashboardLayout />
          </AuthProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="/profile" element={<PageManageProfile />} />
        <Route
          element={
            <RoleProtectedRoute
              roles={["Member", "ADS", "President", "Secretary"]}
            />
          }
        >
          <Route path="/passbook" element={<PageMyPassbook />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
