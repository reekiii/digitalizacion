import { useState } from "react";
import LegalModal from "../../ui/LegalModal/LegalModal";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Legal modals state
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isCookiesOpen, setIsCookiesOpen] = useState(false);

  const privacyContent = (
    <>
      <p>
        En NEXAWEB ("nosotros", "nuestro"), valoramos su privacidad y estamos
        comprometidos a proteger su información personal.
      </p>
      <h3>1. Información que recopilamos</h3>
      <p>
        Recopilamos información que usted nos proporciona directamente al
        rellenar formularios en nuestro sitio web técnica y de usabilidad.
      </p>
      <h3>2. Uso de la información</h3>
      <p>
        Utilizamos la información recopilada para proporcionarle nuestros
        servicios, mejorar nuestro sitio web y comunicarnos con usted.
      </p>
      <h3>3. Compartir información</h3>
      <p>
        No vendemos, intercambiamos ni transferimos su información personal a
        terceros sin su consentimiento, excepto cuando sea necesario para
        cumplir con la ley.
      </p>
    </>
  );

  const termsContent = (
    <>
      <p>
        Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos
        Términos de Servicio.
      </p>
      <h3>1. Uso del Sitio</h3>
      <p>
        El contenido de este sitio web es solo para su información general y
        uso. Está sujeto a cambios sin previo aviso.
      </p>
      <h3>2. Propiedad Intelectual</h3>
      <p>
        Este material incluye, pero no se limita a, el diseño, la disposición,
        el aspecto, la apariencia y los gráficos. La reproducción está
        prohibida.
      </p>
      <h3>3. Limitación de Responsabilidad</h3>
      <p>
        No seremos responsables de ningún daño indirecto, especial o consecuente
        que surja de su uso de este sitio web o nuestros servicios.
      </p>
    </>
  );

  const cookiesContent = (
    <>
      <p>
        Este sitio web utiliza cookies para mejorar su experiencia mientras
        navega por el sitio web.
      </p>
      <h3>1. ¿Qué son las cookies?</h3>
      <p>
        Las cookies son pequeños archivos de texto que se utilizan para
        almacenar pequeñas piezas de información. Se almacenan en su dispositivo
        cuando el sitio web se carga en su navegador.
      </p>
      <h3>2. Cómo usamos las cookies</h3>
      <p>
        Utilizamos cookies esenciales para el funcionamiento básico del sitio y
        cookies analíticas (si las acepta) para entender cómo interactúa con
        nuestro sitio, lo que nos ayuda a mejorar nuestros servicios.
      </p>
      <h3>3. Gestionar cookies</h3>
      <p>
        Puede cambiar sus preferencias de cookies en cualquier momento ajustando
        la configuración de su navegador.
      </p>
    </>
  );

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>NEXAWEB</h3>
            <p>
              Agencia de diseño web de alto rendimiento y arquitectura UI
              moderna.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} NEXAWEB. Todos los derechos reservados.
          </p>
          <div className="legal-links">
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="legal-btn"
            >
              Política de Privacidad
            </button>
            <button onClick={() => setIsTermsOpen(true)} className="legal-btn">
              Términos de Servicio
            </button>
            <button
              onClick={() => setIsCookiesOpen(true)}
              className="legal-btn"
            >
              Política de Cookies
            </button>
          </div>
        </div>
      </div>

      <LegalModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        title="Política de Privacidad"
        content={privacyContent}
      />
      <LegalModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        title="Términos de Servicio"
        content={termsContent}
      />
      <LegalModal
        isOpen={isCookiesOpen}
        onClose={() => setIsCookiesOpen(false)}
        title="Política de Cookies"
        content={cookiesContent}
      />
    </footer>
  );
}
