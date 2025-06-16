// components/UrlCell.jsx
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";

const UrlCell = ({ url }) => {
  const copiarParaAreaDeTransferencia = () => {
    navigator.clipboard.writeText(url);
    toast.success("URL copiada para a área de transferência.");
  };

  if (!url) return "-";

  return (
    <div className="flex items-center space-x-2 max-w-[240px]">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline truncate"
      >
        {url}
      </a>
      <button
        onClick={copiarParaAreaDeTransferencia}
        title="Copiar URL"
        className="text-gray-500 hover:text-gray-700"
      >
        <FaRegCopy />
      </button>
    </div>
  );
};

export default UrlCell;
