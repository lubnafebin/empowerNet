import React from "react";

export const defaultAppState = {
  theme: "light",
  sidebarOpen: true,
  authentication: {
    accessToken: null,
    refreshToken: null,
    id: null,
    name: "",
    email: "",
    profileId: null,
    role: {
      id: null,
      name: "",
      permissionId: null,
    },
    permission: {},
  },
};

export const AppStateContext = React.createContext({
  appState: defaultAppState,
  setAppState: () => {},
});
