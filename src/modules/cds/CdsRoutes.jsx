import { Routes, Route } from "react-router-dom";
import { PageWards, AdsList, PageCdsMonthlyReports, Roles } from "./containers";
import { PageReports } from "../nhg/containers";
export const CdsRoutes = () => {
  return (
    <Routes>
      <Route path="/wards" element={<PageWards />} />
      <Route path="/ads" element={<AdsList />} />
      <Route path="/roles" element={<Roles />} />
      <Route path="/monthly/report" element={<PageCdsMonthlyReports />} />
      <Route path="/reports" element={<PageReports />} />
    </Routes>
  );
};
