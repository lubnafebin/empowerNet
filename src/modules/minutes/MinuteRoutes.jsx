import { Route, Routes } from "react-router-dom";
import {
  ManageAgenda,
  MeetingAgendas,
  MinuteList,
  MinutePreview,
  Transactions,
} from "./containers";
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

        <Route path="/:meetingId/agendas">
          <Route index element={<MeetingAgendas />} />
          <Route path="preview" element={<MinutePreview />} />
          <Route path=":agendaId/agenda" element={<ManageAgenda />} />
        </Route>
        <Route path="/:meetingId/transactions" element={<Transactions />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
