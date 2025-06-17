import React from "react";
import { FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";

function EmailCell({ valor }) {
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(valor);
      toast.success("E-mail copiado!");
    } catch (err) {
      toast.error("Erro ao copiar o e-mail.");
    }
  };

  return (
    <div className="flex items-center justify-between w-full gap-2">
      <span className="truncate text-sm text-gray-800 flex-1">{valor}</span>
      <button
        onClick={copiar}
        title="Copiar e-mail"
        className="p-1 rounded text-gray-700 hover:text-gray-900 hover:bg-gray-200 cursor-pointer"
      >
        <FiCopy className="w-4 h-4" />
      </button>
    </div>
  );
}

export default EmailCell;
