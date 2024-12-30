import { Route, Routes } from "react-router-dom";
import { AuthenticationRoutes } from "../modules/auth";
import { CdsRoutes } from "../modules/cds";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Theme } from "../utils";
import {
  AlertComponent,
  AlertContextProvider,
  DashboardLayout,
} from "../shared";
import { AdsRoutes } from "../modules/ads";
import { NhgRoutes } from "../modules/nhg/NhgRoutes";

export const Master = () => {
  return (
    <ThemeProvider theme={Theme}>
      <AlertContextProvider>
        <CssBaseline />
        <Routes>
          <Route path="/*" element={<AuthenticationRoutes />} />
          <Route
            path="/cds/*"
            element={
              <DashboardLayout>
                <CdsRoutes />
              </DashboardLayout>
            }
          />
          <Route
            path="/ads/*"
            element={
              <DashboardLayout>
                <AdsRoutes />
              </DashboardLayout>
            }
          />
          <Route
            path="/nhg/*"
            element={
              <DashboardLayout>
                <NhgRoutes />
              </DashboardLayout>
            }
          />
        </Routes>
        <AlertComponent />
      </AlertContextProvider>
    </ThemeProvider>
  );
};
