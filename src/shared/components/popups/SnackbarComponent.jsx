import Close from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { closeSnackbar, SnackbarProvider } from 'notistack';
import PropsType from 'prop-types';

export const SnackbarComponent = ({ children }) => {
  return (
    <SnackbarProvider
      autoHideDuration={3000}
      maxSnack={3}
      action={(snackbarId) => (
        <IconButton size="small" onClick={() => closeSnackbar(snackbarId)}>
          <Close fontSize="small" sx={{ color: 'white' }} />
        </IconButton>
      )}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'top',
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

SnackbarComponent.propTypes = {
  children: PropsType.node.isRequired,
};
