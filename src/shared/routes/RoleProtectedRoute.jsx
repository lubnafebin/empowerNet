import PropTypes from "prop-types";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppStateContext } from "../hooks";
import { PageNotFound, PageUnAuthorized } from "../components";

const baseRoutes = [
  "profitune",
  "questionnaire",
  "coach",
  "clients",
  "client",
  "settings",
];
export const RoleProtectedRoute = ({ roles = [] }) => {
  const location = useLocation();

  const {
    appState: { authentication },
  } = useAppStateContext();

  const isAuthenticated = Boolean(
    authentication.token && authentication.user.userType,
  );

  const isPermitted = true;
  // roles.some(
  //   (role) => userRoles[role] === authentication.user.userType,
  // );

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  } else {
    return isPermitted ? (
      <Outlet />
    ) : baseRoutes.includes(location.pathname.split("/")[1]) ? (
      <PageUnAuthorized />
    ) : (
      <PageNotFound />
    );
  }
};

RoleProtectedRoute.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string),
};
