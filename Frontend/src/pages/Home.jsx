// Em src/pages/Home.jsx

import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

export default function Home() {
  return (
    // 'Paper' é um "card" com sombra
    <Paper elevation={3} sx={{ padding: '2rem' }}>
      <Box textAlign="center">
        <Typography variant="h3" component="h1" gutterBottom>
          Bem-vindo ao Portal de Monitoria
        </Typography>
        <Typography variant="h5" component="p" color="textSecondary">
          Acesse o sistema para ver as vagas ou cadastrar novas oportunidades.
        </Typography>
      </Box>
    </Paper>
  );
}