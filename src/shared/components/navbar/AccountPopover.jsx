import {
  ArrowDropDown,
  Logout,
  ManageAccounts,
  Repeat,
} from "@mui/icons-material";
import {
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useUtilFunctions } from "../../../utils";
import { UserProfileCard } from "../cards";
import PropTypes from "prop-types";
import { BASE_URL } from "../../../configs";
import { useImmer } from "use-immer";
import { useNavigate } from "react-router-dom";

export const AccountPopover = ({ showAvatarOnly }) => {
  const [state, setState] = useImmer({ roles: [], anchorElUser: null });

  const { logout, getLoggedInUser } = useUtilFunctions();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setState((draft) => {
      draft.anchorElUser = event.currentTarget;
    });
  };

  const handleCloseUserMenu = () => {
    setState((draft) => {
      draft.anchorElUser = null;
    });
  };

  const user = getLoggedInUser();

  React.useEffect(() => {
    switch (user.role?.name) {
      case "ADS": {
        setState((draft) => {
          draft.roles = [
            { label: "ADS", route: "/ads" },
            { label: "President", route: "/nhg" },
            { label: "Member", route: "/" },
          ];
        });
        break;
      }
      case "President": {
        setState((draft) => {
          draft.roles = [
            { label: "President", route: "/nhg" },
            { label: "Member", route: "/" },
          ];
        });
        break;
      }
      case "Secretary": {
        setState((draft) => {
          draft.roles = [
            { label: "Secretary", route: "/nhg" },
            { label: "Member", route: "/" },
          ];
        });
        break;
      }
    }
  }, []);

  return (
    <React.Fragment>
      <Tooltip title="Open settings">
        <Stack
          direction="row"
          onClick={handleOpenUserMenu}
          sx={{
            borderRadius: "6px",
            gap: 1,
            p: showAvatarOnly ? 0 : "auto",
          }}
          component={MenuItem}
        >
          <Avatar
            src={user?.profile?.url ? BASE_URL + user.profile.url : ""}
            sx={{
              backgroundColor: "primary.main",
              width: 24,
              height: 24,
              fontSize: 12,
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </Avatar>

          {!showAvatarOnly && (
            <React.Fragment>
              <ListItemText
                title={user.name}
                primary={user.name}
                primaryTypographyProps={{
                  style: {
                    color: theme.palette.text.secondary,
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    maxWidth: 190,
                    fontSize: 14,
                    overflow: "hidden",
                  },
                }}
              />
              <ArrowDropDown sx={{ color: "GrayText" }} fontSize="small" />
            </React.Fragment>
          )}
        </Stack>
      </Tooltip>

      <Menu
        id="menu-app-bar"
        elevation={3}
        anchorEl={state.anchorElUser}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(state.anchorElUser)}
        onClose={handleCloseUserMenu}
        slotProps={{
          paper: {
            sx: {
              overflow: "visible",
              mt: 1.5,
            },
          },
        }}
      >
        <UserProfileCard handleCloseUserMenu={handleCloseUserMenu} />
        <Divider sx={{ mt: 2, mb: 1 }} />

        {state.roles.map((role, index) => {
          const currentRoute =
            location.pathname.split("/")[1] === role.route.split("/")[1];
          return (
            <MenuItem
              key={index}
              sx={{
                borderRadius: 0,
                display: currentRoute ? "none" : "flex",
              }}
              onClick={() => navigate(role.route)}
            >
              <ListItemIcon>
                <Repeat />
              </ListItemIcon>
              <Typography>Switch to {role.label}</Typography>
            </MenuItem>
          );
        })}
        <MenuItem
          sx={{ borderRadius: 0, mb: 1 }}
          onClick={() => {
            handleCloseUserMenu();
            navigate("profile");
          }}
        >
          <ListItemIcon>
            <ManageAccounts />
          </ListItemIcon>
          <Typography>Manage Profile</Typography>
        </MenuItem>
        <MenuItem
          sx={{ borderRadius: 0, mb: 1 }}
          onClick={() => {
            handleCloseUserMenu();
            logout();
          }}
        >
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

AccountPopover.propTypes = {
  showAvatarOnly: PropTypes.bool,
};
