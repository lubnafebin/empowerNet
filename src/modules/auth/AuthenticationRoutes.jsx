import { Routes, Route } from "react-router-dom";
import { PageLogin, PageSignUp } from "./containers";

export const AuthenticationRoutes = () => {
  return (
    <Routes>
      <Route index element={<PageLogin />} />
      <Route path="/register/*" element={<PageSignUp />} />
    </Routes>
  );
};
