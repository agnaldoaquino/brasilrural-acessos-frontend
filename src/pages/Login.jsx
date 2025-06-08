import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Importação do Toastify

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      // 👉 Salva o token no localStorage (para que Acessos.jsx consiga usar)
      localStorage.setItem("token", data.access_token);
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
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <img
            src="/Logo-Brasil-Rural.png"
            alt="Brasil Rural"
            className="w-16 h-16 rounded-full shadow"
          />
        </div>
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">
          Acessar Painel
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
