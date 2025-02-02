import PropTypes from "prop-types";
import { Box, Paper, Stack, Typography } from "@mui/material";

export const CountCard = ({ title, value, color, icon }) => {
  return (
    <Stack
      elevation={0}
      component={Paper}
      p="24px"
      borderRadius="6px"
      gap="16px"
      minWidth={{ xs: "100%", md: "286.5px" }}
      flexDirection="row"
      alignItems="center"
    >
      <Box
        sx={{
          background: color,
          p: 1,
          borderRadius: "50%",
          height: "56px",
          width: "56px",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        {icon}
      </Box>
      <Stack>
        <Typography fontWeight={600} fontSize="25px">
          {value}
        </Typography>
        <Typography fontSize="14px" fontWeight={500}>
          {title}
        </Typography>
      </Stack>
    </Stack>
  );
};

CountCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.node.isRequired,
  color: PropTypes.string,
};
