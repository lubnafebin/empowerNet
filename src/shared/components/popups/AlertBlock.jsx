import { Stack, Typography } from "@mui/material";
import { alertColors, globalPadding } from "../../../utils";
import PropTypes from "prop-types";

export const AlertBlock = ({ children, variant = "warning" }) => {
  return (
    <Stack
      sx={{
        ...alertColors[variant],
        p: 1.5,
        borderRadius: "10px",
        mb: globalPadding,
      }}
    >
      <Typography
        fontSize="14px"
        fontStyle="italic"
        alignItems="center"
        display="flex"
        gap="8px"
      >
        {children}
      </Typography>
    </Stack>
  );
};

AlertBlock.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    "warning",
    "success",
    "primary",
    "secondary",
    "info",
  ]),
};
