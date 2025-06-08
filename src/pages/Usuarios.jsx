import { useState, useEffect } from "react";
import { apiGet } from "../utils/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Usuarios = ({ token }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPasswordIds, setShowPasswordIds] = useState([]);
  const [selectedUsuarios, setSelectedUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await apiGet("/usuarios");
        setUsuarios(response);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
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

  // Debug: mostrar usuários selecionados no console
  useEffect(() => {
    console.log("Usuários selecionados:", selectedUsuarios);
  }, [selectedUsuarios]);

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Gestão de Usuários</h2>

      {/* Barra de pesquisa */}
      <input
        type="text"
        placeholder="Buscar nome ou email"
        value={searchTerm}
        onChange={handleSearch}
        style={{
          padding: "8px",
          width: "300px",
          marginBottom: "1rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      {/* Tabela */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>Selecionar</th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>Nome do usuário</th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>E-mail</th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>Senha</th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>Cria Usuários</th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>Data de Criação</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td style={{ padding: "8px", border: "1px solid #ddd", textAlign: "center" }}>
                <input
                  type="checkbox"
                  checked={selectedUsuarios.includes(usuario.id)}
                  onChange={() => handleCheckboxChange(usuario.id)}
                />
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>{usuario.username}</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>{usuario.email}</td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                {showPasswordIds.includes(usuario.id) ? (
                  <>
                    {usuario.password}{" "}
                    <FaEyeSlash
                      style={{ cursor: "pointer" }}
                      onClick={() => handleTogglePassword(usuario.id)}
                    />
                  </>
                ) : (
                  <>
                    {"••••••"}{" "}
                    <FaEye
                      style={{ cursor: "pointer" }}
                      onClick={() => handleTogglePassword(usuario.id)}
                    />
                  </>
                )}
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                {usuario.cria_usuario ? "Sim" : "Não"}
              </td>
              <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                {usuario.created_at}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;
