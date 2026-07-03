import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/header.css";

import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">

        <div className="header-title">
          Biblioteca
        </div>

        <div className="header-user">
          <FaUserCircle className="icon" />

          <div className="user-info">
            <span className="email">{user?.user}</span>
            <span className="role">{user?.rol}</span>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
          </button>
        </div>

      </div>
    </header>
  );
}

export default Header;