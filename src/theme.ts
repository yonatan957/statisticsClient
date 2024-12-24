import { createTheme } from "@mui/material/styles";

export const createAppTheme = (mode: "light" | "dark") => {
  return createTheme({
    palette: {
      primary: {
        main: mode === "light" ? "rgb(123, 201, 201)" : "rgb(86, 133, 133)",
        light: "#2196f3",
        dark: "#1565c0",
      },
      secondary: {
        main: mode === "light" ? "rgb(93, 165, 165)" : "rgb(23, 83, 83)",
        light: "#2196f3",
        dark: "#1565c0",
      },
      warning: {
        main: "#ff9800",
      },
      success: {
        main: "rgb(17, 185, 101)",
      },
      background: {
        default: mode === "light" ? "rgb(198, 211, 211)" : "rgb(78, 102, 102)",
        paper: mode === "light" ? "rgb(141, 211, 211)" : "rgb(23, 83, 83)",
      },
      text: {
        primary: mode === "light" ? "rgb(84, 94, 94)" : "rgb(0, 0, 0)",
        secondary: mode === "light" ? "rgb(126, 146, 146)" : "rgb(27, 27, 27)",
        disabled: "rgb(229, 255, 0)",
      },
      error: {
        main: "#d32f2f",
      },
      mode: mode as "light" | "dark",
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: "2rem",
        fontWeight: 500,
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.5,
      },
    },
    spacing: 8,
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });
};
