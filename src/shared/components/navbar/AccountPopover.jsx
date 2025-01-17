import { ArrowDropDown, Logout, ManageAccounts } from '@mui/icons-material';
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
} from '@mui/material';
import React from 'react';
import { useUtilFunctions } from '../../../utils';
import { UserProfileCard } from '../cards';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const AccountPopover = ({ showAvatarOnly }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { logout, getLoggedInUser } = useUtilFunctions();
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isProfilePage = location.pathname.includes('/profile/details');

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const user = getLoggedInUser();

  const handleRedirection = () => {
    const isClient = user.userType === 3;

    handleCloseUserMenu();
    navigate(
      isClient
        ? `/client/profile/details/${user.userId}`
        : `/profile/details/${user.userId}`,
    );
  };

  return (
    <React.Fragment>
      <Tooltip title="Open settings">
        <Stack
          direction="row"
          onClick={handleOpenUserMenu}
          sx={{
            borderRadius: '6px',
            gap: 1,
            p: showAvatarOnly ? 0 : 'auto',
          }}
          component={MenuItem}
        >
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              width: 24,
              height: 24,
              fontSize: 12,
            }}
          >
            {user?.firstName[0]}
          </Avatar>

          {!showAvatarOnly && (
            <React.Fragment>
              <ListItemText
                title={user?.designation ?? user?.emailAddress}
                primary={user?.designation ?? user?.emailAddress}
                primaryTypographyProps={{
                  style: {
                    color: theme.palette.text.secondary,
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    maxWidth: 190,
                    fontSize: 14,
                    overflow: 'hidden',
                  },
                }}
              />
              <ArrowDropDown sx={{ color: 'GrayText' }} fontSize="small" />
            </React.Fragment>
          )}
        </Stack>
      </Tooltip>

      <Menu
        id="menu-app-bar"
        elevation={3}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        slotProps={{
          paper: {
            sx: {
              overflow: 'visible',
              mt: 1.5,
            },
          },
        }}
      >
        <UserProfileCard handleCloseUserMenu={handleCloseUserMenu} />
        <Divider sx={{ mt: 2, mb: 1 }} />

        <MenuItem
          selected={isProfilePage}
          sx={{ borderRadius: 0 }}
          onClick={handleRedirection}
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
