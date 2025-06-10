import api from "../utils/api";
import { useEffect, useState } from "react";
import FiltroAcessos from "../components/FiltroAcessos";
import TabelaGenerica from "../components/TabelaGenerica";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

function Acessos() {
  const [acessos, setAcessos] = useState([]);
  const [servicoFiltro, setServicoFiltro] = useState("");
  const [empresaFiltro, setEmpresaFiltro] = useState("");
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(false);

  // Buscar acessos
  const fetchAcessos = () => {
    setLoading(true);

    api
      .get("/acessos")
      .then((response) => {
        console.log("Acessos recebidos:", response.data);
        setAcessos(response.data);
        toast.success("Acessos carregados com sucesso.");
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
    fetchAcessos();
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
    { titulo: "Serviço", campo: "servico" },
    { titulo: "Empresa", campo: "empresa" },
    { titulo: "Usuário", campo: "usuario" },
    { titulo: "Senha", campo: "senha" },
    { titulo: "Observação", campo: "observacao" },
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
          renderAcoes={(acesso) => (
            <button
              onClick={() => handleDelete(acesso.id)}
              className="text-red-600 hover:text-red-800"
              title="Excluir acesso"
            >
              <FaTrash />
            </button>
          )}
        />
      )}
    </div>
  );
}

export default Acessos;
