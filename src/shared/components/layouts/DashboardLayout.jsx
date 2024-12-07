import { Stack } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom';
import { Navbar } from '../navbar'
import { Sidebar } from '../sidebar'

export const DashboardLayout = ({ children }) => {
  const location = useLocation(); // Access the current route

  // Define routes where the layout should not appear
  const noLayoutRoutes = ['/cds/create', '/cds/update'];

  // Check if the current route is in the no-layout list
  const hideLayout = noLayoutRoutes.some((route) => location.pathname.startsWith(route));


  return (
    <React.Fragment>
       {!hideLayout && <Navbar />}
       {!hideLayout && <Sidebar />}
      <Stack flexDirection="row">
        <Stack 
          sx={{
            width: hideLayout ? '100%' : 'calc(100% - 250px)', // Full width if layout is hidden
            pt: hideLayout ? 0 : '70px', // Remove padding-top if layout is hidden
            ml: hideLayout ? 0 : 'auto',
            height: "100vh",
            overflow: "auto",
            px: 2
          }}
        >
          {children}
        </Stack>
      </Stack>
    </React.Fragment>

  )
}


