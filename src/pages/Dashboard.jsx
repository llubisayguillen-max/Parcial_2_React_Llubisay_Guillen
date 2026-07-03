import "../styles/dashboard.css";

function Dashboard() {

const latestBooks = [
  { id: 5, title: "La ciudad y los perros", author: "Mario Vargas Llosa" },
  { id: 4, title: "La casa de los espíritus", author: "Isabel Allende" },
  { id: 3, title: "Ficciones", author: "Jorge Luis Borges" },
];

const booksByAuthor = [
  { author: "Gabriel García Márquez", count: 1 },
  { author: "Julio Cortázar", count: 1 },
  { author: "Jorge Luis Borges", count: 1 },
  { author: "Isabel Allende", count: 1 },
  { author: "Mario Vargas Llosa", count: 1 },
];


  return (
    <div className="dashboard">

      {/* CARDS RESUMEN */}
      <div className="cards">
        <div className="card">
          <h3>Total Libros</h3>
          <p>20</p>
        </div>

        <div className="card">
          <h3>Autores</h3>
          <p>15</p>
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