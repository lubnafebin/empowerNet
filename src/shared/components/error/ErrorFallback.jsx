import { Stack, Button, Box, Typography } from '@mui/material';
import Logo from '../../../assets/logo-dark.svg';
import { useNavigate } from 'react-router-dom';

export const ErrorFallback = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack direction="column" alignItems="center">
        <Box
          component="img"
          src={Logo}
          alt="logo"
          style={{
            width: '250px',
          }}
        />
        <Typography variant="subtitle1" mt={2}>
          Something went wrong
        </Typography>
        <Button size="medium" onClick={() => navigate(0)}>
          Retry
        </Button>
      </Stack>
    </Box>
  );
};
