import { createContext, useState, useEffect } from "react";
import autoresData from "../data/autores.json";
import librosData from "../data/libros.json";

export const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {

  //  CARGA INICIAL DESDE LOCALSTORAGE O JSON
  const [autores, setAutores] = useState(() => {
    const data = localStorage.getItem("autores");
    return data ? JSON.parse(data) : autoresData;
  });

  const [libros, setLibros] = useState(() => {
    const data = localStorage.getItem("libros");
    return data ? JSON.parse(data) : librosData;
  });

  //GUARDAR AUTOMÁTICAMENTE EN LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("autores", JSON.stringify(autores));
  }, [autores]);

  useEffect(() => {
    localStorage.setItem("libros", JSON.stringify(libros));
  }, [libros]);

  // ================= AUTORES =================

  const agregarAutor = (nombre) => {
    if (!nombre.trim()) return;

    // evitar duplicados
    if (autores.some(a => a.nombre.toLowerCase() === nombre.toLowerCase())) {
      alert("El autor ya existe");
      return;
    }

    const nuevoAutor = {
      id: Date.now(),
      nombre
    };

    setAutores(prev => [...prev, nuevoAutor]);
  };

  const editarAutor = (id, nuevoNombre) => {
    setAutores(prev =>
      prev.map(a =>
        a.id === id ? { ...a, nombre: nuevoNombre } : a
      )
    );
  };

  const eliminarAutor = (id) => {
    // eliminar libros relacionados
    setLibros(prev => prev.filter(l => l.autorId !== id));
    setAutores(prev => prev.filter(a => a.id !== id));
  };

  const obtenerAutorPorId = (id) => {
    return autores.find(a => a.id === id);
  };

  //LIBROS =================

  const agregarLibro = (titulo, autorId) => {
    if (!titulo.trim() || !autorId) return;

    const nuevoLibro = {
      id: Date.now(),
      titulo,
      autorId: Number(autorId)
    };

    setLibros(prev => [...prev, nuevoLibro]);
  };

  const editarLibro = (id, titulo, autorId) => {
    setLibros(prev =>
      prev.map(l =>
        l.id === id
          ? { ...l, titulo, autorId: Number(autorId) }
          : l
      )
    );
  };

  const eliminarLibro = (id) => {
    setLibros(prev => prev.filter(l => l.id !== id));
  };

  const obtenerLibroPorId = (id) => {
    return libros.find(l => l.id === id);
  };

  // ================= PROVIDER =================

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