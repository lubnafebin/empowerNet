import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppStateContext } from '../hooks';

export const RedirectRoute = () => {
  const location = useLocation();
  const {
    appState: { authentication },
  } = useAppStateContext();

  const isAuthenticated = Boolean(
    authentication.token && authentication.user.userType,
  );

  const isClientLogin = authentication.user.userType === 3;

  const path = location.pathname;
  const navigateTo = isClientLogin ? '/client' : '/';

  return (path === '/auth/login' && isAuthenticated) ||
    (isClientLogin && path === '/') ? (
    <Navigate to={navigateTo} replace />
  ) : (
    <Outlet />
  );
};
