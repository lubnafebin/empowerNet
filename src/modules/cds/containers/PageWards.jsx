import React from 'react';
import { Typography, Stack, Button, Grid2 } from '@mui/material'
import { BasicTable } from '../../../shared/components/tables/Table';

export const PageWards = () => {
  console.log('Rendering PageWards');
  return (
    <Stack spacing={2} >
      <Grid2 container alignItems="center" justifyContent="space-between">
        <Grid2 item sx={{ pl: 2 }}>
          <Typography sx={{ fontSize: "32px", fontWeight: 500 }}>
            Wards
          </Typography>
        </Grid2>
        <Grid2 item>
          <Button variant="contained"
            sx={{
              backgroundColor: '#051A34',
              width: 100,
              ml: 'auto'
            }}
          >
            New Wards
          </Button>
        </Grid2>
      </Grid2>
      <BasicTable />

    </Stack>

  );
}



