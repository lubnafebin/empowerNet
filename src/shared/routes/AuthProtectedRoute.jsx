/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAppStateContext } from "../hooks";

export const AuthProtectedRoute = ({ children }) => {
  const {
    appState: { authentication },
  } = useAppStateContext();
  const authenticated = Boolean(
    authentication.accessToken && authentication.id,
  );
  return authenticated === true ? (
    children
  ) : (
    <Navigate to="/auth/login" replace />
  );
};
