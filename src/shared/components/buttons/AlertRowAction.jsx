import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropsType from "prop-types";
// import { LoadingButton } from "../../../shared/components";
import React from "react";
/*
 * A component that renders a row of actions for an alert dialog.
 * * @param {Object} props - The props for the component.
 * @param {function} props.onClick - The function to call when the main button is clicked.
 * @param {function} [props.onClose] - The function to call when the dialog is closed.
 * @param {string} [props.label="Confirm"] - The label for the main button.
 * @param {string} [props.buttonColor="error"] - The button color for the main button.
 * * @returns {JSX.Element} The rendered component. */
export const AlertRowAction = ({
  onClick,
  onClose,
  buttonColor = "error",
  label = "Confirm",
}) => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { pathname } = useNavigate();
  const triggerButtonLoading = (status) => setLoading(status);
  const handleCloseDialog = () => {
    triggerButtonLoading(false);
    navigate(pathname, { replace: true });
    onClose && onClose();
  };
  const handleOnClick = () => {
    triggerButtonLoading(true);
    onClick();
    handleCloseDialog();
  };
  return (
    <Stack direction="row" gap="8px">
      {" "}
      <Button variant="outlined" size="small" onClick={handleCloseDialog}>
        {" "}
        Close{" "}
      </Button>{" "}
      <Button
        // isLoading={loading}
        variant="contained"
        size="small"
        color={buttonColor}
        onClick={handleOnClick}
      >
        {" "}
        {label}{" "}
      </Button>{" "}
    </Stack>
  );
};
AlertRowAction.propTypes = {
  onClick: PropsType.func.isRequired,
  onClose: PropsType.func,
  label: PropsType.string,
  buttonColor: PropsType.oneOf([
    "error",
    "info",
    "success",
    "warning",
    "primary",
    "secondary",
  ]),
};
