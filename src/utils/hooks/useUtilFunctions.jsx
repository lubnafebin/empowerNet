import { useNavigate } from "react-router-dom";
import { defaultAppState, useAppStateContext } from "../../shared";
import { logoutServices } from "../services";

export const useUtilFunctions = () => {
  const navigate = useNavigate();
  const { appState, setAppState } = useAppStateContext();

  const isAuthenticated = () => {
    const { authentication } = appState;
    return authentication.accessToken && authentication.refreshToken;
  };

  const getPermissions = () => {
    return appState.authentication.permission;
  };

  const checkPermission = (permission) => {
    const permissionJson = getPermissions();

    const keys = permission.split(".");
    let current = permissionJson;

    for (const key of keys) {
      if (!current[key]) {
        return false;
      }

      current = current[key];
    }

    return current;
  };

  return {
    logout: () => {
      logoutServices();
      setAppState((draft) => {
        draft.authentication = defaultAppState.authentication;
      });
      navigate("/auth/login");
    },
    getLoggedInUser: () => {
      return appState.authentication;
    },
    isAuthenticated,
    getPermissions,
    checkPermission,
  };
};
