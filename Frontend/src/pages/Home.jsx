import React from "react";
import { Typography, Paper, Box, Stack, Button, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          minHeight: "calc(100vh - 160px)", // afasta do header e centraliza
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, width: "100%" }}>
          <Box textAlign="center">
            <Typography variant="h3" component="h1" gutterBottom>
              Bem-vindo ao Portal de Monitoria
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Acesse vagas, acompanhe candidaturas e gerencie oportunidades.
            </Typography>

            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
              <Button component={RouterLink} to="/login?as=aluno" variant="contained">
                Acessar como Aluno
              </Button>
              <Button component={RouterLink} to="/login?as=professor" variant="outlined">
                Acessar como Professor
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}