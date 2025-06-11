import { useState } from "react";
import { FiEye, FiEyeOff, FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";


function SenhaCell({ senha }) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

const copiarSenha = () => {
  navigator.clipboard.writeText(senha).then(() => {
    toast.success("Senha copiada para a área de transferência.", {
  autoClose: 100,
}); // Opcional: você pode colocar um toast aqui se quiser
    console.log("Senha copiada!");
  });
};  

  return (
    <div className="flex justify-between items-center w-full">
  <span className="tracking-widest">
    {mostrarSenha ? senha : "••••••••"}
  </span>
  <div className="flex items-center space-x-2 ml-2">
    <button
      type="button"
      onClick={copiarSenha}
      className="p-1 rounded text-gray-700 hover:text-gray-900 hover:bg-gray-200 cursor-pointer"
      title="Copiar senha"
    >
      <FiCopy className="w-4 h-4" />
    </button>
    <button
      type="button"
      onClick={() => setMostrarSenha(!mostrarSenha)}
      className="p-1 rounded text-gray-700 hover:text-gray-900 hover:bg-gray-200 cursor-pointer"
      title={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
    >
      {mostrarSenha ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
    </button>
  </div>
</div>
  );
}

export default SenhaCell;
