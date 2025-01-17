import LogoDark from '../../../assets/logo-dark.svg';
import LogoLight from '../../../assets/logo-dark.svg';

import {
  //  DarkMode, LightMode,
  Menu,
} from '@mui/icons-material';
import {
  Box,
  IconButton,
  // ToggleButton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { AccountPopover, AppBar } from '.';
import PropsTypes from 'prop-types';

export const Navbar = ({
  theme: themeMode,
  isSidebarOpen,
  // toggleTheme,
  toggleSidebar,
  isDashboard = true,
  hideSidebar = false,
}) => {
  const theme = useTheme();
  const isDarkModeEnabled = themeMode === 'dark';
  const smallDevices = useMediaQuery(theme.breakpoints.down('md'));
  const visibleSidebar = isDashboard && !hideSidebar;

  return (
    <AppBar position="fixed" open={isSidebarOpen} elevation={0} id="navbar">
      <Toolbar sx={{ minHeight: '64px' }}>
        {visibleSidebar && (
          <IconButton
            // color="inherit"
            aria-label="open drawer"
            onClick={toggleSidebar}
            edge="start"
            sx={{
              marginRight: smallDevices ? 0 : 5,
              visibility: smallDevices ? 'visible' : 'hidden',
            }}
          >
            <Menu />
          </IconButton>
        )}
        {(!isSidebarOpen || smallDevices) && (
          <Box
            component="img"
            src={isDarkModeEnabled ? LogoDark : LogoLight}
            width="150px"
          />
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', gap: 1 }}>
          {/* <ToggleButton
            value={theme}
            selected={isDarkModeEnabled}
            size="small"
            sx={{ borderRadius: 2 }}
            onChange={toggleTheme}
          >
            {isDarkModeEnabled ? <LightMode color="warning" /> : <DarkMode />}
          </ToggleButton> */}

          {isDashboard && <AccountPopover showAvatarOnly={smallDevices} />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
Navbar.propTypes = {
  theme: PropsTypes.oneOf(['dark', 'light']).isRequired,
  isSidebarOpen: PropsTypes.bool.isRequired,
  toggleTheme: PropsTypes.func.isRequired,
  toggleSidebar: PropsTypes.func.isRequired,
  isDashboard: PropsTypes.bool,
  hideSidebar: PropsTypes.bool,
};
