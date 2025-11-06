// Em src/App.jsx

import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

// ... (imports) ...
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import AlunoDashboard from './pages/AlunoDashboard';
import ProfessorDashboard from './pages/ProfessorDashboard';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar /> 
      <Container sx={{ marginTop: '2rem' }}>
        <Routes>
          {/* --- ROTAS PÚBLICAS --- */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* --- ROTAS PROTEGIDAS (com Papéis) --- */}
          <Route 
            path="/dashboard/aluno" 
            element={
              // --- MUDANÇA: Define papéis permitidos ---
              <ProtectedRoute allowedRoles={['aluno']}>
                <AlunoDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/professor" 
            element={
              // --- MUDANÇA: Define papéis permitidos ---
              <ProtectedRoute allowedRoles={['professor']}>
                <ProfessorDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* (Podemos adicionar uma rota protegida genérica,
             ex: /perfil, que serve para ambos) */}

        </Routes>
      </Container>
    </>
  );
}

export default App;