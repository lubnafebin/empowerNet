import LogoDark from "../../../assets/logo-dark.svg";
import LogoLight from "../../../assets/logo-dark.svg";

import { Menu } from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AccountPopover, AppBar } from ".";
import PropsTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { useAppStateContext } from "../../hooks";

export const Navbar = ({
  theme: themeMode,
  isSidebarOpen,
  toggleSidebar,
  isDashboard = true,
  hideSidebar = false,
}) => {
  const {
    appState: { authentication },
  } = useAppStateContext();
  const theme = useTheme();
  const location = useLocation();
  const isDarkModeEnabled = themeMode === "dark";
  const smallDevices = useMediaQuery(theme.breakpoints.down("md"));
  const visibleSidebar = isDashboard && !hideSidebar;
  const route = location.pathname.split("/")[1];
  const loggedUserRole = authentication.role.name;

  const role =
    route === "nhg" && loggedUserRole !== "NHG"
      ? ["ADS", "President"].includes(loggedUserRole)
        ? "President"
        : "Secretary"
      : route === ""
        ? "Member"
        : route;

  return (
    <AppBar position="fixed" open={isSidebarOpen} elevation={0} id="navbar">
      <Toolbar sx={{ minHeight: "64px" }}>
        {visibleSidebar && (
          <IconButton
            // color="inherit"
            aria-label="open drawer"
            onClick={toggleSidebar}
            edge="start"
            sx={{
              marginRight: smallDevices ? 0 : 5,
              visibility: smallDevices ? "visible" : "hidden",
              border: 1,
            }}
          >
            <Menu />
          </IconButton>
        )}
        {(!isSidebarOpen || smallDevices) && (
          <Stack flexDirection="row" gap="8px">
            <Box
              component="img"
              src={isDarkModeEnabled ? LogoDark : LogoLight}
              width="24px"
              height="24px"
            />
            <Typography
              fontWeight={500}
              fontSize="16px"
              color="text.primary"
              fontFamily="sans-serif"
            >
              EmpowerNet
            </Typography>
          </Stack>
        )}
        <Box sx={{ flexGrow: 1, border: 1 }} />
        <Stack
          flexDirection="row"
          gap="4px"
          alignItems="center"
          sx={{ display: smallDevices ? "none" : "flex" }}
        >
          <Typography
            color="text.primary"
            fontSize="small"
            variant="caption"
            textTransform="uppercase"
          >
            Logged In As
          </Typography>
          <Chip color="success" label={role} />
        </Stack>

        <Box sx={{ display: "flex", gap: 1 }}>
          {isDashboard && <AccountPopover showAvatarOnly={smallDevices} />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
Navbar.propTypes = {
  theme: PropsTypes.oneOf(["dark", "light"]).isRequired,
  isSidebarOpen: PropsTypes.bool.isRequired,
  toggleSidebar: PropsTypes.func.isRequired,
  isDashboard: PropsTypes.bool,
  hideSidebar: PropsTypes.bool,
};
