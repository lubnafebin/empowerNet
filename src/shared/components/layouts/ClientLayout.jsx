import { Box, Container } from "@mui/material";
import { Navbar } from "..";
import { useDashboardLayout } from "../../hooks";
import { Outlet } from "react-router-dom";

export const ClientLayout = () => {
  const { toggleSidebar, theme } = useDashboardLayout();

  return (
    <Box display="flex">
      <Container
        id="client-layout-container"
        maxWidth="2xl"
        sx={{
          marginTop: "64px",
        }}
        disableGutters
      >
        <Navbar
          isSidebarOpen={false}
          theme={theme}
          toggleSidebar={toggleSidebar}
          isDashboard={true}
          hideSidebar={true}
        />
        <Outlet />
      </Container>
    </Box>
  );
};
