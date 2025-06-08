import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import CriarUsuario from "./pages/CriarUsuario";
import Acessos from "./pages/Acessos";
import Usuarios from "./pages/Usuarios";

import Sidebar from "./components/Sidebar";

// Importações do React Toastify
import { ToastContainer } from "react-toastify";
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

  const handleLogout = () => {
    setToken(null);
    navigate("/login");
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
      <Sidebar onLogout={handleLogout} />

      <main style={{ flexGrow: 1, padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Acessos token={token} />} />
          <Route path="/criar-usuario" element={<CriarUsuario token={token} />} />
          <Route path="/usuarios" element={<Usuarios token={token} />} /> {/* opcional */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <ToastContainer position="top-center" autoClose={3000} />
      </main>
    </div>
  );
}

export default App;
