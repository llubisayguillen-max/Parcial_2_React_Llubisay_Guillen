import { createContext, useState, useContext } from "react";
import { usuarios } from "../data/usuarios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    const usuarioEncontrado = usuarios.find(
      (u) => u.user === username && u.pass === password
    );

    if (usuarioEncontrado) {
      setUser(usuarioEncontrado);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);