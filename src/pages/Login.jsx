import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Importação do Toastify

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Adicionado state de loading

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Inicia o loading

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Usuário ou senha inválidos");
      }

      const data = await response.json();

      // Atualiza o estado do app
      onLogin({
        token: data.access_token,
        criaUsuario: data.cria_usuario,
      });

      // 👉 Salva o token no localStorage com a chave CORRETA
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("cria_usuario", data.cria_usuario);

      // 👉 Mostra no console o token que foi salvo
      console.log("Token salvo no localStorage:", data.access_token);

      // Mostra toast de sucesso
      toast.success("Login realizado com sucesso!");

      // Redireciona para /acessos após login bem-sucedido
      navigate("/acessos");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Erro ao fazer login.");
    } finally {
      setLoading(false); // Finaliza o loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <img
            src="/Logo-Brasil-Rural-v2.png"
            alt="Brasil Rural"
            className="w-16 h-16 rounded-full shadow"
          />
        </div>
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">
          Acessar Painel
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block
