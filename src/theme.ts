"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8B5FBF",
      dark: "#61398F",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#F5F3F7",
      dark: "##E9E4ED",
      light: "#FFFFFF",
    },
    // accent: {
    //   accent1: "#FDDBE9",
    //   accent2: "#DEF3F4",
    //   accent3: "#F5FAE3",
    //   accent4: "#F0C7FF",
    //   accent5: "#D86DFF",
    //   accent6: "#FF5C9F",
    // },
  },
  typography: {
    fontFamily: "Inter, sans-serif", // Default font for most text
    body1: {
      fontFamily: "Inter, sans-serif",
    },
    body2: {
      fontFamily: "Inter, sans-serif",
    },
  },
});

export default theme;
