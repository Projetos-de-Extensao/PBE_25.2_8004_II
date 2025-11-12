import React from "react";
import { Container, Box } from "@mui/material";
import Navbar from "../components/Navbar";

export default function DefaultLayout({ children, maxWidth = "lg" }) {
  return (
    <>
      {/* Header fixo */}
      <Navbar position="fixed" />

      {/* Empurra o conteúdo para baixo do AppBar fixo */}
      <Box sx={(theme) => ({ ...theme.mixins.toolbar })} />

      {/* Conteúdo da página */}
      <Container maxWidth={maxWidth} sx={{ py: 3 }}>
        {children}
      </Container>
    </>
  );
}