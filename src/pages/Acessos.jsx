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

  // Buscar acessos
  const fetchAcessos = (exibirToast = false) => {
    setLoading(true);

    api
      .get("/acessos")
      .then((response) => {
        console.log("Acessos recebidos:", response.data);
        setAcessos(response.data);

        if (exibirToast) {
          toast.success("Acessos carregados com sucesso.");
        }
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

  // Deletar acesso
  const handleDelete = (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este acesso?")) return;

    api
      .delete(`/acessos/${id}`)
      .then(() => {
        toast.success("Acesso excluído com sucesso.");
        fetchAcessos();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Erro ao excluir acesso.");
      });
  };

  // Editar acesso
  const handleEdit = (acesso) => {
    setSelectedAcesso(acesso);
    setIsModalOpen(true);
  };

  const handleSaveAcesso = (formData) => {
  if (!selectedAcesso?.id) {
    toast.error("ID do acesso não encontrado.");
    return;
  }

  // Remove o campo id do corpo da requisição
  const { id, ...formDataSemId } = formData;

  // Verifica se algum campo foi realmente alterado
  const camposEnviados = Object.entries(formDataSemId).filter(
    ([_, valor]) => valor !== "" && valor !== null && valor !== undefined
  );

  if (camposEnviados.length === 0) {
    toast.warning("Nenhuma informação foi alterada.");
    return;
  }

  const payload = {
    ...formDataSemId,
    atualizado_por: getNomeUsuarioLogado(),
  };

  console.log("ID enviado:", formData.id);
  console.log("Payload enviado:", payload);

  api
    .put(`/acessos/${selectedAcesso.id}`, payload)
    .then(() => {
      toast.success("Acesso atualizado com sucesso.");
      handleCloseModal();
      fetchAcessos(true);
    })
    .catch((err) => {
      console.error("Erro no PUT:", err.response?.data || err.message || err);
      toast.error("Erro ao atualizar acesso.");
    });
};

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAcesso(null);
  };

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

  const handleDeleteAll = () => {
    if (window.confirm("Tem certeza que deseja excluir todos os acessos?")) {
      toast.info("Função excluir todos ainda não implementada.");
    }
  };

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
  onDeleteAllClick={handleDeleteAll}
  renderAcoes={(acesso) => (
    <div className="flex space-x-2">
      <button
        onClick={() => handleEdit(acesso)}
        className="text-blue-600 hover:text-blue-800"
        title="Editar acesso"
      >
        <HiOutlinePencil />
      </button>
      <button
        onClick={() => handleDelete(acesso.id)}
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
