export async function apiGet(path) {
  const token = localStorage.getItem("token"); // ou sessionStorage se você migrar depois
  const response = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar ${path}: ${response.status}`);
  }

  return await response.json();
}

export async function apiPost(path, body) {
  const token = localStorage.getItem("token"); // ou sessionStorage
  const response = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Erro ao enviar ${path}: ${response.status}`);
  }

  return await response.json();
}
