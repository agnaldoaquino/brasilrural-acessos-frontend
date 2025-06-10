// src/utils/api.js
//
// API client configurado com axios.
// 
// ✅ Uso:
// import api from "../utils/api";
//
// Exemplo de uso:
// await api.get("/usuarios");
// await api.post("/criar_usuario", data);
// await api.put("/usuarios/123", data);
// await api.delete("/usuarios/123");
//
// ✅ O token JWT (access_token) é adicionado automaticamente no header Authorization.
// Não é necessário configurar isso manualmente em cada chamada.
//
// Variável de ambiente obrigatória:
// VITE_API_URL → deve apontar para a URL base da sua API backend.
//
// Exemplo no .env:
// VITE_API_URL=https://brasilrural-acessos-backend-production.up.railway.app
//

import axios from "axios";

// Cria a instância do axios com a baseURL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor para adicionar o token automaticamente em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
