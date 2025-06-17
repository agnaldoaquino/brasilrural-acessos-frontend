import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { buscarHistoricoEmail } from "../utils/api";

function EmailHistoricoModal({ emailId, aoFechar }) {
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarHistorico = async () => {
      try {
        const dados = await buscarHistoricoEmail(emailId);
        setHistorico(dados);
      } catch (erro) {
        console.error("Erro ao buscar histórico:", erro);
        toast.error("Erro ao carregar histórico");
      } finally {
        setCarregando(false);
      }
    };

    if (emailId) carregarHistorico();
  }, [emailId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Histórico de Responsáveis</h2>

        {carregando ? (
          <p>Carregando...</p>
        ) : historico.length === 0 ? (
          <p className="text-gray-600">Nenhum histórico registrado.</p>
        ) : (
          <table className="w-full text-sm border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2 border">Responsável</th>
                <th className="text-left p-2 border">Início</th>
                <th className="text-left p-2 border">Fim</th>
                <th className="text-left p-2 border">Observação</th>
              </tr>
            </thead>
            <tbody>
              {historico.map((registro) => (
                <tr key={registro.id} className="border-t">
                  <td className="p-2 border">{registro.responsavel}</td>
                  <td className="p-2 border">{new Date(registro.data_inicio).toLocaleString()}</td>
                  <td className="p-2 border">
                    {registro.data_fim
                      ? new Date(registro.data_fim).toLocaleString()
                      : "Atual"}
                  </td>
                  <td className="p-2 border">{registro.observacao || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={aoFechar}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailHistoricoModal;
