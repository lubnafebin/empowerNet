import { styled, AppBar as MuiAppBar, useMediaQuery } from '@mui/material';

const drawerWidth = 260;

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => {
  const isLargerDevice = useMediaQuery(theme.breakpoints.up('md'));
  return {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen + 250,
    }),
    ...(isLargerDevice && {
      variants: [
        {
          props: ({ open }) => open,
          style: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen + 250,
            }),
          },
        },
      ],
    }),
  };
});
