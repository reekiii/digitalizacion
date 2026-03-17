import { motion } from "framer-motion";
import { BackgroundPaths } from "../../ui/background-paths";
import "./AboutMe.css";

export default function AboutMe() {
  return (
    <section className="about-section border-b border-border" id="sobre-mi">
      <BackgroundPaths className="about-bg-wrapper">
        <div className="container about-container relative z-10">
          <motion.div
            className="about-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              Transformamos la complejidad técnica en resultados.
            </h2>

            <div className="about-text-wrapper">
              <p className="about-text">
                Soy <strong>Iker Delgado Gras</strong> y en <strong>GrasDesign</strong> transformamos la complejidad técnica en experiencias digitales modernas que impulsan el crecimiento de tu negocio.
              </p>
            </div>
          </motion.div>
        </div>
      </BackgroundPaths>
    </section>
  );
}
