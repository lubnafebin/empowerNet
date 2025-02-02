import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { useAlertContext } from "../../hooks";
import { GeneralDialog } from "./GeneralDialog";
import { initialAlertState } from "../../context";

export const AlertComponent = () => {
  const { alert, setAlert } = useAlertContext();
  const { pathname, state } = useLocation();
  const navigate = useNavigate();

  // Effect to open the dialog using search-param
  React.useEffect(() => {
    if (alert.open) {
      navigate(pathname.concat(alert.dialogValue), { state: state });
    }
  }, [alert]);

  return (
    <GeneralDialog
      dialogValue={alert.dialogValue}
      disableCloseOnBackgroundClick={false}
    >
      <Stack sx={{ width: "400px", m: 1 }}>
        <DialogTitle>
          <Typography
            sx={{ fontWeight: 600, fontSize: "24px", lineHeight: "29.05px" }}
          >
            {alert?.title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "19.36px",
            }}
          >
            {alert?.description}
          </Typography>
        </DialogContent>
        <DialogActions>
          {alert?.rowAction && alert.rowAction !== null ? (
            alert.rowAction
          ) : (
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                navigate(pathname, { replace: true, state });
                setAlert(initialAlertState);
              }}
            >
              Close
            </Button>
          )}
        </DialogActions>
      </Stack>
    </GeneralDialog>
  );
};
