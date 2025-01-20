import { createTheme } from '@mui/material/styles';
import { commonThemeStyle } from './Theme';

const primaryColor = '#bfbfbf';

const tableHeaderColor = '#181818';
const neutralColors = {
  100: '#333333',
  200: '#333333',
};
const backgroundColor = {
  default: '#000000', // Default background color
};

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark', // Dark theme mode
    primary: {
      main: primaryColor, // Primary color for dark mode
      contrastText: '#000000', //To Ensure text is readable on dark background
    },
    neutral: neutralColors,
    background: backgroundColor,
  },
  components: {
    ...commonThemeStyle.components,
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            fontSize: 14,
            fontWeight: 500,
            backgroundColor: tableHeaderColor,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: '24px',
          textTransform: 'uppercase',
          fontSize: '12px',
          fontWeight: 600,
        },
      },
      variants: [
        {
          props: { variant: 'filled', color: 'success' },
          style: {
            backgroundColor: 'rgba(0, 168, 11,0.2)',
            color: 'rgb(0, 168, 11)',
          },
        },
        {
          props: { variant: 'filled', color: 'error' },
          style: {
            backgroundColor: 'rgba(234, 22, 22,0.2)',
            color: 'rgb(255, 0, 0)',
          },
        },
        {
          props: { variant: 'filled', color: 'warning' },
          style: {
            backgroundColor: 'rgba(255, 165, 0, 0.2)',
            color: 'rgb(255, 165, 0)',
          },
        },
        {
          props: { variant: 'filled', color: 'info' },
          style: {
            backgroundColor: 'rgba(0, 119, 204, 0.2)',
            color: 'rgb(0, 119, 204)',
          },
        },
        {
          props: { variant: 'filled', color: 'secondary' },
          style: {
            backgroundColor: 'rgba(63, 81, 181, 0.2)',
            color: 'rgb(63, 81, 181)',
          },
        },
      ],
    },
  },
});
