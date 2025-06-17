function FiltroAcessos({
  acessos,
  acessoFiltro,
  setAcessoFiltro,
  empresaFiltro,
  setEmpresaFiltro,
  busca,
  setBusca,
}) {
  return (
    <div className="flex flex-wrap items-end gap-4 w-full">
      <select
        value={acessoFiltro}
        onChange={(e) => setAcessoFiltro(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">Acesso</option>
        {[...new Set(acessos.map((a) => a.acesso))]
          .filter((s) => s)
          .map((acesso) => (
            <option key={acesso} value={acesso}>
              {acesso}
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
