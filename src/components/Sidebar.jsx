import { NavLink, useNavigate } from "react-router-dom";
import { MdListAlt, MdPersonAdd, MdPeople, MdLogout, MdMenu } from "react-icons/md";
import { toast } from "react-toastify";

const Sidebar = ({ isCollapsed, toggleSidebar, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpa localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("cria_usuario");

    // Limpa o state de token (se for passado)
    if (setToken) setToken("");

    // Toast de sucesso
    toast.success("Logout realizado com sucesso!");

    // Redireciona para login
    navigate("/login");
  };

  const menuItems = [
    { path: "/", label: "Acessos", icon: <MdListAlt size={24} /> },
    { path: "/criar-usuario", label: "Criar Usuário", icon: <MdPersonAdd size={24} /> },
    { path: "/usuarios", label: "Usuários", icon: <MdPeople size={24} /> },
  ];

  return (
    <div
      style={{
        width: isCollapsed ? "60px" : "200px",
        backgroundColor: "#004050", // teal escuro institucional
        color: "white",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s",
        zIndex: 1000,
      }}
    >
      {/* Botão retrátil */}
      <div
        style={{
          padding: "1rem",
          display: "flex",
          justifyContent: isCollapsed ? "center" : "flex-end",
          cursor: "pointer",
        }}
        onClick={toggleSidebar}
      >
        <MdMenu size={24} />
      </div>

      {/* Menu de navegação */}
      <nav style={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              padding: "0.75rem 1rem",
              color: isActive ? "#35B9BC" : "white", // azul institucional quando ativo
              textDecoration: "none",
              backgroundColor: isActive ? "#001F28" : "transparent",
              transition: "background-color 0.2s",
            })}
          >
            <div style={{ marginRight: isCollapsed ? 0 : "10px" }}>{item.icon}</div>
            {!isCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Botão de logout */}
      <div
        style={{
          padding: "1rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "flex-start",
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
        }}
        onClick={handleLogout}
      >
        <MdLogout size={24} />
        {!isCollapsed && <span style={{ marginLeft: "10px" }}>Sair</span>}
      </div>
    </div>
  );
};

export default Sidebar;
