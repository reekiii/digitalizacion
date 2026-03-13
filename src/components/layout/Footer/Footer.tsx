import { useState } from "react";
import LegalModal from "../../ui/LegalModal/LegalModal";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isCookiesOpen, setIsCookiesOpen] = useState(false);

  const privacyContent = (
    <>
      <p>
        En <strong>GrasDesign</strong>, valoramos su privacidad y estamos
        plenamente comprometidos con la protección de sus datos personales, en
        estricto cumplimiento con el Reglamento General de Protección de Datos (RGPD)
        y la normativa aplicable en vigor.
      </p>
      <h3>1. Recopilación y Uso de Datos</h3>
      <p>
        Únicamente recopilamos la información estrictamente necesaria
        (nombre, correo electrónico y detalles del proyecto) que usted nos
        proporciona voluntariamente a través de nuestros formularios de contacto,
        con el fin exclusivo de gestionar su solicitud y ofrecerle nuestros
        servicios de diseño y desarrollo web.
      </p>
      <h3>2. Protección y Derechos</h3>
      <p>
        Sus datos son tratados con la máxima confidencialidad y alojados en
        servidores seguros. No compartimos, vendemos ni cedemos sus datos a
        terceros, salvo obligación legal. Usted tiene derecho a acceder,
        rectificar, cancelar u oponerse al tratamiento de sus datos en cualquier
        momento, enviándonos una solicitud por correo electrónico.
      </p>
    </>
  );

  const termsContent = (
    <>
      <p>
        Bienvenido a <strong>GrasDesign</strong>. Al acceder y utilizar nuestro
        sitio web y contratar nuestros servicios, usted acepta quedar vinculado a
        los siguientes Términos de Servicio.
      </p>
      <h3>1. Prestación de Servicios</h3>
      <p>
        Nos especializamos en el diseño web de alto rendimiento y marketing digital.
        Toda propuesta final, alcance técnico del proyecto y condiciones de pago
        serán detalladas y acordadas previamente de forma formal antes de iniciar.
      </p>
      <h3>2. Propiedad Intelectual</h3>
      <p>
        Todo el contenido original mostrado en este sitio web (textos, gráficos,
        logotipos y código fuente) es propiedad exclusiva de GrasDesign. Los
        proyectos entregados a los clientes serán de su propiedad una vez abonada
        la totalidad del servicio, según lo estipulado.
      </p>
      <h3>3. Limitación de Responsabilidad</h3>
      <p>
        Nos esforzamos por ofrecer un servicio de excelencia, ininterrumpido y libre
        de errores; sin embargo, no garantizamos la disponibilidad continua del
        sitio. No seremos responsables de daños indirectos derivados del uso de
        nuestra plataforma.
      </p>
    </>
  );

  const cookiesContent = (
    <>
      <p>
        Esta Política de Cookies explica cómo <strong>GrasDesign</strong> utiliza
        cookies y tecnologías similares para reconocerle cuando visita nuestro
        sitio web, con el objetivo de optimizar su experiencia de navegación.
      </p>
      <h3>1. ¿Qué son las cookies?</h3>
      <p>
        Las cookies son pequeños archivos de datos que se descargan en su
        dispositivo al acceder a nuestra web. Permiten a la página recordar sus
        acciones y preferencias durante un tiempo determinado.
      </p>
      <h3>2. Tipos de Cookies que Utilizamos</h3>
      <p>
        <strong>Cookies Técnicas:</strong> Fundamentales para el correcto
        funcionamiento del sitio, la navegación segura y la visualización del
        contenido de forma óptima. Son estrictamente necesarias.<br/><br/>
        <strong>Cookies Analíticas:</strong> Nos ayudan a comprender cómo los
        visitantes interactúan con la web, recopilando métricas y estadísticas
        de forma anónima para identificar áreas de mejora.
      </p>
      <h3>3. Gestión y Revocación</h3>
      <p>
        Usted puede aceptar, rechazar o configurar las cookies no esenciales a
        través de nuestro banner de consentimiento inicial. Asimismo, puede
        gestionar las cookies directamente desde los ajustes de seguridad de su
        propio navegador web en cualquier momento.
      </p>
    </>
  );

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>GrasDesign</h3>
            <p>
              Agencia de marketing digital y diseño web de alto rendimiento.
            </p>
          </div>

          <nav className="footer-nav">
            <p className="footer-nav-title">Navegación</p>
            <a href="#servicios">Servicios</a>
            <a href="#packs">Packs & Precios</a>
            <a href="#proceso">Proceso</a>
            <a href="#faq">FAQ</a>
            <a href="#contacto">Contacto</a>
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} GrasDesign. Todos los derechos reservados.
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
