import { motion } from "framer-motion";
import "./AboutMe.css";

export default function AboutMe() {
  return (
    <section className="about-section border-b border-border" id="sobre-mi">
      <div className="container about-container">
        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="about-badge">Sobre mí</div>
          <h2 className="section-title">
            Hola, soy Iker Delgado.
          </h2>
          <div className="about-text-wrapper">
            <p className="about-text">
              Me dedico a ayudar a autónomos y pequeños negocios a dar el salto digital que necesitan. No creo en webs complejas que nadie entiende; creo en <strong>soluciones directas</strong> que funcionan.
            </p>
            <p className="about-text">
              Mi objetivo con <strong>GrasDesign</strong> es que te olvides de los problemas técnicos y te centres en lo que mejor sabes hacer: llevar tu negocio. Yo me encargo de que tu web y tu ficha de Google Maps estén siempre a punto para tus clientes.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">+1</span>
                <span className="stat-label">Proyectos Reales</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Dedicación Personal</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
