// src/components/EditarAcessoModal.jsx

import { useState, useEffect } from "react";

function EditarAcessoModal({ isOpen, onClose, initialData, onSave }) {
  const [formData, setFormData] = useState({
    acesso: "",
    empresa: "",
    usuario: "",
    senha: "",
    url: "",
    cnpj: "",
    contato: "",
    observacao: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || "",
        acesso: initialData.acesso || "",
        empresa: initialData.empresa || "",
        usuario: initialData.usuario || "",
        senha: initialData.senha || "",
        url: initialData.url || "",
        cnpj: initialData.cnpj || "",
        contato: initialData.contato || "",
        observacao: initialData.observacao || "",
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-xl w-full">
        <h2 className="text-xl font-bold mb-4">Editar Acesso</h2>

        {/* Formulário */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Acesso</label>
            <input
              type="text"
              value={formData.acesso}
              onChange={(e) =>
                setFormData({ ...formData, acesso: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Empresa</label>
            <input
              type="text"
              value={formData.empresa}
              onChange={(e) =>
                setFormData({ ...formData, empresa: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Usuário</label>
            <input
              type="text"
              value={formData.usuario}
              onChange={(e) =>
                setFormData({ ...formData, usuario: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-700 mb-1">Senha</label>
              <input
                type="text"
                value={formData.senha}
                onChange={(e) =>
                  setFormData({ ...formData, senha: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm text-gray-700 mb-1">URL</label>
              <input
                type="text"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <hr className="my-4" />

          <div>
            <label className="block text-sm text-gray-700 mb-1">CNPJ</label>
            <input
              type="text"
              value={formData.cnpj}
              onChange={(e) =>
                setFormData({ ...formData, cnpj: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Contato</label>
            <input
              type="text"
              value={formData.contato}
              onChange={(e) =>
                setFormData({ ...formData, contato: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Observação</label>
            <textarea
              value={formData.observacao}
              onChange={(e) =>
                setFormData({ ...formData, observacao: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            ></textarea>
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Fechar
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditarAcessoModal;
