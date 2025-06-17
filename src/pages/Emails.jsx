import React, { useEffect, useState } from "react";
import TabelaGenerica from "../components/TabelaGenerica";
import EditarEmailModal from "../components/EditarEmailModal";
import EmailCell from "../components/EmailCell";
import EmailHistoricoModal from "../components/EmailHistoricoModal";
import { toast } from "react-toastify";
import { FiRefreshCw, FiPlus } from "react-icons/fi";
import { buscarEmailsCorporativos } from "../utils/api";

function Emails() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);
  const [emailSelecionado, setEmailSelecionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [emailIdHistorico, setEmailIdHistorico] = useState(null);

  const carregarEmails = async () => {
    setLoading(true);
    setErro(null);
    try {
      const dados = await buscarEmailsCorporativos();
      setEmails(dados);
      toast.success("E-mails carregados com sucesso!");
    } catch (erro) {
      console.error("Erro ao carregar e-mails:", erro);
      setErro("Erro ao buscar e-mails");
      toast.error("Erro ao buscar e-mails");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarEmails();
  }, []);

  const colunas = [
    { titulo: "E-mail", campo: "email", componente: EmailCell },
    { titulo: "Responsável", campo: "responsavel" },
    { titulo: "Senha", campo: "senha", componente: EmailCell },
    { titulo: "Observação", campo: "observacao" },
  ];

  const aoClicarEditar = (email) => {
    setEmailSelecionado(email);
    setMostrarModal(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">E-mails Corporativos</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMostrarModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <FiPlus /> Adicionar
          </button>
          <button
            onClick={carregarEmails}
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded"
            title="Atualizar"
          >
            <FiRefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <TabelaGenerica
        dados={emails}
        colunas={colunas}
        loading={loading}
        renderAcoes={(email) => (
          <div className="flex gap-2">
            <button
              onClick={() => aoClicarEditar(email)}
              className="text-blue-600 hover:underline text-sm"
            >
              Editar
            </button>
            <button
              onClick={() => setEmailIdHistorico(email.id)}
              className="text-gray-600 hover:underline text-sm"
            >
              Histórico
            </button>
          </div>
        )}
        onDoubleClick={(email) => aoClicarEditar(email)}
      />

      {mostrarModal && (
        <EditarEmailModal
          email={emailSelecionado}
          aoFechar={() => {
            setMostrarModal(false);
            setEmailSelecionado(null);
            carregarEmails();
          }}
        />
      )}

      {emailIdHistorico && (
        <EmailHistoricoModal
          emailId={emailIdHistorico}
          aoFechar={() => setEmailIdHistorico(null)}
        />
      )}
    </div>
  );
}

export default Emails;
