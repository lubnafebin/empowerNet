import { Route, Routes } from "react-router-dom";
import {
  AuthProtectedRoute,
  DashboardLayout,
  PageNotFound,
} from "../../shared";
import { ReportDetails, ReportList } from "./containers";

export const ReportRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <AuthProtectedRoute>
            <DashboardLayout />
          </AuthProtectedRoute>
        }
      >
        <Route index element={<ReportList />} />
        <Route path="/:reportId">
          <Route index element={<ReportDetails />} />
          {/* <Route path=":agendaId/agenda" element={<MeetingAgendas />} /> */}
        </Route>
        {/* <Route path="/:meetingId/transactions" element={<Transactions />} /> */}
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
