import { useState, useEffect } from "react";

const EditarUsuarioModal = ({ isOpen, onClose, onSave, initialData = {} }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [criaUsuario, setCriaUsuario] = useState(false);

  useEffect(() => {
  if (initialData) {
    setUsername(initialData.username || "");
    setEmail(initialData.email || "");
    setPassword("");
    setCriaUsuario(initialData.cria_usuario || false);
  }
}, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ username, email, password, cria_usuario: criaUsuario });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          title="Fechar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 11-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 11-1.414-1.414L8.586 10l-4.95-4.95a1 1 0 011.414-1.414L10 8.586z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <h2 className="text-xl font-semibold mb-4">Criar Novo Usuário</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-sm font-medium mb-1">E-mail</label>
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

          <div className="flex justify-end mt-6 space-x-3">
  <button
    type="button"
    onClick={onClose}
    className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
  >
    Fechar
  </button>

  <button
    type="submit"
    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
  >
    Salvar
  </button>
</div>
        </form>
      </div>
    </div>
  );
};

export default EditarUsuarioModal;
