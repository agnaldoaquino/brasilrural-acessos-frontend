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

      // Atualiza o estado do app com o token (APENAS a string)
      onLogin(data.access_token);

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
            className="h-32 mx-auto rounded-full shadow"
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
            disabled={loading} // Desabilita o botão se estiver carregando
            className={`w-full py-2 rounded text-white ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
