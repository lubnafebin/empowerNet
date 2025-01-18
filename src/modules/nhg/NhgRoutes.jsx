import { Routes, Route } from "react-router-dom";
import {
  DepositsAndRefund,
  MeetingAgendas,
  MeetingMinutes,
  MembershipFee,
  MembersList,
  PageNhgMonthlyReports,
  PageReports,
  Roles,
} from "./containers";

export const NhgRoutes = () => {
  return (
    <Routes>
      <Route path="/members/list" element={<MembersList />} />
      <Route path="/roles" element={<Roles />} />
      <Route path="/minutes" element={<MeetingMinutes />} />
      <Route path="/agendas:meetingId" element={<MeetingAgendas />} />
      <Route path="/deposit" element={<DepositsAndRefund />} />
      <Route path="/membership" element={<MembershipFee />} />
      <Route path="/monthly/reports" element={<PageNhgMonthlyReports />} />
      <Route path="/reports" element={<PageReports />} />
    </Routes>
  );
};
