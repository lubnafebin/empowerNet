/* eslint-disable react-hooks/exhaustive-deps */
import PropsTypes from "prop-types";
import { useImmer } from "use-immer";
import { AppStateContext, defaultAppState } from "../shared/context";
import React from "react";
import {
  getAuthDetailsServices,
  toggleThemeService,
  useUtilFunctions,
} from "../utils";
import { useMediaQuery, useTheme } from "@mui/material";

export const AppStateContextProvider = ({ children }) => {
  const theme = useTheme();
  const largeDevice = useMediaQuery(theme.breakpoints.up("md"));
  const [appState, setAppState] = useImmer({
    ...defaultAppState,
    sidebarOpen: largeDevice ? true : false,
  });
  const { isAuthenticated } = useUtilFunctions();

  React.useLayoutEffect(() => {
    const theme = toggleThemeService({ type: "get" });

    setAppState((draft) => {
      if (theme) draft.theme = theme;
    });
  }, []);

  // Load authentication details if not already set
  React.useMemo(() => {
    const { authentication } = appState;
    const authenticatedUser =
      isAuthenticated(authentication.accessToken) ||
      isAuthenticated(authentication.refreshToken);
    if (!authenticatedUser) {
      const authDetails = getAuthDetailsServices();
      if (authDetails) {
        setAppState((draft) => {
          draft.authentication = authDetails;
        });
      }
    }
  }, []);

  const value = { appState, setAppState };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

AppStateContextProvider.propTypes = {
  children: PropsTypes.node.isRequired,
};
