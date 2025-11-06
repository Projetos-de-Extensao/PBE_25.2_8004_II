// Em src/components/Navbar.jsx

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

// --- IMPORTAMOS O NOSSO HOOK ---
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  // --- USAMOS O CONTEXTO ---
  const { isLoggedIn, logout } = useAuth(); // Pegamos o estado REAL

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large" edge="start" color="inherit" aria-label="menu"
          sx={{ mr: 2 }} component={RouterLink} to="/"
        >
          <MonitorHeartIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Monitoria App
        </Typography>

        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>

          {/* --- A LÓGICA AGORA É REAL! --- */}
          {isLoggedIn ? (
            <Button 
              color="secondary" // Cor forte (vermelho)
              variant="contained" 
              onClick={logout} // Função de logout do Contexto
            >
              Logout
            </Button>
          ) : (
            <Button 
              color="inherit" 
              variant="outlined" 
              component={RouterLink} 
              to="/login"
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}