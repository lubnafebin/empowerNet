import { IconButton, Paper, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

export const ReportCard = ({ title, date, icon, ...rest }) => {
  return (
    <Paper  elevation={0} variant="outlined" {...rest}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{title}</Typography>
        <IconButton>{icon}</IconButton>
      </Stack>
      <Typography variant="caption">{date}</Typography>
    </Paper>
  );
};

ReportCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};
