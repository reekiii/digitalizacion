import ThemeToggle from "../../ui/ThemeToggle/ThemeToggle";
import "./Navbar.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`navbar ${scrolled ? "scrolled soft-glass" : ""} ${mobileMenuOpen ? "menu-open" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container nav-container">
        <a
          href="#inicio"
          className="nav-logo"
          onClick={() => setMobileMenuOpen(false)}
        >
          <img
            src="/assets/logo.webp"
            alt="GrasDesign Logo"
            className="logo-img"
          />
        </a>

        <nav className={`nav-links ${mobileMenuOpen ? "open" : ""}`}>
          <a href="#inicio" onClick={() => setMobileMenuOpen(false)}>
            Inicio
          </a>
          <a href="#audit" onClick={() => setMobileMenuOpen(false)}>
            Auditoría
          </a>
          <a href="#sobre-mi" onClick={() => setMobileMenuOpen(false)}>
            Sobre Mí
          </a>
          <a href="#servicios" onClick={() => setMobileMenuOpen(false)}>
            Servicios
          </a>
          <a href="#tecnologia" onClick={() => setMobileMenuOpen(false)}>
            Tecnología
          </a>
          <a href="#packs" onClick={() => setMobileMenuOpen(false)}>
            Packs
          </a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)}>
            FAQ
          </a>
          {/* Mobile Only Contact Button inside menu */}
          <a
            href="#contacto"
            className="btn-contact mobile-nav-btn"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contacto
          </a>
        </nav>

        <div className="nav-actions">
          <div className="flex items-center justify-center">
            <ThemeToggle />
          </div>
          <a
            href="#contacto"
            className="btn-contact desktop-contact-btn"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contacto
          </a>
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
