function FiltroAcessos({
  acessos,
  servicoFiltro,
  setServicoFiltro,
  empresaFiltro,
  setEmpresaFiltro,
  busca,
  setBusca,
}) {
  return (
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
    </div>
  );
}

export default FiltroAcessos;
