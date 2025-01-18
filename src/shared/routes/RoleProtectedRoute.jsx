import PropTypes from "prop-types";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppStateContext } from "../hooks";
import { PageNotFound, PageUnAuthorized } from "../components";

const baseRoutes = ["cds", "nhg"];
export const RoleProtectedRoute = ({ roles = [] }) => {
  const location = useLocation();

  const {
    appState: { authentication },
  } = useAppStateContext();

  const isAuthenticated = Boolean(
    authentication.accessToken && authentication.id,
  );
  const isPermitted = roles.some((role) => authentication.role.name === role);

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
