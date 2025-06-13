import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export function getNomeUsuarioLogado() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode(token);

    return decoded.sub || decoded.username || decoded.email || null;
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    toast.error("Erro ao decodificar token. Faça login novamente.");
    return null;
  }
}
