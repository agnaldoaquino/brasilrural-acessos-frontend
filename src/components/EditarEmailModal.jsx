import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { atualizarEmailCorporativo, criarEmailCorporativo } from "../utils/api";

function EditarEmailModal({ email, aoFechar }) {
  const [emailInput, setEmailInput] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [senha, setSenha] = useState("");
  const [observacao, setObservacao] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (email) {
      setEmailInput(email.email || "");
      setResponsavel(email.responsavel || "");
      setSenha(email.senha || "");
      setObservacao(email.observacao || "");
    }
  }, [email]);

  const salvar = async () => {
    if (!emailInput || !responsavel || !senha) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }
    setCarregando(true);
    try {
      if (email?.id) {
        await atualizarEmailCorporativo(email.id, {
          email: emailInput,
          responsavel,
          senha,
          observacao,
        });
        toast.success("E-mail atualizado com sucesso!");
      } else {
        await criarEmailCorporativo({
          email: emailInput,
          responsavel,
          senha,
          observacao,
        });
        toast.success("E-mail criado com sucesso!");
      }
      aoFechar();
    } catch (erro) {
      console.error("Erro ao salvar e-mail:", erro);
      toast.error("Erro ao salvar e-mail");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">
          {email ? "Editar E-mail" : "Novo E-mail"}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">E-mail</label>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              disabled={!!email?.id} // E-mail fixo na edição
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Responsável</label>
            <input
              type="text"
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Senha</label>
            <input
              type="text"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Observação</label>
            <textarea
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              rows={3}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={aoFechar}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            disabled={carregando}
          >
            Cancelar
          </button>
          <button
            onClick={salvar}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            disabled={carregando}
          >
            {carregando ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditarEmailModal;
