import { useEffect, useState } from "react";

function Acessos() {
  const [acessos, setAcessos] = useState([]);
  const [servicoFiltro, setServicoFiltro] = useState("");
  const [empresaFiltro, setEmpresaFiltro] = useState("");
  const [busca, setBusca] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch(`${import.meta.env.VITE_API_URL}/acessos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar acessos");
        }
        return res.json();
      })
      .then((data) => setAcessos(data))
      .catch((err) => {
        console.error(err);
        alert("Falha ao buscar acessos.");
      });
  }, [token]);

  const filtrarAcessos = () => {
    return acessos.filter((item) => {
      const servicoMatch = servicoFiltro ? item.servico === servicoFiltro : true;
      const empresaMatch = empresaFiltro ? item.empresa === empresaFiltro : true;
      const buscaMatch = busca
        ? item.usuario?.toLowerCase().includes(busca.toLowerCase()) ||
          item.servico?.toLowerCase().includes(busca.toLowerCase()) ||
          item.empresa?.toLowerCase().includes(busca.toLowerCase())
        : true;

      return servicoMatch && empresaMatch && buscaMatch;
    });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex items-center mb-6">
        <img
          src="/Logo-Brasil-Rural.png"
          alt="Brasil Rural Logo"
          className="h-12 mr-4"
        />
        <h1 className="text-3xl font-bold">Acessos</h1>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={servicoFiltro}
          onChange={(e) => setServicoFiltro(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Serviço</option>
          {[...new Set(acessos.map((a) => a.servico))]
            .filter((s) => s)
            .map((servico) => (
              <option key={servico} value={servico}>
                {servico}
              </option>
            ))}
        </select>

        <select
          value={empresaFiltro}
          onChange={(e) => setEmpresaFiltro(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Empresa</option>
          {[...new Set(acessos.map((a) => a.empresa))]
            .filter((e) => e)
            .map((empresa) => (
              <option key={empresa} value={empresa}>
                {empresa}
              </option>
            ))}
        </select>

        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar email, usuário, host"
          className="flex-1 p-2 border rounded"
        />

        <button
          className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => alert("Tela de Novo Acesso (em construção)")}
        >
          Novo acesso
        </button>
      </div>

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
            {filtrarAcessos().map((item, index) => (
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
            {filtrarAcessos().length === 0 && (
              <tr>
                <td className="p-3 border text-center" colSpan="6">
                  Nenhum acesso encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Acessos;
