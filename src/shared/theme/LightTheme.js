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
          style: {
            backgroundColor: "#E2F6F0",
            color: "#0B815A",
          },
        },
        {
          props: { variant: "filled", color: "error" },
          style: {
            backgroundColor: "#FDE8E7",
            color: "#B42318",
          },
        },
        {
          props: { variant: "filled", color: "warning" },
          style: {
            backgroundColor: "#FCF3EA",
            color: "#B54708",
          },
        },
        {
          props: { variant: "filled", color: "info" },
          style: {
            backgroundColor: "#E1F5FA",
            color: "#0E7090",
          },
        },
        {
          props: { variant: "filled", color: "primary" },
          style: {
            backgroundColor: "#E1EEFA",
            color: "#177EDF",
          },
        },
        {
          props: { variant: "filled", color: "secondary" },
          style: {
            backgroundColor: "rgba(63, 81, 181, 0.2)",
            color: "rgb(63, 81, 181)",
          },
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
