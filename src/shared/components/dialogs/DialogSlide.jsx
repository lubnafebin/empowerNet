import { Dialog } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const DialogSlide = ({
  children,
  dialogValue,
  disableReplaceUrl = true,
  disableCloseOnBackgroundClick = true,
  sx = {},
}) => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

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

DialogSlide.propTypes = {
  children: PropTypes.node.isRequired,
  dialogValue: PropTypes.string.isRequired,
  sx: PropTypes.object,
  disableReplaceUrl: PropTypes.bool,
  disableCloseOnBackgroundClick: PropTypes.bool,
};
