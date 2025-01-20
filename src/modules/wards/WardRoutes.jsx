import { Route, Routes } from "react-router-dom";
import { WardList } from "./containers";
import {
  AuthProtectedRoute,
  DashboardLayout,
  PageNotFound,
} from "../../shared";

export const WardRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <AuthProtectedRoute>
            <DashboardLayout />
          </AuthProtectedRoute>
        }
      >
        <Route index element={<WardList />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
