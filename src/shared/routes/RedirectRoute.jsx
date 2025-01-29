import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppStateContext } from "../hooks";

export const RedirectRoute = () => {
  const location = useLocation();
  const { appState } = useAppStateContext();

  const isAuthenticated = Boolean(
    appState.authentication.accessToken && appState.authentication?.id,
  );
  const isCdsLogin = appState.authentication.role?.name === "CDS";
  const isNHgLogin = appState.authentication.role?.name === "NHG";

  const path = location.pathname;

  return (path === "/auth/login" && isAuthenticated) ||
    (path === "/" && isCdsLogin && isNHgLogin) ? (
    <Navigate to={isCdsLogin ? "/cds" : isNHgLogin ? "/nhg" : "/"} replace />
  ) : (
    <Outlet />
  );

  // return (path === "/auth/login" && isAuthenticated) ||
  //   (isCdsLogin && path === "/" && isNHgLogin) ? (
  //   <Navigate to="/" replace />
  // ) : (
  //   <Outlet />
  // );
};
