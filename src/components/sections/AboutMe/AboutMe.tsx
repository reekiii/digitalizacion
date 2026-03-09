import { motion } from "framer-motion";
import "./AboutMe.css";

export default function AboutMe() {
  return (
    <section className="about-section">
      <div className="container about-container">
        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            La tecnología no debería ser un obstáculo.
          </h2>

          <div className="about-text-wrapper">
            <p className="about-text">
              En NEXAWEB, somos un equipo especializado en transformar la
              complejidad técnica en experiencias digitales fluidas, modernas y
              rentables.
            </p>
            <p className="about-text">
              Para los negocios que buscan escalar, una web lenta o confusa
              significa pérdida de clientes de manera silenciosa. Nuestro
              enfoque combina un diseño minimalista de altísima resolución con
              una arquitectura tecnológica de vanguardia para garantizar que tu
              marca comunique autoridad y genere resultados medibles desde el
              primer segundo.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
