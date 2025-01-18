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
import { AdminRoutes, AuthenticationRoutes } from "./modules";

export const App = () => {
  const { appState } = useAppStateContext();
  const theme = appState.theme === "dark" ? DarkTheme : LightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarComponent>
        <Routes>
          <Route element={<RedirectRoute />}>
            <Route path="/auth/*" element={<AuthenticationRoutes />} />

            {/* Client side routes */}
            {/* <Route path="/client/*" element={<PublicRoutes />} /> */}

            <Route path="/*" element={<AdminRoutes />} />
          </Route>
        </Routes>
        <AlertComponent />
      </SnackbarComponent>
    </ThemeProvider>
  );
};
