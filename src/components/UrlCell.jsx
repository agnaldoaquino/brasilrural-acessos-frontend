// components/UrlCell.jsx
import { FiCopy } from "react-icons/fi";
import { toast } from "react-toastify";

const UrlCell = ({ url }) => {
  const copiarParaAreaDeTransferencia = () => {
    navigator.clipboard.writeText(url);
    toast.success("URL copiada para a área de transferência.");
  };

  if (!url) return "-";

 return (
  <div className="flex items-center w-full">
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 text-blue-600 hover:underline truncate"
    >
      {url}
    </a>
    <button
      onClick={copiarParaAreaDeTransferencia}
      title="Copiar URL"
      className="p-1 rounded text-gray-700 hover:text-gray-900 hover:bg-gray-200 cursor-pointer ml-2"
    >
      <FiCopy className="w-4 h-4" />
    </button>
  </div>
);
};

export default UrlCell;
