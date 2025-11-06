// Em src/pages/AlunoDashboard.jsx
import React from 'react';
import { Typography, Paper } from '@mui/material';

export default function AlunoDashboard() {
  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h4">Dashboard do Aluno</Typography>
      <Typography>Aqui o aluno verá suas candidaturas e vagas.</Typography>
    </Paper>
  );
}