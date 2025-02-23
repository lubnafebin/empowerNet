import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./containers";
import {
  AuthProtectedRoute,
  DashboardLayout,
  PageNotFound,
} from "../../shared";

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
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
