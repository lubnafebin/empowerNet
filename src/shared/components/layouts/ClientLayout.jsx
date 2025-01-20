import { Box, Container } from '@mui/material';
import { Navbar } from '..';
import { useDashboardLayout } from '../../hooks';
import { Outlet } from 'react-router-dom';

export const ClientLayout = () => {
  const { toggleSidebar, toggleTheme, theme } = useDashboardLayout();

  return (
    <Box display="flex">
      <Container
        id="client-layout-container"
        maxWidth="2xl"
        sx={{
          marginTop: '64px',
        }}
        disableGutters
      >
        <Navbar
          isSidebarOpen={false}
          theme={theme}
          toggleSidebar={toggleSidebar}
          toggleTheme={toggleTheme}
          isDashboard={true}
          hideSidebar={true}
        />
        <Outlet />
      </Container>
    </Box>
  );
};
