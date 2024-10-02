import { createTheme } from "@mui/material";

export const Theme = createTheme({
  // Breakpoints
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1920,
    },
  },

  // Components
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "white",
          boxShadow: "none",
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          gap: "6px",
        },
        groupedOutlined: {
          borderRadius: "32px",
          height: "32px",
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          height: "42px",
          alignContent: "center",
        },
        input: {
          padding: "12.5px 14px !important",
        },
        inputMultiline: {
          padding: "0 !important",
        },
        multiline: {
          height: "auto",
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        select: { padding: "5px 24px 4px 8px !important" },
        toolbar: {
          justifyContent: "center",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
          "& .MuiSvgIcon-root": {
            borderColor: "#5A728B",
            borderRadius: 50,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          lineHeight: "18px",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        // sizeSmall: {
        //     padding: "6px 16px",
        //     minWidth: "10px",
        // },
        // sizeMedium: {
        //     padding: "7.75px 20px",
        // },
        // sizeLarge: {
        //     padding: "11px 24px",
        // },
        // textSizeSmall: {
        //     padding: "7px 12px",
        // },
        // textSizeMedium: {
        //     padding: "9px 12px",
        // },
        // textSizeLarge: {
        //     padding: "12px 16px",
        // },
        // textGray: {
        //     backgroundColor: "rgba(0, 0, 0, 0.03)",
        //     "&:hover": {
        //         backgroundColor: "rgba(0, 0, 0, 0.07)",
        //     },
        // },
      },
      variants: [
        {
          props: { variant: "contained", size: "small" },
          style: {
            height: "36px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "16.94px",
            padding: "6px 12px 6px 10px",
          },
        },
        {
          props: { variant: "contained", size: "medium" },
          style: {
            height: "42px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "16.94px",
            padding: "6px 12px 6px 10px",
          },
        },
        {
          props: { variant: "outlined", size: "small" },
          style: {
            height: "36px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "16.94px",
            padding: "6px 12px 6px 10px",
            background: "#F5F8FB",
            borderColor: "#BBC6D3",
            color: "#00070F",
          },
        },
        {
          props: { variant: "outlined", size: "medium" },
          style: {
            height: "36px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "16.94px",
            padding: "6px 12px 6px 10px",
            background: "#F5F8FB",
            borderColor: "#BBC6D3",
            color: "#00070F",
          },
        },
      ],
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {},
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.16)",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "32px 24px",
          "&:last-child": {
            paddingBottom: "32px",
          },
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: "h6",
        },
        subheaderTypographyProps: {
          variant: "body2",
        },
      },
      styleOverrides: {
        root: {
          padding: "32px 24px",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
        },
        html: {
          MozOsxFontSmoothing: "grayscale",
          WebkitFontSmoothing: "antialiased",
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        body: {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
          padding: 0,
          margin: 0,
        },
        "#__next": {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "rgba(217,217,217,40%)",
        },
        input: {
          "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
          },
          "&[type=number]": {
            MozAppearance: "textfield",
            appearance: "none",
          },
        },
        root: {
          backgroundColor: "rgba(217,217,217,40%)",
          color: "rgba(18, 23, 28, 1)",
          border: "1px #DDE3E9",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "20px",
          fontWeight: 500,
          lineHeight: "24.2px",
          padding: "24px 28px 8px 28px",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          // paddingInline: `28px !important`,
          padding: 0,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "20px !important",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "8px 28px 24px 28px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        deletable: {
          "& .MuiChip-label": {
            marginRight: "auto",
          },
        },
        root: {
          fontWeight: 600,
          borderRadius: "27px",
          height: "24px",
          padding: "4px",
        },
      },
      variants: [
        {
          props: { color: "secondary", size: "medium" },
          style: {
            backgroundColor: "rgba(229, 232, 250, 1)",
            color: "rgba(59, 75, 216, 1)",
          },
        },
        {
          props: { color: "success", size: "medium" },
          style: {
            backgroundColor: "rgba(221, 238, 223, 1)",
            color: "rgba(11, 129, 90, 1)",
          },
        },
        {
          props: { color: "error", size: "medium" },
          style: {
            backgroundColor: "rgba(251, 230, 229, 1)",
            color: "rgba(179, 38, 30, 1)",
          },
        },
        {
          props: { color: "warning", size: "medium" },
          style: {
            backgroundColor: "rgba(255, 176, 15, 0.30)",
            color: "orange",
          },
        },
      ],
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(245, 248, 251, 1)",
          "& > .MuiTableCell-root": {
            color: "#374151",
            borderBottom: "none",
            fontSize: "13px",
            fontWeight: 500,
            lineHeight: "16px",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #ECF0F3",
          "&:last-child": {
            paddingRight: 20,
          },

          "&:first-of-type": {
            paddingLeft: 20,
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          // "tbody>&:hover": {
          //     cursor: "pointer",
          //     backgroundColor: "#f5f5f5",
          // },
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        separator: {
          margin: "0 4px",
          fontSize: "12px",
          lineHeight: "16px",
        },
      },
    },
  },
  palette: {
    neutral: {
      10: "rgba(245, 248, 251, 1)",
      30: "#DDE3E9",
      50: "rgba(153, 170, 189, 1)",
      70: "rgba(90, 114, 139, 1)",
      99: "rgba(18, 23, 28, 1)",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#DDE3E9", //"#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827",
    },
    action: {
      active: "#6B7280",
      focus: "rgba(55, 65, 81, 0.12)",
      hover: "rgba(55, 65, 81, 0.04)",
      selected: "rgba(55, 65, 81, 0.08)",
      disabledBackground: "rgba(55, 65, 81, 0.12)",
      disabled: "rgba(55, 65, 81, 0.26)",
    },
    background: {
      default: "rgba(255,255,255,95%)",
      paper: "#FFFFFF",
    },
    divider: "#E6E8F0",
    primary: {
      main: "#092F3F", //"#0B57D0",
      light: "#3b78d9",
      dark: "#073c91",
      contrastText: "#FFFFFF",
      60: "#0068D6",
      70: "#1760D2",
    },
    secondary: {
      main: "#10B981",
      light: "#3FC79A",
      dark: "#0B815A",
      contrastText: "#FFFFFF",
      30: "#CCD0F5",
    },
    success: {
      main: "#14B8A6",
      light: "#43C6B7",
      dark: "#0E8074",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#1560D4",
      light: "#64B6F7",
      dark: "#0B79D0",
      contrastText: "#FFFFFF",
    },
    gray: {
      main: "#c3c3c3",
      light: "#64B6F7",
      dark: "#0B79D0",
      contrastText: "#FFFFFF",
    },
    gray2: {
      main: "#F2F2F2",
      light: "#64B6F7",
      dark: "#cccccc",
      contrastText: "#000000",
    },
    warning: {
      main: "#FFB020",
      light: "#FFBF4C",
      dark: "#B27B16",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#C60808",
      light: "#DA6868",
      dark: "#922E2E",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#000000",
      secondary: "#65748B",
      disabled: "rgba(55, 65, 81, 0.48)",
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)",
    "0px 1px 2px rgba(100, 116, 139, 0.12)",
    "0px 1px 4px rgba(100, 116, 139, 0.12)",
    "0px 1px 5px rgba(100, 116, 139, 0.12)",
    "0px 1px 6px rgba(100, 116, 139, 0.12)",
    "0px 2px 6px rgba(100, 116, 139, 0.12)",
    "0px 3px 6px rgba(100, 116, 139, 0.12)",
    "0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)",
    "0px 5px 12px rgba(100, 116, 139, 0.12)",
    "0px 5px 14px rgba(100, 116, 139, 0.12)",
    "0px 5px 15px rgba(100, 116, 139, 0.12)",
    "0px 6px 15px rgba(100, 116, 139, 0.12)",
    "0px 7px 15px rgba(100, 116, 139, 0.12)",
    "0px 8px 15px rgba(100, 116, 139, 0.12)",
    "0px 9px 15px rgba(100, 116, 139, 0.12)",
    "0px 10px 15px rgba(100, 116, 139, 0.12)",
    "0px 12px 22px -8px rgba(100, 116, 139, 0.25)",
    "0px 13px 22px -8px rgba(100, 116, 139, 0.25)",
    "0px 14px 24px -8px rgba(100, 116, 139, 0.25)",
    "0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
  ],
  typography: {
    button: {
      fontWeight: 600,
    },
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.813rem",
      fontWeight: 400,
      lineHeight: "0.983rem",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "17px",
    },

    overline: {
      fontSize: "0.75rem",
      fontWeight: 600,
      letterSpacing: "0.5px",
      lineHeight: 2.5,
      textTransform: "uppercase",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.66,
    },
    h1: {
      fontWeight: 700,
      fontSize: "3.5rem",
      lineHeight: 1.375,
    },
    h2: {
      fontWeight: 700,
      fontSize: "3rem",
      lineHeight: 1.375,
    },
    h3: {
      fontWeight: 700,
      fontSize: "2.25rem",
      lineHeight: 1.375,
    },
    h4: {
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.375,
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.375,
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: 1.375,
    },
  },
});
