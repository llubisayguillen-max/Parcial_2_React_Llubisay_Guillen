import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/layout.css";

function DashboardLayout() {
  return (
    <div className="layout">

      <Sidebar />

      <div className="main-section">

        <Header />

        <main className="content">
          <Outlet />
        </main>

        <Footer />

      </div>

    </div>
  );
}
export default DashboardLayout;