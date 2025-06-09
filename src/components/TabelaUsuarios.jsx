import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const TabelaUsuarios = ({ usuarios, loading }) => {
  const [showPasswordIds, setShowPasswordIds] = useState([]);
  const [selectedUsuarios, setSelectedUsuarios] = useState([]);

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

  if (loading) {
    return (
      <div className="text-center text-blue-600 font-semibold mb-4">
        Carregando usuários...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase tracking-wider">
              Selecionar
            </th>
            <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase tracking-wider">
              Nome do usuário
            </th>
            <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase tracking-wider">
              E-mail
            </th>
            <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase tracking-wider">
              Senha
            </th>
            <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase tracking-wider">
              Cria Usuários
            </th>
            <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase tracking-wider">
              Data de Criação
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {usuarios.map((usuario) => (
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
  );
};

export default TabelaUsuarios;
