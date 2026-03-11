import { motion } from "framer-motion";
import { MessageCircle, Video, Calendar } from "lucide-react";
import GlslNoiseShader from "../../ui/GlslNoiseShader/GlslNoiseShader";
import "./Audit.css";

export default function Audit() {
  const options = [
    {
      icon: <MessageCircle size={32} />,
      title: "WhatsApp",
      desc: "Rápido y directo. Pásame tu idea o tu web actual y te respondo por chat.",
      action: "Hablar por WhatsApp",
      link: "#",
    },
    {
      icon: <Video size={32} />,
      title: "Vídeo-Análisis (Loom)",
      desc: "Recibe un vídeo de 5 min analizando tu competencia y puntos de mejora.",
      action: "Solicitar vídeo",
      link: "#",
    },
    {
      icon: <Calendar size={32} />,
      title: "Llamada / Meet",
      desc: "Agenda 15 minutos conmigo para una asesoría personalizada.",
      action: "Agendar llamada",
      link: "#",
    },
  ];

  return (
    <section className="audit-section" id="audit">
      <GlslNoiseShader />
      <div className="container">
        <motion.div
          className="audit-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="audit-badge">Auditoría Express</div>
          <h2 className="audit-title">
            Tu transformación empieza con una Auditoría Express (100% Gratis)
          </h2>
          <p className="audit-subtitle">
            Analizamos tu presencia digital y te damos la hoja de ruta para
            atraer más clientes. Elige el canal que prefieras:
          </p>
        </motion.div>

        <div className="audit-grid">
          {options.map((opt, i) => (
            <motion.div
              key={i}
              className="audit-card soft-glass"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="audit-icon">{opt.icon}</div>
              <h3 className="audit-card-title">{opt.title}</h3>
              <p className="audit-card-desc">{opt.desc}</p>
              <a href={opt.link} className="audit-card-link">
                {opt.action}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
