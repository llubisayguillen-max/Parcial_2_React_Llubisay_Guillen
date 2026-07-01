import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { FaHome, FaUsers, FaBook, FaSignOutAlt } from "react-icons/fa";

import "../styles/sidebar.css";

function Sidebar() {
  const { logout, user } = useContext(AuthContext);
  const esAdmin = user?.role === "admin";
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="sidebar">

      <h2 className="logo">Biblioteca</h2>

      <nav className="menu">

        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            isActive ? "link active" : "link"
          }
        >
          <FaHome />
          <span>Inicio</span>
        </NavLink>

          {esAdmin && (
            <NavLink
              to="/dashboard/autores"
              className={({ isActive }) =>
                isActive ? "link active" : "link"
              }
            >
              <FaUsers />
              <span>Autores</span>
            </NavLink>
          )}

        <NavLink
          to="/dashboard/libros"
          className={({ isActive }) =>
            isActive ? "link active" : "link"
          }
        >
          <FaBook />
          <span>Libros</span>
        </NavLink>

      </nav>

      <button className="logout" onClick={handleLogout}>
        <FaSignOutAlt />
        <span>Cerrar sesión</span>
      </button>

    </aside>
  );
}

export default Sidebar;