// Em src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify'; // Para mensagens de erro

// --- MUDANÇA: Aceita um prop 'allowedRoles' ---
export default function ProtectedRoute({ children, allowedRoles }) {
  const { isLoggedIn, userRole, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isLoggedIn) {
    // Redireciona para o login se não estiver logado
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // --- MUDANÇA: Verifica o Papel (Role) ---
  // Se a rota exige papéis E o papel do usuário não está na lista
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Usuário está logado, mas não tem permissão
    toast.error("Você não tem permissão para acessar esta página.");
    // Redireciona para a Home (ou para uma página 'Não Autorizado')
    return <Navigate to="/" replace />;
  }

  // Se passou em tudo (logado E com papel correto), mostre a página
  return children;
}