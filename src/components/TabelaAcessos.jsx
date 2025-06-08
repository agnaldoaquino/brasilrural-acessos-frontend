function TabelaAcessos({ acessos }) {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 border">Serviço</th>
            <th className="p-3 border">Empresa</th>
            <th className="p-3 border">Usuário</th>
            <th className="p-3 border">Senha</th>
            <th className="p-3 border">Ativo</th>
            <th className="p-3 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {acessos.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-3 border">{item.servico || "—"}</td>
              <td className="p-3 border">{item.empresa || "—"}</td>
              <td className="p-3 border">{item.usuario || "—"}</td>
              <td className="p-3 border">•••••</td>
              <td className="p-3 border text-center">
                {item.ativo ? (
                  <span className="inline-block w-3 h-3 bg-blue-600 rounded-full"></span>
                ) : (
                  <span className="inline-block w-3 h-3 bg-gray-400 rounded-full"></span>
                )}
              </td>
              <td className="p-3 border text-center space-x-2">
                <button
                  onClick={() => alert("Ver acesso (em construção)")}
                  className="text-blue-600 hover:text-blue-800"
                >
                  👁️
                </button>
                <button
                  onClick={() => alert("Editar acesso (em construção)")}
                  className="text-blue-600 hover:text-blue-800"
                >
                  🧑
                </button>
              </td>
            </tr>
          ))}
          {acessos.length === 0 && (
            <tr>
              <td className="p-3 border text-center" colSpan="6">
                Nenhum acesso encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaAcessos;
