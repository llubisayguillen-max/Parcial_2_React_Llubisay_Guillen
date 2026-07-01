import { useContext, useState } from "react";
import { LibraryContext } from "../context/LibraryContext";
import { AuthContext } from "../context/AuthContext";

export default function Libros() {
  const {
    libros,
    autores,
    agregarLibro,
    editarLibro,
    eliminarLibro
  } = useContext(LibraryContext);

  const { user } = useContext(AuthContext);

  const esAdmin = user?.role === "admin";
  const soloLectura = !esAdmin;

  // ================= AGREGAR =================
  const [titulo, setTitulo] = useState("");
  const [autorId, setAutorId] = useState("");

  // ================= EDICIÓN =================
  const [editandoId, setEditandoId] = useState(null);
  const [tituloEditado, setTituloEditado] = useState("");
  const [autorEditado, setAutorEditado] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titulo.trim() || !autorId) {
      alert("Completar todos los campos");
      return;
    }

    agregarLibro(titulo, autorId);
    setTitulo("");
    setAutorId("");
  };

    const iniciarEdicion = (libro) => {
      if (soloLectura) return;

      setEditandoId(libro.id);
      setTituloEditado(libro.titulo);
      setAutorEditado(libro.autorId);
    };

  const guardarEdicion = (id) => {
    if (!tituloEditado.trim() || !autorEditado) {
      alert("Completar todos los campos");
      return;
    }

    editarLibro(id, tituloEditado, autorEditado);
    cancelarEdicion();
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setTituloEditado("");
    setAutorEditado("");
  };

  return (
    <div className="container mt-4">
      <h2>Libros</h2>

      {/* ================= FORM SOLO ADMIN ================= */}
      {esAdmin && (
        <form onSubmit={handleSubmit} className="mb-3">
          <input
            className="form-control mb-2"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <select
            className="form-control mb-2"
            value={autorId}
            onChange={(e) => setAutorId(e.target.value)}
          >
            <option value="">Seleccionar autor</option>
            {autores.map(a => (
              <option key={a.id} value={a.id}>
                {a.nombre}
              </option>
            ))}
          </select>

          <button className="btn btn-primary">Agregar</button>
        </form>
      )}

      {/* ================= LISTA ================= */}
      <ul className="list-group">
        {libros.map(l => {
          const autor = autores.find(a => a.id === l.autorId);

          return (
            <li
              key={l.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {editandoId === l.id && esAdmin ? (
                // ================= EDICIÓN (SOLO ADMIN) =================
                esAdmin && (
                  <div className="d-flex w-100 align-items-center">
                    <input
                      className="form-control me-2"
                      value={tituloEditado}
                      onChange={(e) => setTituloEditado(e.target.value)}
                    />

                    <select
                      className="form-control me-2"
                      value={autorEditado}
                      onChange={(e) => setAutorEditado(e.target.value)}
                    >
                      {autores.map(a => (
                        <option key={a.id} value={a.id}>
                          {a.nombre}
                        </option>
                      ))}
                    </select>

                    <button
                      type="button"
                      className="btn btn-success btn-sm me-2"
                      onClick={() => guardarEdicion(l.id)}
                    >
                      ✔
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={cancelarEdicion}
                    >
                      ✖
                    </button>
                  </div>
                )
              ) : (
                <>
                  <span>
                    {l.titulo} -{" "}
                    <strong>{autor?.nombre || "Sin autor"}</strong>
                  </span>

                  {/* ================= BOTONES SOLO ADMIN ================= */}
                  {esAdmin && (
                    <div>
                      <button
                        type="button"
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => iniciarEdicion(l)}
                      >
                        ✏️
                      </button>

                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          if (window.confirm("¿Eliminar libro?")) {
                            eliminarLibro(l.id);
                          }
                        }}
                      >
                        ❌
                      </button>
                    </div>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}