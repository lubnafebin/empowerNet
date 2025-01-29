import { Route, Routes } from "react-router-dom";
import { MemberList } from "./containers";
import {
  AuthProtectedRoute,
  DashboardLayout,
  PageNotFound,
} from "../../shared";

export const MembersRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <AuthProtectedRoute>
            <DashboardLayout />
          </AuthProtectedRoute>
        }
      >
        <Route index element={<MemberList />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
