import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import LightRays from "../../ui/light-rays";
import "./Hero.css";

export default function Hero() {
  const titleText = "Diseño webs que convierten visitas en clientes";
  const words = titleText.split(" ");

  // Magic Text Reveal variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] },
    },
  };

  return (
    <section id="inicio" className="hero-section">
      <div className="hero-light-rays-container">
        <LightRays />
      </div>
      <div className="hero-shape-1"></div>
      <div className="hero-shape-2"></div>

      <div className="container hero-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-logo-wrapper"
        >
          <img
            src="/assets/logo.png"
            alt="NEXAWEB Logo"
            className="hero-logo-large"
          />
        </motion.div>

        <motion.h1
          className="hero-title"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, index) => {
            // Highlight specific words for emphasis
            const isHighlight = index >= words.length - 3;
            return (
              <motion.span
                key={index}
                variants={childVariants}
                className={isHighlight ? "hero-highlight" : ""}
                style={{ display: "inline-block", marginRight: "0.25em" }}
              >
                {word}
                {index === 1 && <br className="hero-break" />}
              </motion.span>
            );
          })}
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Agencia de diseño web y tecnología de alto impacto.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a href="#contacto" className="hero-btn primary">
            Solicitar web
          </a>
          <a
            href="https://www.saltysoultrips.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn secondary"
          >
            Ver proyectos
          </a>
        </motion.div>
      </div>
    </section>
  );
}
