import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Si ya está logueado va al dash
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

const handleSubmit = (e) => {
  e.preventDefault();

  const ok = login(email, password);

  if (ok) {
    navigate("/dashboard");
  } else {
    setError("Correo o contraseña incorrectos");
  }
};

  return (
    <div className="login-container">
      <div className="login-card">

        <img src="/assets/usr.png" alt="Usuario" className="login-img" />

        <h2>Iniciar sesión</h2>

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Ingresar
            </button>
          </div>

          <div className="text-center mt-4 text-muted small">
            <i className="bi bi-info-circle me-1"></i>
            ¿No tienes una cuenta?{" "}
            <span className="fw-semibold">
              Contacta con el administrador
            </span>
          </div>

        </form>

        <p className="text-center mt-3 text-muted">
          Biblioteca Escolar - Sistema de Gestión
        </p>

      </div>
    </div>
  );
}

export default Login;