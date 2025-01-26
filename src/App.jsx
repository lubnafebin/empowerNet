import { CssBaseline, ThemeProvider } from "@mui/material";
import {
  AlertComponent,
  DarkTheme,
  LightTheme,
  RedirectRoute,
  SnackbarComponent,
  useAppStateContext,
} from "./shared";
import { Route, Routes } from "react-router-dom";
import {
  AdminRoutes,
  AdsRoutes,
  AuthenticationRoutes,
  MemberRoutes,
  NhgRoutes,
} from "./modules";

export const App = () => {
  const { appState } = useAppStateContext();
  const theme = appState.theme === "dark" ? DarkTheme : LightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarComponent>
        <Routes>
          <Route element={<RedirectRoute />}>
            <Route path="/*" element={<MemberRoutes />} />
            <Route path="/nhg/*" element={<NhgRoutes />} />
            <Route path="/auth/*" element={<AuthenticationRoutes />} />
            <Route path="/cds/*" element={<AdminRoutes />} />
            <Route path="/ads/*" element={<AdsRoutes />} />
          </Route>
        </Routes>
        <AlertComponent />
      </SnackbarComponent>
    </ThemeProvider>
  );
};
