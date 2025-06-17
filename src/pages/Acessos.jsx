import api from "../utils/api";
import { useEffect, useState } from "react";
import FiltroAcessos from "../components/FiltroAcessos";
import TabelaGenerica from "../components/TabelaGenerica";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import SenhaCell from "../components/SenhaCell";
import EditarAcessoModal from "../components/EditarAcessoModal";
import { getNomeUsuarioLogado } from "../utils/auth.js";
import UrlCell from "../components/UrlCell";
import { FiCopy } from "react-icons/fi";

function Acessos() {
  const [acessos, setAcessos] = useState([]);
  const [acessoFiltro, setAcessoFiltro] = useState("");
  const [empresaFiltro, setEmpresaFiltro] = useState("");
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAcesso, setSelectedAcesso] = useState(null);

  const handleEditClick = (acesso) => {
    console.log("EDITANDO:", acesso);
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
        fetchAcessos(false);
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
      const acessoMatch = acessoFiltro ? item.acesso === acessoFiltro : true;
      const empresaMatch = empresaFiltro ? item.empresa === empresaFiltro : true;
      const buscaMatch = busca
        ? item.acesso?.toLowerCase().includes(busca.toLowerCase()) ||
          item.usuario?.toLowerCase().includes(busca.toLowerCase()) ||
          item.empresa?.toLowerCase().includes(busca.toLowerCase()) ||
          item.url?.toLowerCase().includes(busca.toLowerCase())
        : true;

      return acessoMatch && empresaMatch && buscaMatch;
    });
  };

  const colunas = [
    { titulo: "Acesso", campo: "acesso" },
    { titulo: "Empresa", campo: "empresa" },
    {
  titulo: "Usuário",
  campo: "usuario",
  render: (valor) => (
    <div className="relative pr-3">
      <span className="truncate block max-w-[180px]">{valor}</span>
      <button
        onClick={() => {
          navigator.clipboard.writeText(valor);
          toast.success("Usuário copiado!");
        }}
        title="Copiar usuário"
        className="absolute top-1/2 right-1 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
      >
        <FiCopy className="w-4 h-4" />
      </button>
    </div>
  ),
},
    {
      titulo: "Senha",
      campo: "senha",
      render: (valor) => <SenhaCell senha={valor} />,
    },
    {
  titulo: "URL",
  campo: "url",
  render: (valor) => <UrlCell url={valor} />,
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

      <div className="flex items-end justify-between mb-4 gap-4 flex-wrap">
  <div className="flex flex-col justify-end flex-1 min-w-[300px]">
  <FiltroAcessos
    acessos={acessos}
    acessoFiltro={acessoFiltro}
    setAcessoFiltro={setAcessoFiltro}
    empresaFiltro={empresaFiltro}
    setEmpresaFiltro={setEmpresaFiltro}
    busca={busca}
    setBusca={setBusca}
  />
</div>
  <button
  onClick={handleAddClick}
  className="px-4 py-[9px] bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center"
>
  <span className="text-xl mr-2">+</span> Adicionar
</button>
</div>

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
          onEditClick={handleEditClick}
          renderAcoes={(acesso) => (
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleEditClick(acesso)}
                className="text-blue-600 hover:text-blue-800"
                title="Editar acesso"
              >
                <FiEdit className="w-4 h-4" />
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
