import React, { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { HiOutlinePencil } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";


const TabelaGenerica = ({ colunas, dados, renderAcoes, onRefreshClick }) => {
  const [ordenarPor, setOrdenarPor] = useState("");
  const [ordemAscendente, setOrdemAscendente] = useState(true);

  const handleOrdenar = (campo) => {
    if (ordenarPor === campo) {
      setOrdemAscendente(!ordemAscendente);
    } else {
      setOrdenarPor(campo);
      setOrdemAscendente(true);
    }
  };

  const dadosOrdenados = [...dados].sort((a, b) => {
    if (!ordenarPor) return 0;

    const valorA = a[ordenarPor];
    const valorB = b[ordenarPor];

    if (typeof valorA === "string") {
      return ordemAscendente
        ? valorA.localeCompare(valorB)
        : valorB.localeCompare(valorA);
    }

    if (typeof valorA === "number") {
      return ordemAscendente ? valorA - valorB : valorB - valorA;
    }

    return 0;
  });

  return (
    <div className="overflow-x-auto bg-white rounded shadow mt-4">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-200">
          <tr>
            {colunas.map((coluna) => (
              <th
                key={coluna.campo}
                className="p-3 border cursor-pointer text-gray-700 font-bold uppercase tracking-wider text-xs"
                onClick={() => handleOrdenar(coluna.campo)}
              >
                <div className="flex items-center">
                  {coluna.titulo}
                  {ordenarPor === coluna.campo && (
                    <span className="ml-1">
                      {ordemAscendente ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </div>
              </th>
            ))}

            {renderAcoes && (
  <th className="p-3 border text-gray-700 font-bold uppercase tracking-wider text-xs">
  <div className="flex justify-between items-center">
    <span>Ações</span>
    <button
      type="button"
      onClick={onRefreshClick}
      title="Recarregar acessos"
      className="p-1 rounded text-gray-700 hover:text-gray-900 hover:bg-gray-200 cursor-pointer"
    >
      <FiRefreshCw className="w-4 h-4" />
    </button>
  </div>
</th>
)}
          </tr>
        </thead>
        <tbody>
          {dadosOrdenados.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              {colunas.map((coluna) => (
                <td key={coluna.campo} className="p-3 border whitespace-nowrap">
                  {coluna.render
                    ? coluna.render(item[coluna.campo], item)
                    : item[coluna.campo]}
                </td>
              ))}

              {renderAcoes && (
                <td className="p-3 border whitespace-nowrap">
  <div className="flex justify-between items-center w-full">
    <div className="pl-2">
      <button
        onClick={() => onEditClick(item)}
        className="text-blue-600 hover:text-blue-800"
        title="Editar acesso"
      >
        <HiOutlinePencil />
      </button>
    </div>
    <div className="pr-2">
      <button
        onClick={() => onDeleteClick(item.id)}
        className="text-red-600 hover:text-red-800 translate-x-1"
        title="Excluir acesso"
      >
        <FaTrash />
      </button>
    </div>
  </div>
</td>
              )}
            </tr>
          ))}

          {dadosOrdenados.length === 0 && (
            <tr>
              <td
                colSpan={colunas.length + (renderAcoes ? 1 : 0)}
                className="p-3 border text-center text-gray-500"
              >
                Nenhum registro encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaGenerica;
