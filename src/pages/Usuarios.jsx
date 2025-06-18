// src/pages/Usuarios.jsx
import React, { useState, useEffect } from "react";
import api from "../utils/api";
import TabelaGenerica from "../components/TabelaGenerica";
import EditarUsuarioModal from "../components/EditarUsuarioModal";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [filtro, setFiltro] = useState("");

  const fetchUsuarios = async () => {
    try {
      const response = await api.get("/usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      toast.error("Erro ao carregar usuários.");
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleDeleteUsuario = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;
    try {
      await api.delete(`/usuarios/${id}`);
      toast.success("Usuário excluído com sucesso.");
      fetchUsuarios();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      toast.error("Erro ao excluir usuário.");
    }
  };

  const handleEditUsuario = (usuario) => {
    setUsuarioSelecionado(usuario);
    setShowModal(true);
  };

  const handleSaveUsuario = async (usuario) => {
    try {
      const { id, password, ...restante } = usuario;
      const dados = password ? usuario : restante;
      const metodo = id ? api.put : api.post;
      const url = id ? `/usuarios/${id}` : "/criar_usuario";

      await metodo(url, dados);
      toast.success(`Usuário ${id ? "atualizado" : "criado"} com sucesso.`);
      setShowModal(false);
      setUsuarioSelecionado(null);
      fetchUsuarios();
    } catch (err) {
      console.error("Erro ao salvar usuário:", err);
      toast.error("Erro ao salvar usuário.");
    }
  };

  const colunas = [
    { campo: "username", rotulo: "Usuário" },
    { campo: "email", rotulo: "E-mail" },
    { campo: "cria_usuario", rotulo: "Pode criar usuários?" },
  ];

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.username.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Buscar usuário..."
          className="border p-2 rounded w-64"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <button
          onClick={() => {
            setUsuarioSelecionado(null);
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Adicionar
        </button>
      </div>

      <TabelaGenerica
        colunas={colunas}
        dados={filteredUsuarios}
        renderAcoes={(usuario) => (
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleEditUsuario(usuario)}
              className="text-blue-600 hover:text-blue-800"
              title="Editar usuário"
            >
              <FiEdit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDeleteUsuario(usuario.id)}
              className="text-red-600 hover:text-red-800"
              title="Excluir usuário"
            >
              <FaTrash />
            </button>
          </div>
        )}
      />

      <EditarUsuarioModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setUsuarioSelecionado(null);
        }}
        onSave={handleSaveUsuario}
        initialData={usuarioSelecionado}
      />
    </div>
  );
};

export default Usuarios;
