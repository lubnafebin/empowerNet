import { Box, Container } from '@mui/material';
import { Navbar, Sidebar } from '..';
import { useDashboardLayout } from '../../hooks';
import { Outlet } from 'react-router-dom';

export const DashboardLayout = () => {
  const { toggleSidebar, sidebarOpen, toggleTheme, theme } =
    useDashboardLayout();

  return (
    <Box display="flex">
    <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Container
        maxWidth="2xl"
        sx={{
          marginTop: '64px',
        }}
        disableGutters
      >
        <Navbar
          isSidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <Outlet />
      </Container>
    </Box>
  );
};
