import { useState, useEffect } from "react";
import { apiGet } from "../utils/api";
import { toast } from "react-toastify";
import TabelaUsuarios from "../components/TabelaUsuarios";

const Usuarios = ({ token }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchUsuarios = async () => {
      try {
        const response = await apiGet("/usuarios");
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

  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Cabeçalho com logo + título */}
      <div className="flex items-center mb-6">
        <img
          src="/Logo-Brasil-Rural-v2.png"
          alt="Brasil Rural Logo"
          className="h-12 mr-4"
        />
        <h1 className="text-3xl font-bold">Gestão de Usuários</h1>
      </div>

      {/* Barra de pesquisa */}
      <input
        type="text"
        placeholder="Buscar nome ou email"
        value={searchTerm}
        onChange={handleSearch}
        className="px-3 py-2 mb-6 w-full max-w-md border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
      />

      {/* Tabela modularizada */}
      <TabelaUsuarios usuarios={filteredUsuarios} loading={loading} />
    </div>
  );
};

export default Usuarios;
