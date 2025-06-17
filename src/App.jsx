import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import CriarUsuario from "./pages/CriarUsuario";
import Acessos from "./pages/Acessos";
import Usuarios from "./pages/Usuarios";
import Emails from "./pages/Emails";


import Sidebar from "./components/Sidebar";

// Importações do React Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      localStorage.removeItem("access_token");
    }
  }, [token]);

  return (
    <Router>
      <AppContent token={token} setToken={setToken} />
    </Router>
  );
}

function AppContent({ token, setToken }) {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    // Limpa localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("cria_usuario");

    // Limpa state
    setToken(null);

    // Toast
    toast.success("Logout realizado com sucesso!");

    // Redireciona
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Se não logado → só mostra Login
  if (!token) {
    return (
      <>
        <Routes>
          <Route path="/login" element={<Login onLogin={setToken} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </>
    );
  }

  // Se logado → mostra Sidebar + rotas protegidas
  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        onLogout={handleLogout} // <-- aqui estamos passando o onLogout correto
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        setToken={setToken} // <-- passamos também o setToken para a Sidebar
      />

      <main
        style={{
          flexGrow: 1,
          padding: "1rem",
          marginLeft: isSidebarCollapsed ? "60px" : "200px",
          transition: "margin-left 0.3s",
        }}
      >
        <Routes>
          <Route path="/" element={<Acessos token={token} />} />
          <Route path="/criar-usuario" element={<CriarUsuario token={token} />} />
          <Route path="/usuarios" element={<Usuarios token={token} />} />
          <Route path="/emails" element={<Emails token={token} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <ToastContainer position="top-center" autoClose={3000} />
      </main>
    </div>
  );
}

export default App;
