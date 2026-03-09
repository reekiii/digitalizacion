import { motion } from "framer-motion";
import { Layout, Rocket, RefreshCw } from "lucide-react";
import "./Services.css";

const services = [
  {
    icon: <Layout size={32} />,
    title: "Diseño Web",
    desc: "Moderno y rápido. Webs que no solo son bonitas, sino que cargan en menos de 1 segundo.",
  },
  {
    icon: <Rocket size={32} />,
    title: "Optimización",
    desc: "SEO + velocidad extrema. Ponemos tu web en los primeros puestos y la hacemos volar.",
  },
  {
    icon: <RefreshCw size={32} />,
    title: "Rediseño",
    desc: "Transformación de webs antiguas. Convertimos esa web del 2010 en una herramienta de ventas actual.",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="services-section">
      <div className="container">
        <div className="services-header">
          <div className="pricing-badge">Servicios</div>
          <h2 className="section-title">Lo que hacemos en NEXAWEB</h2>
          <p className="services-subtitle">
            Soluciones digitales de alto impacto para negocios que buscan el
            siguiente nivel.
          </p>
        </div>

        <div className="services-grid features-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-feature-card soft-glass"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="feature-icon-wrapper">{service.icon}</div>
              <h3 className="feature-title">{service.title}</h3>
              <p className="feature-desc">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
