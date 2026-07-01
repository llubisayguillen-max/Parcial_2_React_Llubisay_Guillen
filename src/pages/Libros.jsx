import { useContext, useState } from "react";
import { LibraryContext } from "../context/LibraryContext";

export default function Libros() {
  const { libros, autores, agregarLibro, eliminarLibro } = useContext(LibraryContext);

  const [titulo, setTitulo] = useState("");
  const [autorId, setAutorId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titulo || !autorId) return alert("Completar campos");

    agregarLibro({ titulo, autorId: Number(autorId) });

    setTitulo("");
    setAutorId("");
  };

  return (
    <div className="container mt-4">
      <h2>Libros</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <select value={autorId} onChange={(e) => setAutorId(e.target.value)}>
          <option value="">Seleccionar autor</option>
          {autores.map(a => (
            <option key={a.id} value={a.id}>
              {a.nombre}
            </option>
          ))}
        </select>

        <button className="btn btn-success">Agregar</button>
      </form>

      <ul>
        {libros.map(l => {
          const autor = autores.find(a => a.id === l.autorId);

          return (
            <li key={l.id}>
              {l.titulo} - {autor?.nombre}
              <button onClick={() => eliminarLibro(l.id)}>❌</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}