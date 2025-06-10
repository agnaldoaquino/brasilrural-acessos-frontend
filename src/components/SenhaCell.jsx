import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

function SenhaCell({ senha }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <div className="flex justify-between items-center w-full">
      <span className="tracking-widest">
        {mostrarSenha ? senha : "••••••••"}
      </span>
      <button
        type="button"
        onClick={() => setMostrarSenha(!mostrarSenha)}
        className="p-1 rounded text-gray-700 hover:text-gray-900 hover:bg-gray-200 cursor-pointer ml-2"
        title={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
      >
        {mostrarSenha ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
      </button>
    </div>
  );
}

export default SenhaCell;
