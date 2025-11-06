// Em src/api.js

import axios from 'axios';

// 1. Cria uma "instância" do Axios com a URL base do seu Django
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api' // A URL base da sua API
});

// 2. O "Interceptor" (Mágica do Token)
// Isso é uma função que "intercepta" CADA requisição
// antes dela ser enviada.
api.interceptors.request.use(
  (config) => {
    // Pega o token do localStorage
    const token = localStorage.getItem('accessToken');
    
    // Se o token existir, adiciona ele no cabeçalho 'Authorization'
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Em caso de erro na requisição
    return Promise.reject(error);
  }
);

export default api;