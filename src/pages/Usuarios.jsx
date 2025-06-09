import { useState, useEffect } from "react";
import { apiGet } from "../utils/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Usuarios = ({ token }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPasswordIds, setShowPasswordIds] = useState([]);
  const [selectedUsuarios, setSelectedUsuarios] = useState([]);
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

  const handleTogglePassword = (id) => {
    setShowPasswordIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleCheckboxChange = (id) => {
    setSelectedUsuarios((prev) =>
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

      {/* Tabela */}
      {loading ? (
        <div className="text-center text-blue-600 font-semibold mb-4">
          Carregando usuários...
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Selecionar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome do usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  E-mail
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Senha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cria Usuários
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data de Criação
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <input
                      type="checkbox"
                      checked={selectedUsuarios.includes(usuario.id)}
                      onChange={() => handleCheckboxChange(usuario.id)}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {usuario.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {usuario.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {showPasswordIds.includes(usuario.id) ? (
                      <>
                        {usuario.password}{" "}
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
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {usuario.cria_usuario ? "Sim" : "Não"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {usuario.created_at}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
