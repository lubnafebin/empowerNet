import { Route, Routes } from "react-router-dom";
import { NhgList, WardList } from "./containers";
import {
  AuthProtectedRoute,
  DashboardLayout,
  PageNotFound,
} from "../../shared";
import { MemberList } from "../members";

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
        <Route path=":wardId/nhgs" element={<NhgList />} />
        <Route path=":wardId/nhgs/:nhgId/members" element={<MemberList />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
