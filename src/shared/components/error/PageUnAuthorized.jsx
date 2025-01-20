import { Box, Typography } from '@mui/material';

export const PageUnAuthorized = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography align="center" color="textPrimary" variant="h4">
          Unauthorized: You don&apos;t have the permission to view this page.
        </Typography>
        <Typography align="center" color="textPrimary" variant="subtitle2">
          You either tried some shady route or you came here by mistake.
          Whichever it is, try using the navigation
        </Typography>
      </Box>
    </Box>
  );
};
