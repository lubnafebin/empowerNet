export const primaryColor = "#092F3F"; //'#0141eb';

export const commonThemeStyle = {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '"Roboto", sans-serif ',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          "&:first-of-type": {
            paddingLeft: "16px",
          },
          "&:last-child": {
            paddingRight: "16px",
          },
        },
      },
      variants: [
        {
          props: { padding: "none" },
          style: {
            paddingBlock: "4px",
          },
        },
        {
          props: { padding: "normal" },
          style: {
            paddingBlock: "12px",
          },
        },
        {
          props: { padding: "checkbox" },
          style: {
            paddingBlock: "10px",
          },
        },
      ],
    },
    MuiMenuItem: {
      styleOverrides: {
        root: { borderRadius: 6 },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: { minWidth: 36 },
      },
    },
    MuiButton: {
      styleOverrides: {
        startIcon: {
          paddingLeft: "2px",
        },
        root: {
          borderRadius: "6px",
          textTransform: "none",
          minWidth: "88px",
          maxHeight: "40px",
          paddingInline: "16px",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
      variants: [
        {
          props: { size: "medium" },
          style: {
            height: "48px",
          },
        },
      ],
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        content: {
          "&.Mui-expanded": {
            marginBottom: 10,
            minHeight: 0,
          },
        },
        root: {
          "&.Mui-expanded": {
            margin: 0,
            minHeight: "auto",
          },
        },
      },
    },
  },
  //   typography: {
  //     body1: {
  //       fontSize: '1rem',
  //       fontWeight: 400,
  //       lineHeight: 1.5,
  //     },
  //     body2: {
  //       fontSize: '0.813rem',
  //       fontWeight: 400,
  //       lineHeight: '0.983rem',
  //     },
  //     subtitle1: {
  //       fontSize: '1rem',
  //       fontWeight: 500,
  //       lineHeight: 1.75,
  //     },
  //     subtitle2: {
  //       fontSize: '0.875rem',
  //       fontWeight: 400,
  //       lineHeight: '17px',
  //     },
  //     overline: {
  //       fontSize: '0.75rem',
  //       fontWeight: 600,
  //       letterSpacing: '0.5px',
  //       lineHeight: 2.5,
  //       textTransform: 'uppercase',
  //     },
  //     caption: {
  //       fontSize: '0.75rem',
  //       fontWeight: 400,
  //       lineHeight: 1.66,
  //     },
  //     h1: {
  //       fontWeight: 700,
  //       fontSize: '3.5rem',
  //       lineHeight: 1.375,
  //     },
  //     h2: {
  //       fontWeight: 700,
  //       fontSize: '3rem',
  //       lineHeight: 1.375,
  //     },
  //     h3: {
  //       fontWeight: 700,
  //       fontSize: '2.25rem',
  //       lineHeight: 1.375,
  //     },
  //     h4: {
  //       fontWeight: 700,
  //       fontSize: '2rem',
  //       lineHeight: 1.375,
  //     },
  //     h5: {
  //       fontWeight: 600,
  //       fontSize: '1.5rem',
  //       lineHeight: 1.375,
  //     },
  //     h6: {
  //       fontWeight: 600,
  //       fontSize: '1.125rem',
  //       lineHeight: 1.375,
  //     },
  //   },
};
