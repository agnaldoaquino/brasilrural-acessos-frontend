import { useEffect, useState } from "react";

function Acessos({ token }) {
  const [acessos, setAcessos] = useState([]);

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

  return (
    <div>
      <h1>Acessos</h1>
      <ul>
        {acessos.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}

export default Acessos;
