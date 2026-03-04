import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie } from 'lucide-react';
import './CookieConsent.css';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Slight delay so it doesn't instantly block the magic entrance animations
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem('cookie-consent', 'all');
        setIsVisible(false);
    };

    const handleSavePreferences = () => {
        localStorage.setItem('cookie-consent', analyticsEnabled ? 'all' : 'necessary');
        setIsVisible(false);
    };

    const handleDeclineOptional = () => {
        localStorage.setItem('cookie-consent', 'necessary');
        setIsVisible(false);
    };

    return (
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
                                            Utilizamos cookies propias y de terceros para mejorar tu experiencia, analizar el tráfico y mostrarte contenido personalizado. Puedes aceptar todas las cookies, rechazarlas o configurarlas a tu gusto.
                                        </p>
                                    </div>
                                </div>
                                <div className="cookie-actions">
                                    <button onClick={() => setShowSettings(true)} className="cookie-btn-outline">
                                        Configurar
                                    </button>
                                    <button onClick={handleDeclineOptional} className="cookie-btn-outline">
                                        Rechazar no esenciales
                                    </button>
                                    <button onClick={handleAcceptAll} className="cookie-btn-primary">
                                        Aceptar todas
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="cookie-settings">
                                <div className="cookie-settings-header">
                                    <h3>Configuración de Cookies</h3>
                                    <button onClick={() => setShowSettings(false)} className="cookie-close-btn">
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="cookie-options">
                                    <div className="cookie-option">
                                        <div className="cookie-option-info">
                                            <h4>Estrictamente Necesarias</h4>
                                            <p>Requeridas para el funcionamiento técnico básico del sitio (ej. guardar esta misma preferencia).</p>
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
                                            <p>Nos ayudan a entender cómo interactúas con la web de forma 100% anónima para mejorar el servicio.</p>
                                        </div>
                                        <button
                                            className="cookie-toggle"
                                            onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                                            aria-pressed={analyticsEnabled}
                                        >
                                            <div className={`toggle-track ${analyticsEnabled ? 'active' : ''}`}>
                                                <div className={`toggle-thumb ${analyticsEnabled ? 'active' : ''}`} />
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div className="cookie-settings-actions">
                                    <button onClick={handleSavePreferences} className="cookie-btn-primary full-width">
                                        Guardar Preferencias
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
