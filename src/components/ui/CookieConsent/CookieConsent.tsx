import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie } from "lucide-react";
import LegalModal from "../LegalModal/LegalModal";
import "./CookieConsent.css";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Slight delay so it doesn't instantly block the magic entrance animations
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookie-consent", "all");
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(
      "cookie-consent",
      analyticsEnabled ? "all" : "necessary",
    );
    setIsVisible(false);
  };

  const handleDeclineOptional = () => {
    localStorage.setItem("cookie-consent", "necessary");
    setIsVisible(false);
  };

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
        cuando el sitio web se carga en su navegador y nos ayudan a que el sitio
        web funcione correctamente, sea más seguro y proporcione una mejor
        experiencia de usuario.
      </p>
      <h3>2. Cómo usamos las cookies</h3>
      <p>
        Utilizamos cookies esenciales para el funcionamiento básico del sitio y
        cookies analíticas (si las acepta) para entender cómo interactúa con
        nuestro sitio, lo que nos ayuda a mejorar nuestros servicios y detectar
        posibles errores técnicos.
      </p>
      <h3>3. Tipos de cookies que usamos</h3>
      <p>
        <strong>Necesarias:</strong> Esenciales para navegar y usar las
        funciones del sitio. Sin ellas, el sitio no funcionaría correctamente.
      </p>
      <p>
        <strong>Analíticas:</strong> Nos permiten contar las visitas y fuentes
        de tráfico para medir y mejorar el rendimiento de nuestro sitio.
      </p>
      <h3>4. Gestionar cookies</h3>
      <p>
        Puede cambiar sus preferencias de cookies en cualquier momento ajustando
        la configuración en este mismo banner o a través de la configuración de
        su navegador.
      </p>
    </>
  );

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="cookie-banner-wrapper"
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 150, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
          >
            <div className="cookie-banner soft-glass">
              {!showSettings ? (
                <>
                  <div className="cookie-content">
                    <div className="cookie-header-row">
                      <div className="cookie-icon-wrapper">
                        <Cookie size={20} className="cookie-icon" />
                      </div>
                      <div className="cookie-text">
                        <h3>Valoramos tu privacidad</h3>
                      </div>
                    </div>
                    <div className="cookie-text">
                      <p>
                        Utilizamos cookies propias y de terceros para mejorar tu
                        experiencia, analizar el tráfico y mostrarte contenido
                        personalizado.{" "}
                        <button
                          onClick={() => setIsPolicyOpen(true)}
                          className="cookie-link-btn"
                        >
                          Leer política
                        </button>
                      </p>
                    </div>
                  </div>
                  <div className="cookie-actions">
                    <button
                      onClick={() => setShowSettings(true)}
                      className="cookie-btn-outline"
                    >
                      Configurar
                    </button>
                    <button
                      onClick={handleDeclineOptional}
                      className="cookie-btn-outline"
                    >
                      Rechazar no esenciales
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="cookie-btn-primary"
                    >
                      Aceptar todas
                    </button>
                  </div>
                </>
              ) : (
                <div className="cookie-settings">
                  <div className="cookie-settings-header">
                    <h3>Configuración de Cookies</h3>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="cookie-close-btn"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="cookie-options">
                    <div className="cookie-option">
                      <div className="cookie-option-info">
                        <h4>Estrictamente Necesarias</h4>
                        <p>
                          Requeridas para el funcionamiento técnico básico del
                          sitio (ej. guardar esta misma preferencia).
                        </p>
                      </div>
                      <div className="cookie-toggle disabled">
                        <div className="toggle-track active">
                          <div className="toggle-thumb" />
                        </div>
                      </div>
                    </div>

                    <div className="cookie-option">
                      <div className="cookie-option-info">
                        <h4>Analíticas (Opcional)</h4>
                        <p>
                          Nos ayudan a entender cómo interactúas con la web de
                          forma 100% anónima para mejorar el servicio.
                        </p>
                      </div>
                      <button
                        className="cookie-toggle"
                        onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                        aria-pressed={analyticsEnabled}
                      >
                        <div
                          className={`toggle-track ${analyticsEnabled ? "active" : ""}`}
                        >
                          <div
                            className={`toggle-thumb ${analyticsEnabled ? "active" : ""}`}
                          />
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="cookie-settings-actions">
                    <button
                      onClick={handleSavePreferences}
                      className="cookie-btn-primary full-width"
                    >
                      Guardar Preferencias
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LegalModal
        isOpen={isPolicyOpen}
        onClose={() => setIsPolicyOpen(false)}
        title="Política de Cookies"
        content={cookiesContent}
      />
    </>
  );
}
