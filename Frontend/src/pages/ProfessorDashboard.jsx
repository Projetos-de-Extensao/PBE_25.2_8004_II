// Em src/pages/ProfessorDashboard.jsx
import React from 'react';
import { Typography, Paper } from '@mui/material';

export default function ProfessorDashboard() {
  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h4">Dashboard do Professor</Typography>
      <Typography>Aqui o professor criará e gerenciará suas vagas.</Typography>
    </Paper>
  );
}