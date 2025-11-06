// Em src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api'; 
import { jwtDecode } from 'jwt-decode'; // --- MUDANÇA: Importa o decodificador ---

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // --- MUDANÇA: Adiciona 'userRole' ao estado ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'aluno', 'professor', 'admin'
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        // --- MUDANÇA: Decodifica o token ao carregar ---
        const decodedToken = jwtDecode(token);
        
        // (Verificação de expiração - Opcional mas recomendado)
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsLoggedIn(true);
          setUserRole(decodedToken.role); // Armazena o papel
        } else {
          // Token expirado
          localStorage.removeItem('accessToken');
        }
      } catch (error) {
        // Token inválido
        console.error("Token inválido:", error);
        localStorage.removeItem('accessToken');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post('/token/', {
        username: username,
        password: password,
      });
      
      const token = response.data.access;
      localStorage.setItem('accessToken', token);
      
      // --- MUDANÇA: Decodifica o token no login ---
      const decodedToken = jwtDecode(token);
      setIsLoggedIn(true);
      setUserRole(decodedToken.role); // Armazena o papel
      
      toast.success('Login bem-sucedido!');
      
      // --- MUDANÇA: Redireciona baseado no papel ---
      if (decodedToken.role === 'aluno') {
        navigate('/dashboard/aluno');
      } else if (decodedToken.role === 'professor') {
        navigate('/dashboard/professor');
      } else {
        navigate('/'); // Admin ou outros vão para a Home
      }

    } catch (error) {
      console.error("Erro no login:", error);
      if (error.response && error.response.status === 401) {
        toast.error('Erro: Usuário ou senha inválidos.');
      } else {
        toast.error('Erro ao conectar com o servidor.');
      }
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    setUserRole(null); // --- MUDANÇA: Limpa o papel ---
    toast.info('Você foi desconectado.');
    navigate('/login');
  };

  const value = {
    isLoggedIn,
    userRole, // --- MUDANÇA: Expõe o papel ---
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};