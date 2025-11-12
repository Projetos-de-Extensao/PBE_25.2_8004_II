import React from "react";
import { Typography, Paper, Stack, Divider } from "@mui/material";
import DefaultLayout from "../layouts/DefaultLayout";

export default function AlunoDashboard() {
  return (
    <DefaultLayout>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard do Aluno
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Aqui você verá suas candidaturas e vagas recomendadas.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Stack spacing={2}>
          <Typography>— Candidaturas recentes</Typography>
          <Typography>— Vagas em destaque</Typography>
        </Stack>
      </Paper>
    </DefaultLayout>
  );
}