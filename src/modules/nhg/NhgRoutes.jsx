import { Routes, Route } from "react-router-dom";
import { MembersList, MonthlyReports, Roles } from "./containers";
import { MeetingMinutes } from "./containers";
import { MeetingAgendas } from "./containers";
import { DepositsandRefund } from "./containers";
import { MembershipFee } from "./containers";

export const NhgRoutes = () => {
  return (
    <Routes>
      <Route path="/members/list" element={<MembersList />} />
      <Route path="/roles" element={<Roles />} />
      <Route path="/minutes" element={<MeetingMinutes />} />
      <Route path="/Agendas" element={<MeetingAgendas />} />
      <Route path="/deposit" element={<DepositsandRefund />} />
      <Route path="/membership" element={<MembershipFee />} />
      <Route path="/Reports" element={<MonthlyReports />} />
    </Routes>
  );
};
