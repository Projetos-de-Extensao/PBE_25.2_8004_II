// Em src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';


// Importe o CSS do react-toastify
import 'react-toastify/dist/ReactToastify.css';

// --- IMPORTAÇÃO NECESSÁRIA (DO PASSO 1) ---
import { AuthProvider } from './context/AuthContext.jsx'; 

// 1. Defina seu tema (cores, fontes, etc.)
// (Seu código original, está perfeito)
const theme = createTheme({
  palette: {
    // Define o "azul" como cor primária
    primary: {
      main: '#1976d2', // Um azul forte e acessível
      contrastText: '#ffffff', // Texto dos botões primários será branco
    },
    // Define o "vermelho/rosa" como secundário (ex: botões de delete, alertas)
    secondary: {
      main: '#dc004e',
      contrastText: '#ffffff',
    },
    // Um fundo cinza claro para a página, para dar contraste
    background: {
      default: '#f4f6f8',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. O Roteador "envolve" tudo */}
    <BrowserRouter>
      {/* 3. O Tema do MUI "envolve" tudo */}
      <ThemeProvider theme={theme}>
        {/* --- AQUI ESTÁ A MUDANÇA (PASSO 2) --- */}
        {/* O AuthProvider "envolve" o App para dar acesso ao contexto */}
        <AuthProvider>
          <CssBaseline /> {/* 4. Normaliza o CSS (dentro do AuthProvider) */}
          <App /> {/* Nosso App principal */}
          
          {/* 5. O contêiner das notificações de erro/sucesso */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);