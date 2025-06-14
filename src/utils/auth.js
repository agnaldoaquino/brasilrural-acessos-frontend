import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export function getNomeUsuarioLogado() {
  const token = localStorage.getItem("access_token");
  if (!token) {
    console.log("Token não encontrado.");
    return null;
  }

  try {
    const decoded = jwtDecode(token);
    console.log("Token decodificado:", decoded); // ADICIONADO para você ver o conteúdo

    // Ajuste aqui conforme o campo que o seu token tiver
    return decoded.nome || decoded.sub || decoded.username || decoded.email || null;
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    toast.error("Erro ao decodificar token. Faça login novamente.");
    return null;
  }
}
