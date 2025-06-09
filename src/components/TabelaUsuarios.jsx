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
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border">Selecionar</th>
            <th className="p-3 border">Nome do usuário</th>
            <th className="p-3 border">E-mail</th>
            <th className="p-3 border">Senha</th>
            <th className="p-3 border">Cria Usuários</th>
            <th className="p-3 border">Data de Criação</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr
              key={usuario.id}
              className="hover:bg-gray-100"
            >
              <td className="p-3 border text-center">
                <input
                  type="checkbox"
                  checked={selectedUsuarios.includes(usuario.id)}
                  onChange={() => handleCheckboxChange(usuario.id)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
              </td>
              <td className="p-3 border">{usuario.username}</td>
              <td className="p-3 border">{usuario.email}</td>
              <td className="p-3 border">
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
              <td className="p-3 border">
                {usuario.cria_usuario ? "Sim" : "Não"}
              </td>
              <td className="p-3 border">{usuario.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaUsuarios;
