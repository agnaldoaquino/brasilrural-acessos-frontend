import jwt_decode from "jwt-decode";

export function getNomeUsuarioLogado() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt_decode(token);
    // Aqui você precisa ver qual campo o seu token tem.
    // Na maioria dos casos, é sub, username ou email.
    // Vou colocar "sub" como exemplo, depois a gente testa:

    return decoded.sub || decoded.username || decoded.email || null;
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
}
