import { useState } from "react";
import { apiPost } from "../utils/api";
import { toast } from "react-toastify"; // Importação do Toastify

function CriarUsuario() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [criaUsuario, setCriaUsuario] = useState(false);
  const [loading, setLoading] = useState(false); // Adicionado state de loading

  const handleCriarUsuario = () => {
    const payload = {
      username,
      email,
      password,
      cria_usuario: criaUsuario,
    };

    setLoading(true); // Inicia o loading

    apiPost("/usuarios", payload)
      .then((data) => {
        console.log("Usuário criado com sucesso:", data);
        toast.success(`Usuário "${username}" criado com sucesso!`);

        // Resetar campos se quiser:
        setUsername("");
        setEmail("");
        setPassword("");
        setCriaUsuario(false);
      })
      .catch((err) => {
        console.error("Erro ao criar usuário:", err);
        toast.error("Erro ao criar usuário. Verifique os dados e tente novamente.");
      })
      .finally(() => {
        setLoading(false); // Finaliza o loading
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Criar Usuário</h1>

      <div className="mb-2">
        <label className="block font-semibold">Nome de Usuário</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block font-semibold">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-2">
        <label className="block font-semibold">Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={criaUsuario}
            onChange={(e) => setCriaUsuario(e.target.checked)}
            className="mr-2"
          />
          Pode criar outros usuários
        </label>
      </div>

      <button
        onClick={handleCriarUsuario}
        disabled={loading} // Desabilita o botão se estiver carregando
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Criando usuário..." : "Criar Usuário"}
      </button>
    </div>
  );
}

export default CriarUsuario;
