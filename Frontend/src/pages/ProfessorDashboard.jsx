import React from "react";
import { Typography, Paper, Stack, Divider, Button } from "@mui/material";
import DefaultLayout from "../layouts/DefaultLayout";
import { Add } from "@mui/icons-material";

export default function ProfessorDashboard() {
  return (
    <DefaultLayout>
      <Paper sx={{ p: 3 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Typography variant="h4">Dashboard do Professor</Typography>
          <Button startIcon={<Add />} variant="contained">
            Nova Vaga
          </Button>
        </Stack>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Crie e gerencie suas vagas de monitoria.
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Typography>— Minhas vagas</Typography>
      </Paper>
    </DefaultLayout>
  );
}