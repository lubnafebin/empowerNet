import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Stack } from '@mui/material'
import { Navbar } from '../navbar'
import { Sidebar } from '../sidebar'

export const DashboardLayout = ({ children }) => {


  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  };


  return (
    <React.Fragment>
      {<Navbar toggleSidebar={toggleSidebar} />}
      {<Sidebar sidebarOpen={sidebarOpen} />}
      <Stack flexDirection="row">
        <Stack
          sx={{
            width:  `calc(100vw - ${sidebarOpen ? 250 : 0}px)`,  // Adjust width based on sidebar state
            transition: 'width 0.3s ease', // Smooth transition for the table
            ml:'auto',
            px:5,
            pt: 10,
          }}
        >
          {children}
        </Stack>
      </Stack>
    </React.Fragment>

  )
}


