import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

const Dashboard = () => <h2>Bienvenido al sistema</h2>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;