import React from 'react';
import { Navbar } from '../navbar';
import { useDashboardLayout } from '../../hooks';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  const { theme, toggleSidebar, toggleTheme } = useDashboardLayout();
  return (
    <React.Fragment>
      <Navbar
        isSidebarOpen={false}
        theme={theme}
        toggleSidebar={toggleSidebar}
        toggleTheme={toggleTheme}
        isDashboard={false}
      />
      <Outlet />
    </React.Fragment>
  );
};
