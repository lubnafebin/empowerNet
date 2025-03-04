import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./containers";
import {
  AuthProtectedRoute,
  DashboardLayout,
  PageNotFound,
} from "../../shared";
import { PageManageProfile } from "../auth/containers";

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
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
