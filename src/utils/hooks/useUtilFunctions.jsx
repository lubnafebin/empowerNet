import { useNavigate } from "react-router-dom";
import { defaultAppState, useAppStateContext } from "../../shared";
import { logoutServices } from "../services";
import {
  CheckCircle,
  ErrorOutline,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";

export const useUtilFunctions = () => {
  const navigate = useNavigate();
  const { appState, setAppState } = useAppStateContext();

  const isAuthenticated = () => {
    const { authentication } = appState;
    return authentication.token && authentication.refreshToken;
  };

  const getBootData = ({ field = "all" }) => {
    return field === "all" ? appState.bootData : appState.bootData[field];
  };

  const getPermissions = () => {
    return appState.authentication.user.userRolePermissions;
  };

  const checkPermission = (permissionString) => {
    // if (permissionString === 'dashboard.read') return true;
    // const permissions = getPermissions();
    // const permissionArray = permissionString.split('.');
    // const moduleId = moduleIds[permissionArray[0]];
    // const permissionName = permissionArray[1];
    // const isPermitted = permissions.some(
    //   (permission) =>
    //     permission.moduleId === moduleId && permission[permissionName],
    // );
    // return isPermitted;
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
      const { user } = appState.authentication;
      return user;
    },
    isAuthenticated,
    getPermissions,
    checkPermission,
  };
};
