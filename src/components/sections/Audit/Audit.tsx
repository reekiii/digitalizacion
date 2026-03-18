import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MessageCircle, Video } from "lucide-react";
import { useIsDarkMode } from "../../../lib/useIsDarkMode";
import Particles from "../../ui/Particles/Particles";
import TiltCard from "../../ui/TiltCard";
import AuditQuiz from "./AuditQuiz";
import "./Audit.css";

export default function Audit() {
  const isDark = useIsDarkMode();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(isDark ? "#ffffff" : "#000000");
  }, [isDark]);

  const options = [
    {
      icon: <MessageCircle size={32} />,
      title: "WhatsApp",
      desc: "Rápido y directo. Pásame tu idea o tu web actual y te respondo por chat.",
      action: "Hablar por WhatsApp",
      link: "https://wa.me/34657828903",
    },
    {
      icon: <Video size={32} />,
      title: "Vídeo de análisis",
      desc: "Te grabo un vídeo explicándote qué cambiaría de tu web y qué hace tu competencia.",
      action: "Solicitar vídeo",
      link: "#contacto",
    },
  ];

  return (
    <section className="audit-section relative overflow-hidden" id="audit">
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
          className="audit-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="audit-badge">Análisis gratuito</div>
          <h2 className="audit-title tracking-tight">
            Descubre qué falla en tu web actual (100% Gratis)
          </h2>
          <p className="audit-subtitle">
            Reviso tu web y te digo cómo mejorarla para atraer más clientes. Elige cómo prefieres que hablemos:
          </p>
        </motion.div>

        <div className="audit-grid">
          {options.map((opt, i) => (
            <TiltCard key={i} className="h-full">
              <motion.div
                className="audit-card soft-glass h-full"
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
            </TiltCard>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <AuditQuiz />
        </motion.div>
      </div>
    </section>
  );
}
