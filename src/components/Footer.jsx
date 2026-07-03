import { FaFacebook, FaTwitter, FaInstagram, FaPhone } from "react-icons/fa";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-left">
          <h5>Contacto</h5>

          <div className="footer-icons">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
            <FaPhone />
            <span className="phone">+54 11 7369-5858</span>
          </div>
        </div>

        <div className="footer-right">
          <span>
            © 2025 Biblioteca. Todos los derechos reservados.
          </span>
        </div>

      </div>
    </footer>
  );
}

export default Footer;