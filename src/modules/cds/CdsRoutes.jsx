import { Routes, Route } from "react-router-dom";
import {
  PageWards,
  CreateWards,
  UpdateWards,
  AdsList,
  PageCdsMonthlyReports,
} from "./containers";
import { PageReports } from "../nhg/containers";
export const CdsRoutes = () => {
  return (
    <Routes>
      <Route path="/wards" element={<PageWards />} />
      <Route path="/create" element={<CreateWards />} />
      <Route path="/update" element={<UpdateWards />} />
      <Route path="/ads" element={<AdsList />} />
      <Route path="/monthly/report" element={<PageCdsMonthlyReports />} />
      <Route path="/reports" element={<PageReports />} />
    </Routes>
  );
};
