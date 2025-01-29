import { createTheme } from "@mui/material/styles";
import { commonThemeStyle, primaryColor } from "./Theme";

const tableHeaderColor = "rgba(0,0,0,0.05)";
const neutralColors = {
  100: "#F7F7F7",
  200: "#F5F5F5",
};
const backgroundColor = {
  default: "#f7f7f7", // Default background color
};

const alertColors = {
  success: {
    backgroundColor: "#E2F6F0",
    color: "#0B815A",
  },
  error: {
    backgroundColor: "#FDE8E7",
    color: "#B42318",
  },
  warning: {
    backgroundColor: "#FCF3EA",
    color: "#B54708",
  },
  info: {
    backgroundColor: "#E1F5FA",
    color: "#0E7090",
  },
  primary: {
    backgroundColor: "#E1EEFA",
    color: "#177EDF",
  },
  secondary: {
    backgroundColor: "rgba(63, 81, 181, 0.2)",
    color: "rgb(63, 81, 181)",
  },
};

export const LightTheme = createTheme({
  palette: {
    mode: "light", // Light theme mode
    primary: {
      main: primaryColor, // Primary color for light mode
      light: "#3b78d9",
      dark: "#073c91",
    },
    neutral: neutralColors,
    background: backgroundColor,
  },

  components: {
    ...commonThemeStyle.components,
    MuiPaper: {
      variants: [
        {
          props: { variant: "shadow" },
          style: {
            elevation: 0,
            boxShadow: "0px 0px 13px 0px rgba(0,0,0,0.02)",
            outline: "1px solid rgba(0,0,0,0.03)",
          },
        },
      ],
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-root": {
            fontSize: 14,
            fontWeight: 500,
            height: "36px",
          },
          "& .MuiTableRow-root.Mui-stickyHeader": {
            backgroundColor: tableHeaderColor,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#ffffff",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: "24px",
          textTransform: "uppercase",
          fontSize: "12px",
          fontWeight: 600,
        },
      },
      variants: [
        {
          props: { variant: "filled", color: "success" },
          style: alertColors.success,
        },
        {
          props: { variant: "filled", color: "error" },
          style: alertColors.error,
        },
        {
          props: { variant: "filled", color: "warning" },
          style: alertColors.warning,
        },
        {
          props: { variant: "filled", color: "info" },
          style: alertColors.info,
        },
        {
          props: { variant: "filled", color: "primary" },
          style: alertColors.primary,
        },
        {
          props: { variant: "filled", color: "secondary" },
          style: alertColors.secondary,
        },
      ],
    },
  },
});

// '&.Mui-selected': {
//   backgroundColor: primaryColor,
//   color: '#fff',
// },
// '&.Mui-selected:hover': {
//   backgroundColor: primaryColor,
// },
