import { createContext, useState } from "react";
import autoresData from "../data/autores.json";
import librosData from "../data/libros.json";

export const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {

  const [autores, setAutores] = useState(autoresData);
  const [libros, setLibros] = useState(librosData);

  //AUTORES

  const agregarAutor = (nombre) => {
    if (!nombre.trim()) return;

    const nuevoAutor = {
      id: Date.now(),
      nombre
    };

    setAutores([...autores, nuevoAutor]);
  };

  const editarAutor = (id, nombre) => {
    setAutores(
      autores.map(a =>
        a.id === id ? { ...a, nombre } : a
      )
    );
  };

  const eliminarAutor = (id) => {
    // eliminar 
    setLibros(libros.filter(l => l.autorId !== id));
    setAutores(autores.filter(a => a.id !== id));
  };

  const obtenerAutorPorId = (id) => {
    return autores.find(a => a.id === id);
  };

  //LIBROS

  const agregarLibro = (titulo, autorId) => {
    if (!titulo.trim() || !autorId) return;

    const nuevoLibro = {
      id: Date.now(),
      titulo,
      autorId: Number(autorId)
    };

    setLibros([...libros, nuevoLibro]);
  };

  const editarLibro = (id, titulo, autorId) => {
    setLibros(
      libros.map(l =>
        l.id === id
          ? { ...l, titulo, autorId: Number(autorId) }
          : l
      )
    );
  };

  const eliminarLibro = (id) => {
    setLibros(libros.filter(l => l.id !== id));
  };

  const obtenerLibroPorId = (id) => {
    return libros.find(l => l.id === id);
  };


  // VALOR GLOBAL

  return (
    <LibraryContext.Provider
      value={{
        autores,
        libros,

        // autores
        agregarAutor,
        editarAutor,
        eliminarAutor,
        obtenerAutorPorId,

        // libros
        agregarLibro,
        editarLibro,
        eliminarLibro,
        obtenerLibroPorId
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};