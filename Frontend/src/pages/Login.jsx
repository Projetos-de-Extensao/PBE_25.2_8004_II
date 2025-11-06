// Em src/pages/Login.jsx

import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material';

// --- IMPORTAMOS O NOSSO HOOK ---
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // --- USAMOS O CONTEXTO ---
  const { login } = useAuth(); // Pegamos a função 'login' do cérebro

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // --- A ÚNICA COISA QUE FAZEMOS ---
      // Pedimos ao Contexto para tentar o login
      await login(username, password);
      
      // O contexto cuidará do sucesso, erro e redirecionamento!
      
    } catch (error) {
      // Se o 'login' do contexto deu erro, ele será pego aqui
      // O toast de erro já foi mostrado pelo contexto,
      // só precisamos parar o loading.
      setLoading(false);
    } 
    // Não precisamos de 'finally', pois o loading só para no erro.
    // O sucesso causa navegação.
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ padding: 4, marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            // ... (o formulário MUI continua igual) ...
            margin="normal" required fullWidth id="username"
            label="Usuário" name="username" autoComplete="username"
            autoFocus value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            // ... (o formulário MUI continua igual) ...
            margin="normal" required fullWidth name="password"
            label="Senha" type="password" id="password"
            autoComplete="current-password" value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit" fullWidth variant="contained"
            color="primary" sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}