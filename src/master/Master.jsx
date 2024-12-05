import { Route, Routes } from "react-router-dom";
import { AuthenticationRoutes } from "../modules/auth";
import { CdsRoutes } from "../modules/cds"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Theme } from "../utils";
import { DashboardLayout } from "../shared";

export const Master = () => {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Routes>
        <Route path="/*" element={<AuthenticationRoutes />} />
        <Route path="/cds/*" element={
          <DashboardLayout>
            <CdsRoutes />
          </DashboardLayout>
        }
        />
      </Routes>
    </ThemeProvider>

  );
};
