import React from "react";
import { Navbar } from "../navbar";
import { useDashboardLayout } from "../../hooks";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  const { theme, toggleSidebar } = useDashboardLayout();
  return (
    <React.Fragment>
      <Navbar
        isSidebarOpen={false}
        theme={theme}
        toggleSidebar={toggleSidebar}
        isDashboard={false}
      />
      <Outlet />
    </React.Fragment>
  );
};
