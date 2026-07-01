import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { LibraryProvider } from "./context/LibraryContext";

import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Autores from "./pages/Autores";
import Libros from "./pages/Libros";

function App() {
  return (
    <AuthProvider>
      <LibraryProvider>
        <BrowserRouter>
          <Routes>

            {/* PUBLICA */}
            <Route path="/" element={<Login />} />

            {/* DASHBOARD PROTEGIDO CON LAYOUT */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardLayout />
                </PrivateRoute>
              }
            >

              {/* RUTAS INTERNAS */}
              <Route index element={<Dashboard />} />
              <Route path="autores" element={<Autores />} />
              <Route path="libros" element={<Libros />} />

            </Route>

          </Routes>
        </BrowserRouter>
      </LibraryProvider>
    </AuthProvider>
  );
}

export default App;