import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { useAlertContext } from '../../hooks';
import { GeneralDialog } from './GeneralDialog';

export const AlertComponent = () => {
  const { alert } = useAlertContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Effect to open the dialog using search-param
  React.useEffect(() => {
    if (alert.open) {
      navigate(pathname.concat(alert.dialogValue));
    }
  }, [alert]);

  return (
    <GeneralDialog
      dialogValue={alert.dialogValue}
      disableCloseOnBackgroundClick={false}
    >
      <Stack sx={{ width: '400px', m: 1 }}>
        <DialogTitle>
          <Typography
            sx={{ fontWeight: 600, fontSize: '24px', lineHeight: '29.05px' }}
          >
            {alert?.title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '19.36px',
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
              onClick={() => navigate(pathname, { replace: true })}
            >
              Close
            </Button>
          )}
        </DialogActions>
      </Stack>
    </GeneralDialog>
  );
};
