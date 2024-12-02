import { Routes, Route } from "react-router-dom";
import { PageLogin, PageSignUp } from "./containers";

export const AuthenticationRoutes = () => {
  return (
    <Routes>
      <Route index element={<PageLogin />} />
      <Route path="/signup/cds/*" element={<PageSignUp loginType="cds"/>} />
      <Route path="/signup/nhg/*" element={<PageSignUp loginType="nhg"/>} />
    </Routes>
  );
};
