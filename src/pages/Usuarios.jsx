import React, { useState } from "react";
import { api } from "../utils/api";
import { toast } from "react-toastify";

function CriarUsuario() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [criaUsuario, setCriaUsuario] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Token não encontrado. Faça login novamente.");
      return;
    }

    setIsLoading(true);

    try {
      await api.post(
        "/criar_usuario",
        {
          username,
          email,
          password,
          cria_usuario: criaUsuario,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-2">
        <img src="/Logo-Brasil-Rural.png" alt="Logo" className="h-10 mr-3" />
        <span>Criar Usuário</span>
      </h1>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Nome de Usuário</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Senha</label>
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
          <label>Pode criar outros usuários</label>
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
