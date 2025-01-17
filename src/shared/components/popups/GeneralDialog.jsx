import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

export const GeneralDialog = ({
  children,
  dialogValue,
  disableReplaceUrl = true,
  disableCloseOnBackgroundClick = true,
  sx = {},
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname, search } = location;

  const handleDialogClose = () => {
    navigate(pathname, { replace: disableReplaceUrl });
  };

  return (
    <Dialog
      open={Boolean(search === dialogValue)}
      keepMounted
      onClose={disableCloseOnBackgroundClick ? handleDialogClose : undefined}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="xl"
      sx={sx}
    >
      {children}
    </Dialog>
  );
};

GeneralDialog.propTypes = {
  children: PropTypes.node.isRequired,
  dialogValue: PropTypes.string.isRequired,
  sx: PropTypes.object,
  disableReplaceUrl: PropTypes.bool,
  disableCloseOnBackgroundClick: PropTypes.bool,
};
