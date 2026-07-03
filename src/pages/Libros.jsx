import { useContext, useState } from "react";
import { LibraryContext } from "../context/LibraryContext";
import { AuthContext } from "../context/AuthContext";
import "../styles/libros.css";
import userImg from "../assets/libro.png";
import libroDetalleImg from "../assets/libro_detalle.png";

export default function Libros() {
  const {
    libros = [],
    autores = [],
    agregarLibro,
    editarLibro,
    eliminarLibro
  } = useContext(LibraryContext);

  const { user } = useContext(AuthContext);

  const esAdmin = user?.role === "admin";
  const soloLectura = !esAdmin;

  const [titulo, setTitulo] = useState("");
  const [autorId, setAutorId] = useState("");

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
    <div className="libros-container container mt-4">
    <h2 className="titulo-seccion text-center">Libros</h2>

      {/*FORM ADMIN*/}
      {esAdmin && (
        <div className="card shadow formulario-card mb-4">
          <div className="row g-0 align-items-center">
            <div className="col-md-8 p-4">
              <h4 className="mb-3">Agregar Libro</h4>

              <form onSubmit={handleSubmit}>
                <input
                  className="form-control mb-3"
                  placeholder="Título"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />

                <select
                  className="form-control mb-3"
                  value={autorId}
                  onChange={(e) => setAutorId(e.target.value)}
                >
                  <option value="">Seleccionar autor</option>
                  {autores.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.nombre}
                    </option>
                  ))}
                </select>

                <button className="btn btn-guardar">
                  Guardar
                </button>
              </form>
            </div>

            <div className="col-md-4 text-center p-4">
            <img src={userImg} alt="Libro" className="libro-img" />
            </div>
          </div>
        </div>
      )}

      {/*LISTA*/}
      {libros.length === 0 ? (
        <p>No hay libros cargados</p>
      ) : (
        <div className="row">
          {libros.map((l) => {
            const autor = autores.find(
              (a) => String(a.id) === String(l.autorId)
            );

            return (
              <div key={l.id} className="col-md-6 mb-4">
                <div className="card libro-card shadow-sm h-100">
                  <div className="row g-0 h-100">
                    
                    {/* INFO */}
                    <div className="col-md-8 p-3 d-flex flex-column justify-content-center">
                      {editandoId === l.id ? (
                        <>
                          <input
                            className="form-control mb-2"
                            value={tituloEditado}
                            onChange={(e) => setTituloEditado(e.target.value)}
                          />

                          <select
                            className="form-control mb-2"
                            value={autorEditado}
                            onChange={(e) => setAutorEditado(e.target.value)}
                          >
                            {autores.map((a) => (
                              <option key={a.id} value={a.id}>
                                {a.nombre}
                              </option>
                            ))}
                          </select>

                          <div>
                            <button
                              className="btn btn-success btn-sm me-2"
                              onClick={() => guardarEdicion(l.id)}
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
                        <>
                          <h5 className="libro-titulo">{l.titulo}</h5>
                          <p className="libro-autor">
                            {autor?.nombre || "Sin autor"}
                          </p>

                          {!soloLectura && (
                            <div>
                              <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => iniciarEdicion(l)}
                              >
                                ✏️
                              </button>

                              <button
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
                    </div>

                    {/* IMAGEN */}
                    <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <img 
                      src={libroDetalleImg} 
                      alt="Detalle libro" 
                      className="img-card-libro"
                    />
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}