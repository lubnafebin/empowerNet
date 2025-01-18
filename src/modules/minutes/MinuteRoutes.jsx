import { Route, Routes } from "react-router-dom";
import { MinuteList } from "./containers";
import {
  AuthProtectedRoute,
  DashboardLayout,
  PageNotFound,
} from "../../shared";

export const MinuteRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <AuthProtectedRoute>
            <DashboardLayout />
          </AuthProtectedRoute>
        }
      >
        <Route index element={<MinuteList />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
