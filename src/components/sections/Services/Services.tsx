import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Layout, Rocket, RefreshCw } from "lucide-react";
import { useIsDarkMode } from "../../../lib/useIsDarkMode";
import Particles from "../../ui/Particles/Particles";
import TiltCard from "../../ui/TiltCard";
import "./Services.css";

const services = [
  {
    icon: <Layout size={32} />,
    title: "Webs rápidas",
    desc: "Tu página cargará al instante y se verá perfecta en cualquier móvil o tablet.",
  },
  {
    icon: <Rocket size={32} />,
    title: "Lista para Google",
    desc: "Monto tu web siguiendo las recomendaciones de Google para que sea más fácil encontrarte.",
  },
  {
    icon: <RefreshCw size={32} />,
    title: "Renovación",
    desc: "Si tu web actual se ve antigua, le doy un aspecto moderno para que vuelvas a atraer visitas.",
  },
];

export default function Services() {
  const isDark = useIsDarkMode();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(isDark ? "#ffffff" : "#000000");
  }, [isDark]);

  return (
    <section id="servicios" className="services-section relative overflow-hidden border-b border-border">
      <Particles
        className="absolute inset-0 z-[0]"
        quantity={200}
        staticity={30}
        color={color}
        ease={100}
        refresh
      />
      <div className="container relative z-[10]">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="pricing-badge">Servicios</div>
          <h2 className="section-title tracking-tight">Cómo te ayudo en GrasDesign</h2>
          <p className="services-subtitle">
            Me encargo de todo lo que tu negocio necesita para brillar en internet.
          </p>
        </motion.div>

        <div className="services-grid features-grid">
          {services.map((service, index) => (
            <TiltCard key={index} className="h-full">
              <motion.div
                className="service-feature-card soft-glass h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="feature-icon-wrapper">{service.icon}</div>
                <h3 className="feature-title">{service.title}</h3>
                <p className="feature-desc">{service.desc}</p>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
