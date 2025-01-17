import { Routes, Route } from "react-router-dom";
import { PageLogin, PageSignUp } from "./containers";

export const AuthenticationRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<PageLogin />} />
      <Route path="/register/:accountType/*" element={<PageSignUp />} />
    </Routes>
  );
};
