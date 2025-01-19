import { Close } from "@mui/icons-material";
import { DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const DialogHeader = ({ title, resetCache = null }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <DialogTitle>
      <Stack
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
      >
        <Typography fontWeight={500} fontSize="16px">
          {title}
        </Typography>
        <IconButton
          size="small"
          onClick={() => {
            navigate(location.pathname, { replace: true });
            resetCache && resetCache();
          }}
        >
          <Close fontSize="small" />
        </IconButton>
      </Stack>
    </DialogTitle>
  );
};

DialogHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  resetCache: PropTypes.func,
};
