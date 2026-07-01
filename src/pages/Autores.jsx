import { useContext, useState } from "react";
import { LibraryContext } from "../context/LibraryContext";
import { AuthContext } from "../context/AuthContext";

export default function Autores() {
  const { user } = useContext(AuthContext);
    {user?.rol === "admin" && (
    <form onSubmit={handleSubmit} className="mb-3">
      ...
    </form>
  )}

  const { autores, agregarAutor, eliminarAutor, editarAutor } = useContext(LibraryContext);

  const [nombre, setNombre] = useState("");

  // edición
  const [editandoId, setEditandoId] = useState(null);
  const [nombreEditado, setNombreEditado] = useState("");

  // AGREGAR
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      alert("Nombre requerido");
      return;
    }

    agregarAutor(nombre);
    setNombre("");
  };

  // INICIAR EDICIÓN
  const iniciarEdicion = (autor) => {
    setEditandoId(autor.id);
    setNombreEditado(autor.nombre);
  };

  // GUARDAR EDICIÓN
  const guardarEdicion = (id) => {
    if (!nombreEditado.trim()) {
      alert("Nombre requerido");
      return;
    }

    editarAutor(id, nombreEditado);
    setEditandoId(null);
  };

  // CANCELAR
  const cancelarEdicion = () => {
    setEditandoId(null);
    setNombreEditado("");
  };

  return (
    <div className="container mt-4">
      <h2>Autores</h2>

      {/* FORM AGREGAR */}
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          className="form-control mb-2"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre autor"
        />
        <button className="btn btn-primary">Agregar</button>
      </form>

      {/* LISTA */}
      <ul className="list-group">
        {autores.map(a => (
          <li key={a.id} className="list-group-item d-flex justify-content-between align-items-center">

            {editandoId === a.id ? (
              // EDICIÓN
              <>
                <input
                  className="form-control me-2"
                  value={nombreEditado}
                  onChange={(e) => setNombreEditado(e.target.value)}
                />

                <div>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => guardarEdicion(a.id)}
                  >
                    ✔
                  </button>

                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={cancelarEdicion}
                  >
                    ✖
                  </button>
                </div>
              </>
            ) : (
              //  NORMAL
              <>
                <span>{a.nombre}</span>

                {user?.rol === "admin" && (
                  <div>
                    <button
                      type="button"
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => iniciarEdicion(a)}
                    >
                      ✏️
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        if (window.confirm("¿Eliminar autor?")) {
                          eliminarAutor(a.id);
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
        ))}
      </ul>
    </div>
  );
}