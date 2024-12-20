import { Route, Routes } from "react-router-dom";
import { AuthenticationRoutes } from "../modules/auth";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Theme } from "../utils";

export const Master = () => {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Routes>
        <Route path="/*" element={<AuthenticationRoutes />} />
      </Routes>
    </ThemeProvider>
  );
};
