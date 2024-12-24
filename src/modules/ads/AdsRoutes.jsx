import { Routes, Route } from "react-router-dom";
import { NhgList, PageMonthlyReport, RequestTable } from "./containers";
import { MembersList } from "./containers";
import { PageReports } from "../nhg/containers";

export const AdsRoutes = () => {
  return (
    <Routes>
      <Route path="/nhg/list" element={<NhgList />} />
      <Route path="/nhg/memberlist" element={<MembersList />} />
      <Route path="/nhg/requests" element={<RequestTable />} />
      <Route path="/nhg/monthly/report" element={<PageMonthlyReport />} />
      <Route path="/nhg/reports" element={<PageReports />} />
    </Routes>
  );
};
