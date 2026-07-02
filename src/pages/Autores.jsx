import { useContext, useState } from "react";
import { LibraryContext } from "../context/LibraryContext";
import { AuthContext } from "../context/AuthContext";
import "../styles/libros.css"; 

export default function Autores() {
  const { user } = useContext(AuthContext);

  const {
    autores = [],
    agregarAutor,
    eliminarAutor,
    editarAutor
  } = useContext(LibraryContext);

  const esAdmin = user?.role === "admin";
  const soloLectura = !esAdmin;

  const [nombre, setNombre] = useState("");

  const [editandoId, setEditandoId] = useState(null);
  const [nombreEditado, setNombreEditado] = useState("");

  //AGREGAR
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      alert("Nombre requerido");
      return;
    }

    agregarAutor(nombre);
    setNombre("");
  };

  //EDITAR
  const iniciarEdicion = (autor) => {
    if (soloLectura) return;

    setEditandoId(autor.id);
    setNombreEditado(autor.nombre);
  };

  const guardarEdicion = (id) => {
    if (!nombreEditado.trim()) {
      alert("Nombre requerido");
      return;
    }

    editarAutor(id, nombreEditado);
    cancelarEdicion();
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setNombreEditado("");
  };

  return (
    <div className="libros-container container mt-4">
      <h2 className="titulo-seccion">Autores</h2>

      {/*FORM ADMIN */}
      {esAdmin && (
        <div className="card shadow formulario-card mb-4">
          <div className="row g-0 align-items-center">
            
            <div className="col-md-8 p-4">
              <h4 className="mb-3">Agregar Autor</h4>

              <form onSubmit={handleSubmit}>
                <input
                  className="form-control mb-3"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre del autor"
                />

                <button className="btn btn-guardar">
                  Guardar
                </button>
              </form>
            </div>

            <div className="col-md-4 text-center p-4">
              <img
                src="/assets/libros/default.jpg"
                alt="autor"
                className="img-fluid preview-img"
              />
            </div>

          </div>
        </div>
      )}

      {/*LISTA*/}
      {autores.length === 0 ? (
        <p>No hay autores cargados</p>
      ) : (
        <div className="row">
          {autores.map((a) => (
            <div key={a.id} className="col-md-6 mb-4">
              <div className="card libro-card shadow-sm h-100">
                <div className="row g-0 h-100">

                  {/* INFO */}
                  <div className="col-md-8 p-3 d-flex flex-column justify-content-center">
                    {editandoId === a.id ? (
                      <>
                        <input
                          className="form-control mb-2"
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
                      <>
                        <h5 className="libro-titulo">{a.nombre}</h5>

                        {!soloLectura && (
                          <div>
                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() => iniciarEdicion(a)}
                            >
                              ✏️
                            </button>

                            <button
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
                  </div>

                  {/* IMG DECORATIVA */}
                  <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <img
                      src="/assets/libros/default.jpg"
                      alt="autor"
                      className="img-fluid libro-img"
                    />
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}