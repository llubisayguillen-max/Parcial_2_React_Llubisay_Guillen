import "../styles/dashboard.css";

function Dashboard() {

  const latestBooks = [
    { id: 1, title: "Clean Code", author: "Robert C. Martin" },
    { id: 2, title: "1984", author: "George Orwell" },
    { id: 3, title: "El Principito", author: "Antoine de Saint-Exupéry" },
  ];

  const booksByAuthor = [
    { author: "George Orwell", count: 5 },
    { author: "Stephen King", count: 8 },
    { author: "J.K. Rowling", count: 7 },
  ];

  return (
    <div className="dashboard">

      <h2 className="dashboard-title">Inicio</h2>

      {/* CARDS RESUMEN */}
      <div className="cards">
        <div className="card">
          <h3>Total Libros</h3>
          <p>120</p>
        </div>

        <div className="card">
          <h3>Autores</h3>
          <p>35</p>
        </div>

        <div className="card">
          <h3>Usuarios</h3>
          <p>18</p>
        </div>
      </div>

      {/* ÚLTIMOS LIBROS */}
      <div className="section">
        <h3>Últimos libros</h3>
        <div className="list">
          {latestBooks.map((book) => (
            <div key={book.id} className="list-item">
              <strong>{book.title}</strong>
              <span>{book.author}</span>
            </div>
          ))}
        </div>
      </div>

      {/* LIBROS POR AUTOR */}
      <div className="section">
        <h3>Libros por autor</h3>
        <div className="list">
          {booksByAuthor.map((item, index) => (
            <div key={index} className="list-item">
              <strong>{item.author}</strong>
              <span>{item.count} libros</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Dashboard;