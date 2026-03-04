import './Footer.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <h3>Iker Delgado Gras</h3>
                        <p>Desarrollo web de alto rendimiento y arquitectura UI moderna.</p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">&copy; {currentYear} Iker Delgado Gras. Todos los derechos reservados.</p>
                    <div className="legal-links">
                        <a href="#">Política de Privacidad</a>
                        <a href="#">Términos de Servicio</a>
                        <a href="#">Política de Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
