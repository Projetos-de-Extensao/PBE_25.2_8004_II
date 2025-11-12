// src/theme.js
import { createTheme } from "@mui/material/styles";

// Paleta aproximada do Ibmec extraída do logo enviado
const ibmecColors = {
  navy: "#0A2342",
  gold: "#FFB300",
  gray100: "#F5F6FA",
  text: "#1F2937",
  white: "#FFFFFF",
  red: "#D32F2F",
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: ibmecColors.navy },
    secondary: { main: ibmecColors.gold },
    error: { main: ibmecColors.red },
    background: {
      default: ibmecColors.white, // fundo branco
      paper: ibmecColors.white,
    },
    text: {
      primary: ibmecColors.text,
    },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: [
      "Inter",
      "Roboto",
      "-apple-system",
      "Segoe UI",
      "Helvetica Neue",
      "Arial",
      "Noto Sans",
      "sans-serif",
    ].join(","),
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: { boxShadow: "0 6px 20px rgba(0,0,0,0.06)" },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 16, border: "1px solid #EEF1F6" },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600 },
      },
    },
    MuiContainer: {
      defaultProps: { maxWidth: "lg" },
    },
  },
});

export default theme;
