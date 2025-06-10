import { useState, useEffect } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import TabelaGenerica from "../components/TabelaGenerica";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Usuarios = ({ token }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswordIds, setShowPasswordIds] = useState([]);

  useEffect(() => {
    setLoading(true);

    const fetchUsuarios = async () => {
      try {
        const response = await api.apiGet("/usuarios");
        console.log("Usuários recebidos:", response);
        setUsuarios(response);
        toast.success("Usuários carregados com sucesso.");
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        toast.error("Falha ao buscar usuários.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, [token]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTogglePassword = (id) => {
    setShowPasswordIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const colunas = [
    { titulo: "Nome do usuário", campo: "username" },
    { titulo: "E-mail", campo: "email" },
    {
      titulo: "Senha",
      campo: "password",
      render: (value, usuario) =>
        showPasswordIds.includes(usuario.id) ? (
          <>
            {value}{" "}
            <FaEyeSlash
              className="inline ml-2 cursor-pointer text-gray-500"
              onClick={() => handleTogglePassword(usuario.id)}
            />
          </>
        ) : (
          <>
            {"••••••"}{" "}
            <FaEye
              className="inline ml-2 cursor-pointer text-gray-500"
              onClick={() => handleTogglePassword(usuario.id)}
            />
          </>
        ),
    },
    {
      titulo: "Cria Usuários",
      campo: "cria_usuario",
      render: (value) => (value ? "Sim" : "Não"),
    },
    { titulo: "Data de Criação", campo: "created_at" },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex items-center mb-6">
        <img
          src="/Logo-Brasil-Rural-v2.png"
          alt="Brasil Rural Logo"
          className="h-12 mr-4"
        />
        <h1 className="text-3xl font-bold">Gestão de Usuários</h1>
      </div>

      <input
        type="text"
        placeholder="Buscar nome ou email"
        value={searchTerm}
        onChange={handleSearch}
        className="px-3 py-2 mb-6 w-full max-w-md border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
      />

      {loading ? (
        <div className="text-center text-blue-600 font-semibold mb-4">
          Carregando usuários...
        </div>
      ) : (
        <TabelaGenerica colunas={colunas} dados={filteredUsuarios} />
      )}
    </div>
  );
};

export default Usuarios;
