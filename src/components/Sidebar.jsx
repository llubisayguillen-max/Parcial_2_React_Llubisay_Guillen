import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaUserGraduate } from "react-icons/fa";

import { FaHome, FaUsers, FaBook, FaSignOutAlt } from "react-icons/fa";

import "../styles/sidebar.css";
import userImg from "../assets/usr.png";

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

  {/* HEADER DEL SIDEBAR */}
  <div className="sidebar-header">

    <div className="user-section">
      <FaUserGraduate className="sidebar-icon-user" />

      <span className="user-email">
        {user?.email || user?.user}
      </span>
    </div>

  </div>

  {/* MENU */}
  <nav className="menu">

    <NavLink
      to="/dashboard"
      end
      className={({ isActive }) =>
        isActive ? "link active" : "link"
      }
    >
      <FaHome />
      <span>Home</span>
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

  {/* LOGOUT */}
  <button className="logout" onClick={handleLogout}>
    <FaSignOutAlt />
    <span>Cerrar sesión</span>
  </button>

</aside>
  );
}

export default Sidebar;