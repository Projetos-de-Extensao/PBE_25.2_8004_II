// Em src/App.jsx

import React, { useState, useEffect } from 'react';
import api from './services/api'; 
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AlunoDashboard from './pages/AlunoDashboard';
import ProfessorDashboard from './pages/ProfessorDashboard';
import Navbar from './components/Navbar';

function App() {
  // --- Estados para Gerenciamento ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [vagas, setVagas] = useState([]);
  
  // --- NOVOS ESTADOS ---
  // Guarda a lista de disciplinas vindas da API
  const [disciplinas, setDisciplinas] = useState([]);
  
  // --- Estados do Formulário ---
  const [novaVagaNome, setNovaVagaNome] = useState('');
  const [novaVagaCR, setNovaVagaCR] = useState(0.0);
  const [novaVagaDisciplinaId, setNovaVagaDisciplinaId] = useState('');
  // O 'novaVagaProfessorId' NÃO É MAIS NECESSÁRIO!

  const [mensagem, setMensagem] = useState('');

  // --- Efeito de Carregamento ---
  // Verifica o token no localStorage
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // --- NOVO useEffect ---
  // Busca as disciplinas ASSIM que o usuário logar
  useEffect(() => {
    // Se o usuário está logado E ainda não buscamos as disciplinas
    if (isLoggedIn && disciplinas.length === 0) {
      
      const fetchDisciplinas = async () => {
        try {
          // Nosso 'api' já tem o token
          const response = await api.get('/disciplinas/');
          setDisciplinas(response.data);
          setMensagem("Disciplinas carregadas.");
        } catch (error) {
          console.error("Erro ao buscar disciplinas:", error);
          setMensagem("Erro ao carregar disciplinas.");
        }
      };
      
      fetchDisciplinas();
    }
  }, [isLoggedIn, disciplinas]); // Depende do 'isLoggedIn'

  // --- Funções de Ação ---

  // Extracted login logic so it can be called from the Login page (which
  // supplies username/password) or from the in-place form.
  const doLogin = async (usernameValue, passwordValue) => {
    setMensagem('Logando...');
    try {
      const response = await api.post('/token/', {
        username: usernameValue,
        password: passwordValue,
      });

      const token = response.data.access;
      localStorage.setItem('accessToken', token);
      setIsLoggedIn(true);
      setMensagem('Login bem-sucedido!');
      setUsername('');
      setPassword('');

      // navigate to home after successful login
      if (typeof navigate === 'function') navigate('/');

    } catch (error) {
      console.error("Erro no login:", error);
      setMensagem('Erro no login! Verifique usuário ou senha.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await doLogin(username, password);
  };

  const handleLogout = () => {
    // ... (Esta função continua EXATAMENTE IGUAL) ...
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    setVagas([]);
    setDisciplinas([]); // Limpa as disciplinas ao sair
    setMensagem('Você foi desconectado.');
  };

  const handleFetchVagas = async () => {
    // ... (Esta função continua EXATAMENTE IGUAL) ...
    setMensagem('Buscando vagas...');
    try {
      const response = await api.get('/vagas/');
      setVagas(response.data);
      setMensagem('Vagas carregadas!');

    } catch (error) {
      console.error("Erro ao buscar vagas:", error);
      if (error.response && error.response.status === 401) {
        setMensagem('Sessão expirada. Faça login novamente.');
        handleLogout();
      } else {
        setMensagem('Erro ao buscar vagas.');
      }
    }
  };

  // 4. INSERIR DADOS (Criar Vaga - POST) - MODIFICADA!
  const handleCriarVaga = async (e) => {
    e.preventDefault();
    // Use the existing form submit behavior (kept for backward compatibility)
    return await createVagaFromData({
      nome: novaVagaNome,
      crminimo: parseFloat(novaVagaCR),
      statusvaga: 'aberta',
      disciplina: parseInt(novaVagaDisciplinaId || 0),
    });
  };

  // Helper that receives a data object (used by VagaForm on the Home page)
  const createVagaFromData = async (dadosVaga) => {
    if (!dadosVaga.disciplina || dadosVaga.disciplina === 0) {
      setMensagem('Por favor, selecione uma disciplina.');
      return;
    }

    setMensagem('Criando vaga...');
    try {
      const response = await api.post('/vagas/', dadosVaga);
      setMensagem(`Vaga "${response.data.nome}" criada com sucesso!`);
      // refresh vagas
      await handleFetchVagas();
    } catch (error) {
      console.error('Erro ao criar vaga:', error);
      if (error.response && error.response.status === 403) {
        setMensagem('ERRO: Você não tem permissão (Não é Professor?)');
      } else {
        setMensagem('Erro ao criar vaga. Verifique os campos.');
      }
    }
  };

  // expose navigate via hook
  let navigate;
  try {
    navigate = useNavigate();
  } catch (err) {
    navigate = null;
  }

  // --- Renderização (HTML/JSX) usando rotas ---
  return (
    <div>
      <Navbar onHome={() => navigate && navigate('/')} onLogout={handleLogout} isLoggedIn={isLoggedIn} />
      <div style={{ padding: 12 }}>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? (
              <Home
                vagas={vagas}
                disciplinas={disciplinas}
                onFetchVagas={handleFetchVagas}
                onCreateVaga={createVagaFromData}
                mensagem={mensagem}
              />
            ) : (
              <Navigate to="/login" replace />
            )}
          />

          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" replace /> : <Login onLogin={(creds) => doLogin(creds.username, creds.password)} mensagem={mensagem} />}
          />

          <Route
            path="/aluno"
            element={isLoggedIn ? <AlunoDashboard /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/professor"
            element={isLoggedIn ? <ProfessorDashboard /> : <Navigate to="/login" replace />}
          />

          {/* Fallback: redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;