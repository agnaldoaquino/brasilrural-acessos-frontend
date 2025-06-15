import api from "../utils/api";
import { useEffect, useState } from "react";
import FiltroAcessos from "../components/FiltroAcessos";
import TabelaGenerica from "../components/TabelaGenerica";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { HiOutlinePencil } from "react-icons/hi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import SenhaCell from "../components/SenhaCell";
import EditarAcessoModal from "../components/EditarAcessoModal";
import { getNomeUsuarioLogado } from "../utils/auth.js";

function Acessos() {
  const [acessos, setAcessos] = useState([]);
  const [servicoFiltro, setServicoFiltro] = useState("");
  const [empresaFiltro, setEmpresaFiltro] = useState("");
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAcesso, setSelectedAcesso] = useState(null);

  const handleEditClick = (acesso) => {
    setSelectedAcesso(acesso);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedAcesso(null);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    const confirm = window.confirm("Deseja realmente excluir este acesso?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/acessos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Acesso excluído com sucesso");
      fetchAcessos();
    } catch (error) {
      console.error("Erro ao excluir:", error);
      toast.error("Erro ao excluir o acesso");
    }
  };

  const handleSaveAcesso = (formData) => {
    const token = localStorage.getItem("token");

    const payload = {
      ...formData,
      atualizado_por: getNomeUsuarioLogado(),
    };

    const isEdicao = !!formData.id;
    const url = isEdicao ? `/acessos/${formData.id}` : "/acessos";
    const metodo = isEdicao ? api.put : api.post;

    metodo(url, payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        toast.success(`Acesso ${isEdicao ? "atualizado" : "criado"} com sucesso.`);
        handleCloseModal();
        fetchAcessos(true);
      })
      .catch((err) => {
        console.error("Erro ao salvar:", err.response?.data || err.message || err);
        toast.error("Erro ao salvar acesso.");
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAcesso(null);
  };

  const fetchAcessos = (exibirToast = false) => {
    setLoading(true);

    api
      .get("/acessos")
      .then((response) => {
        setAcessos(response.data);
        if (exibirToast) toast.success("Acessos carregados com sucesso.");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Falha ao buscar acessos.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAcessos(); // não exibe toast na carga inicial
  }, []);

  const filtrarAcessos = () => {
    return acessos.filter((item) => {
      const servicoMatch = servicoFiltro ? item.servico === servicoFiltro : true;
      const empresaMatch = empresaFiltro ? item.empresa === empresaFiltro : true;
      const buscaMatch = busca
        ? item.usuario?.toLowerCase().includes(busca.toLowerCase()) ||
          item.servico?.toLowerCase().includes(busca.toLowerCase()) ||
          item.empresa?.toLowerCase().includes(busca.toLowerCase())
        : true;

      return servicoMatch && empresaMatch && buscaMatch;
    });
  };

  const colunas = [
    { titulo: "Acesso", campo: "acesso" },
    { titulo: "Empresa", campo: "empresa" },
    { titulo: "Usuário", campo: "usuario" },
    {
      titulo: "Senha",
      campo: "senha",
      render: (valor) => <SenhaCell senha={valor} />,
    },
    {
      titulo: "URL",
      campo: "url",
      render: (valor) =>
        valor ? (
          <a
            href={valor}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {valor}
          </a>
        ) : (
          "-"
        ),
    },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex items-center mb-6">
        <img
          src="/Logo-Brasil-Rural-v2.png"
          alt="Brasil Rural Logo"
          className="h-24 mr-4"
        />
        <h1 className="text-3xl font-bold">Acessos</h1>
      </div>

      <FiltroAcessos
        acessos={acessos}
        servicoFiltro={servicoFiltro}
        setServicoFiltro={setServicoFiltro}
        empresaFiltro={empresaFiltro}
        setEmpresaFiltro={setEmpresaFiltro}
        busca={busca}
        setBusca={setBusca}
      />

      {loading ? (
        <div className="text-center text-blue-600 font-semibold mb-4">
          Carregando acessos...
        </div>
      ) : (
        <TabelaGenerica
          colunas={colunas}
          dados={filtrarAcessos()}
          onRefreshClick={() => fetchAcessos(true)}
          onAddClick={handleAddClick}
          renderAcoes={(acesso) => (
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditClick(acesso)}
                className="text-blue-600 hover:text-blue-800"
                title="Editar acesso"
              >
                <HiOutlinePencil />
              </button>
              <button
                onClick={() => handleDeleteClick(acesso.id)}
                className="text-red-600 hover:text-red-800"
                title="Excluir acesso"
              >
                <FaTrash />
              </button>
            </div>
          )}
        />
      )}

      <EditarAcessoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialData={selectedAcesso}
        onSave={handleSaveAcesso}
      />
    </div>
  );
}

export default Acessos;
