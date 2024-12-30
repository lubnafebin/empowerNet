import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import errorIcon from "../../../assets/icons/ic_alert.png";
import { useAlertDialogContext } from "../../hooks";
import { DialogSlide } from "./DialogSlide";

export const AlertComponent = () => {
  const { alert } = useAlertDialogContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const getAlertVariant = () => {
    switch (alert.variant) {
      case "error":
        return errorIcon;
      case "warning":
        return errorIcon;
      case "success":
        return errorIcon;
      case "info":
        return errorIcon;
      case "primary":
        return errorIcon;
      default:
        return errorIcon;
    }
  };
  const variant = getAlertVariant();
  // Effect to open the dialog using search-param
  React.useEffect(() => {
    if (alert.open) {
      navigate(pathname.concat(alert.dialogValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert]);
  return (
    <DialogSlide
      dialogValue={alert.dialogValue}
      disableCloseOnBackgroundClick={false}
    >
      {" "}
      <Stack sx={{ width: "400px" }}>
        {" "}
        <DialogTitle>
          {" "}
          <Stack direction="row" gap="12px">
            {" "}
            <Box
              component="img"
              src={variant}
              sx={{ width: "36px", height: "28.5px" }}
            />{" "}
            <Typography
              sx={{ fontWeight: 600, fontSize: "24px", lineHeight: "29.05px" }}
            >
              {alert?.title}
            </Typography>{" "}
          </Stack>{" "}
        </DialogTitle>{" "}
        <DialogContent>
          {" "}
          <Typography
            sx={{
              px: "28px",
              py: "16px",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "19.36px",
            }}
          >
            {" "}
            {alert?.description}{" "}
          </Typography>{" "}
        </DialogContent>{" "}
        <DialogActions>
          {" "}
          {alert?.rowAction && alert.rowAction !== null ? (
            alert.rowAction
          ) : (
            <Button
              variant="outlined"
              size="small"
              onClick={() => navigate(pathname, { replace: true })}
            >
              {" "}
              Close{" "}
            </Button>
          )}{" "}
        </DialogActions>{" "}
      </Stack>{" "}
    </DialogSlide>
  );
};
