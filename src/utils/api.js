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

export async function buscarHistoricoEmail(emailId) {
  try {
    const resposta = await fetch(`${import.meta.env.VITE_API_URL}/historico-emails/${emailId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!resposta.ok) {
      throw new Error("Erro ao buscar histórico do e-mail.");
    }

    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    console.error("Erro na função buscarHistoricoEmail:", erro);
    throw erro;
  }
}

export async function atualizarEmailCorporativo(emailId, dadosAtualizados) {
  try {
    const resposta = await api.put(`/emails/${emailId}`, dadosAtualizados);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao atualizar e-mail:", erro);
    throw erro;
  }
}

export async function criarEmailCorporativo(novoEmail) {
  try {
    const resposta = await api.post("/emails", novoEmail);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao criar e-mail:", erro);
    throw erro;
  }
}

export async function buscarEmailsCorporativos() {
  try {
    const resposta = await api.get("/emails");
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao buscar e-mails:", erro);
    throw erro;
  }
}
