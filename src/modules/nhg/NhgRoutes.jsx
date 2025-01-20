import { Routes, Route } from "react-router-dom";
import {
  DepositsAndRefund,
  MeetingAgendas,
  MeetingMinutes,
  MembershipFee,
  MembersList,
  PageNhgMonthlyReports,
  PageReports,
} from "./containers";

export const NhgRoutes = () => {
  return (
    <Routes>
      <Route path="/members/list" element={<MembersList />} />
      <Route path="/minutes" element={<MeetingMinutes />} />
      <Route path="/meeting:meetingId/agendas" element={<MeetingAgendas />} />
      <Route path="/deposit" element={<DepositsAndRefund />} />
      <Route path="/membership" element={<MembershipFee />} />
      <Route path="/monthly/reports" element={<PageNhgMonthlyReports />} />
      <Route path="/reports" element={<PageReports />} />
    </Routes>
  );
};
