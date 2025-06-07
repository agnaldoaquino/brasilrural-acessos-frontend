import React, { useState } from 'react';

function CriarUsuario() {
  const token = localStorage.getItem("access_token");

  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append('novo_username', username);
      formData.append('nova_senha', senha);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/criar_usuario`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem(data.mensagem);
        setErro('');
        setUsername('');
        setSenha('');
      } else {
        setErro(data.detail || 'Erro ao criar usuário');
        setMensagem('');
      }
    } catch (error) {
      setErro('Erro de conexão com o servidor');
      setMensagem('');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Criar Novo Usuário</h2>
      <form onSubmit={handleSubmit}>
        <label>Usuário:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit">Criar Usuário</button>
      </form>

      {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </div>
  );
}

export default CriarUsuario;
