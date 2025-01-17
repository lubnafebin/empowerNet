import React from "react";

export const defaultAppState = {
  theme: "light",
  sidebarOpen: true,
  authentication: {
    accessToken: null,
    refreshToken: null,
    user: {
      id: null,
      name: "",
      email: "",
      profileId: null,
      role: {
        id: null,
        name: "",
        permissionId: null,
      },
    },
  },
};

export const AppStateContext = React.createContext({
  appState: defaultAppState,
  setAppState: () => {},
});
