import { Stack } from '@mui/material'
import React, { useState } from 'react'
import { Navbar } from '../navbar'
import { Sidebar } from '../sidebar'

export const DashboardLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <Sidebar />
      <Stack flexDirection="row">
        <Stack 
          sx={{
            width: "calc(100% - 250px)",
            pt: "70px",
            ml: "auto",
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


