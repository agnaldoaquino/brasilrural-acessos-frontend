import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import CriarUsuario from "./pages/CriarUsuario";
import Acessos from "./pages/Acessos";

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

// Separação para usar useNavigate com segurança
function AppContent({ token, setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/login");
  };

  return (
    <div style={{ padding: "1rem" }}>
      {token && (
        <button
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            padding: "0.5rem 1rem",
            backgroundColor: "#d9534f",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={handleLogout}
        >
          Sair
        </button>
      )}

      <Routes>
        <Route path="/" element={token ? <Acessos token={token} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={setToken} />} />
        <Route path="/criar-usuario" element={token ? <CriarUsuario token={token} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
