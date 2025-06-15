// src/pages/CriarUsuario.jsx

import React, { useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";

function CriarUsuario() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [criaUsuario, setCriaUsuario] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await api.post("/criar_usuario", {
        username,
        email,
        password,
        cria_usuario: criaUsuario,
      });

      toast.success(`Usuário "${username}" criado com sucesso!`);

      // Limpar o formulário
      setUsername("");
      setEmail("");
      setPassword("");
      setCriaUsuario(false);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      toast.error("Erro ao criar usuário.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex items-center mb-6">
        <img
          src="/Logo-Brasil-Rural-v2.png"
          alt="Brasil Rural Logo"
          className="h-24 mr-4"
        />
        <h1 className="text-3xl font-bold">Criar Usuário</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium mb-1">Nome de Usuário</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={criaUsuario}
            onChange={(e) => setCriaUsuario(e.target.checked)}
            className="mr-2"
          />
          <label className="text-sm">Pode criar outros usuários</label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Criando usuário..." : "Criar Usuário"}
        </button>
      </form>
    </div>
  );
}

export default CriarUsuario;
