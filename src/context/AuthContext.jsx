import { createContext, useState } from "react";
import usuarios from "../data/usuarios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

const login = (email, password) => {
  console.log("EMAIL INGRESADO:", email);
  console.log("PASSWORD INGRESADO:", password);
  console.log("USUARIOS DISPONIBLES:", usuarios);

  const usuario = usuarios.find(
    u => u.email === email && u.password === password
  );

  console.log("USUARIO ENCONTRADO:", usuario);

  if (usuario) {
    const userData = {
      email: usuario.email,
      role: usuario.rol
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    return true;
  }

  return false;
};

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}