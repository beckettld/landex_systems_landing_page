"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const baseTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#06091A",
      paper: "#0B0F22",
    },
    primary: {
      main: "#4F7DF7",
      light: "#7BA0FF",
      dark: "#3358CC",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#0E1225",
      light: "#161B33",
      dark: "#080B18",
    },
    text: {
      primary: "#E8ECF4",
      secondary: "rgba(232, 236, 244, 0.55)",
    },
    divider: "rgba(232, 236, 244, 0.08)",
  },

  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontFamily: '"Instrument Serif", "Georgia", serif',
      fontWeight: 400,
      letterSpacing: "-0.02em",
      lineHeight: 1.05,
    },
    h2: {
      fontFamily: '"Instrument Serif", "Georgia", serif',
      fontWeight: 400,
      letterSpacing: "-0.015em",
      lineHeight: 1.1,
    },
    h3: {
      fontFamily: '"Instrument Serif", "Georgia", serif',
      fontWeight: 400,
      letterSpacing: "-0.01em",
      lineHeight: 1.15,
    },
    h4: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.25,
    },
    h5: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      letterSpacing: "0",
      lineHeight: 1.3,
    },
    h6: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      letterSpacing: "0.02em",
      textTransform: "uppercase" as const,
      lineHeight: 1.4,
    },
    subtitle1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      fontSize: "1.125rem",
      lineHeight: 1.6,
      letterSpacing: "0.005em",
    },
    subtitle2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
      fontSize: "0.875rem",
      letterSpacing: "0.06em",
      textTransform: "uppercase" as const,
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      fontSize: "1.0625rem",
      lineHeight: 1.7,
      letterSpacing: "0.005em",
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      fontSize: "0.9375rem",
      lineHeight: 1.65,
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
      textTransform: "none" as const,
      letterSpacing: "0.02em",
    },
    overline: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
      fontSize: "0.75rem",
      letterSpacing: "0.1em",
      textTransform: "uppercase" as const,
    },
  },

  shape: {
    borderRadius: 2,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "html, body": {
          scrollBehavior: "smooth",
        },
        body: {
          overflowX: "hidden",
        },
        "::selection": {
          backgroundColor: "rgba(79, 125, 247, 0.3)",
          color: "#E8ECF4",
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: "14px 32px",
          fontSize: "0.9375rem",
          fontWeight: 500,
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        },
        containedPrimary: {
          backgroundColor: "#4F7DF7",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#7BA0FF",
          },
        },
        outlinedPrimary: {
          borderColor: "rgba(232, 236, 244, 0.2)",
          color: "#E8ECF4",
          "&:hover": {
            borderColor: "#4F7DF7",
            backgroundColor: "rgba(79, 125, 247, 0.06)",
          },
        },
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(232, 236, 244, 0.06)",
          borderRadius: 2,
          backdropFilter: "blur(12px)",
          transition: "border-color 0.3s ease, background-color 0.3s ease",
          "&:hover": {
            borderColor: "rgba(79, 125, 247, 0.25)",
            backgroundColor: "rgba(79, 125, 247, 0.04)",
          },
        },
      },
    },

    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(232, 236, 244, 0.08)",
        },
      },
    },

    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
  },
});

const theme = responsiveFontSizes(baseTheme, {
  breakpoints: ["sm", "md", "lg"],
  factor: 3,
});

export default theme;
