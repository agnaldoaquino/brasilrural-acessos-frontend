export async function apiGet(path) {
  const token = localStorage.getItem("access_token"); // seu token é "access_token" no projeto atual
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
  const token = localStorage.getItem("access_token");
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

export async function apiPut(path, body) {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Erro ao atualizar ${path}: ${response.status}`);
  }

  return await response.json();
}

export async function apiDelete(path) {
  const token = localStorage.getItem("access_token");
  const response = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao deletar ${path}: ${response.status}`);
  }

  return await response.json();
}

// 👇 Adicionado export default api (padrão para seu projeto)
const api = {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
};

export default api;
