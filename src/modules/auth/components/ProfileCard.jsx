import PropTypes from "prop-types";
import { Avatar, Stack, Typography } from "@mui/material";
import { CalendarMonth, Email, Group, Phone } from "@mui/icons-material";

export const ProfileCard = ({
  avatarTitle,
  name,
  email,
  joinedAt,
  mobile,
  headerSection,
}) => {
  return (
    <Stack
      direction="row"
      gap={2}
      flexWrap="wrap"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      p={3}
    >
      <Stack
        flexDirection={{ lg: "row", sx: "column" }}
        // alignItems="center"
        gap={3}
      >
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: "56px",
            height: "56px",
            textTransform: "uppercase",
          }}
        >
          {avatarTitle}
        </Avatar>
        <Stack gap="4px">
          <Typography
            variant="h5"
            fontWeight={500}
            textTransform="capitalize"
            sx={{ fontSize: "20px" }}
          >
            {name}
          </Typography>
          <Stack flexDirection="row" flexWrap="wrap" gap={2}>
            <Typography
              fontSize="14px"
              display="flex"
              gap="8px"
              alignItems="center"
            >
              <Email fontSize="small" />
              {email}
            </Typography>

            <Typography
              fontSize="14px"
              display="flex"
              gap="8px"
              alignItems="center"
            >
              <Phone fontSize="small" />
              {mobile}
            </Typography>

            <Typography
              fontSize="14px"
              display="flex"
              gap="8px"
              alignItems="center"
            >
              <CalendarMonth fontSize="small" />
              {joinedAt}
            </Typography>

          </Stack>
        </Stack>
      </Stack>
      {headerSection}
    </Stack>
  );
};

ProfileCard.propTypes = {
  avatarTitle: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  joinedAt: PropTypes.string.isRequired,
  mobile: PropTypes.string.isRequired,
  headerSection: PropTypes.node,
};
