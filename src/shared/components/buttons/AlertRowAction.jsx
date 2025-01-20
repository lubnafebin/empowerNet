import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropsType from 'prop-types';
import React from 'react';
import { LoadingButton } from './LoadingButton';

/**
 * A component that renders a row of actions for an alert dialog.
 *
 * @param {Object} props - The props for the component.
 * @param {function} props.onClick - The function to call when the main button is clicked.
 * @param {function} [props.onClose] - The function to call when the dialog is closed.
 * @param {string} [props.label="Confirm"] - The label for the main button.
 *
 * @returns {JSX.Element} The rendered component.
 */
export const AlertRowAction = ({ onClick, onClose, label = 'Confirm' }) => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { pathname } = useNavigate();

  /**
   * Function to trigger button loading state.
   *
   * @param {boolean} status - The loading state to set.
   */
  const triggerButtonLoading = (status) => setLoading(status);

  /**
   * Function to handle closing the dialog.
   * It resets the loading state, navigates to the current pathname, and calls the onClose handler if provided.
   */
  const handleCloseDialog = () => {
    triggerButtonLoading(false);
    navigate(pathname, { replace: true });
    onClose && onClose();
  };

  /**
   * Function to handle the main button click.
   * It sets the loading state, calls the onClick handler, and then closes the dialog.
   */
  const handleOnClick = () => {
    triggerButtonLoading(true);
    onClick();
    handleCloseDialog();
  };

  return (
    <Stack direction="row" gap="8px">
      <Button variant="outlined" size="small" onClick={handleCloseDialog}>
        Close
      </Button>
      <LoadingButton
        loading={loading}
        variant="contained"
        size="small"
        color="error"
        onClick={handleOnClick}
      >
        {label}
      </LoadingButton>
    </Stack>
  );
};

AlertRowAction.propTypes = {
  onClick: PropsType.func.isRequired,
  onClose: PropsType.func,
  label: PropsType.string,
};
