import { motion } from "framer-motion";
import { BackgroundPaths } from "../../ui/background-paths";
import { ArrowLeft, Home } from "lucide-react";
import { useEffect } from "react";
import "./NotFound.css";

export default function NotFound() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "404 - Página no encontrada | GrasDesign";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="not-found-page">
      <BackgroundPaths className="not-found-bg">
        <div className="container not-found-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="not-found-content"
          >
            <div className="not-found-glitch-wrapper">
              <motion.h1 
                className="not-found-code font-heading"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: 0.2, 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 15 
                }}
              >
                404
              </motion.h1>
              <div className="not-found-glitch-overlay">404</div>
            </div>

            <h2 className="not-found-title font-heading tracking-tight">
              Página no encontrada
            </h2>
            
            <p className="not-found-desc">
              Lo sentimos, la página que buscas no existe o ha sido movida. 
              Parece que has llegado a un callejón sin salida digital.
            </p>

            <div className="not-found-actions">
              <button 
                onClick={() => window.history.back()} 
                className="not-found-btn btn-primary"
              >
                <ArrowLeft size={18} />
                Regresar
              </button>
            </div>
          </motion.div>
        </div>
      </BackgroundPaths>
    </div>
  );
}
