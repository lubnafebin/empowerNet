import PropTypes from 'prop-types';
import { useUtilFunctions } from '../../utils';
import { Outlet } from 'react-router-dom';
import { PageUnAuthorized } from '../components';

export const PermissionProtectedRoute = ({ permission }) => {
  const { checkPermission } = useUtilFunctions();
  const isPermitted = checkPermission(permission);
  if (isPermitted) {
    return <Outlet />;
  } else {
    return <PageUnAuthorized />;
  }
};

PermissionProtectedRoute.propTypes = {
  permission: PropTypes.string,
};
