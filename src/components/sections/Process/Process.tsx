import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Target, PenTool, Code, Rocket } from "lucide-react";
import { useIsDarkMode } from "../../../lib/useIsDarkMode";
import Particles from "../../ui/Particles/Particles";
import "./Process.css";

export default function Process() {
  const isDark = useIsDarkMode();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(isDark ? "#ffffff" : "#000000");
  }, [isDark]);

  const steps = [
    {
      day: "Día 1",
      icon: <Target size={24} />,
      title: "Hablamos",
      desc: "Me cuentas qué necesitas y qué quieres conseguir con tu web.",
    },
    {
      day: "Día 2",
      icon: <PenTool size={24} />,
      title: "Diseño",
      desc: "Te propongo un aspecto visual moderno que atraiga a tus clientes.",
    },
    {
      day: "Día 3-4",
      icon: <Code size={24} />,
      title: "Construcción",
      desc: "Monto tu web para que sea rápida, segura y fácil de usar.",
    },
    {
      day: "Día 5",
      icon: <Rocket size={24} />,
      title: "Lanzamiento",
      desc: "Revisamos todo juntos y la publicamos en internet.",
    },
  ];

  return (
    <section className="process-section relative overflow-hidden border-b border-border" id="process">
      <Particles
        className="absolute inset-0 z-[0]"
        quantity={200}
        staticity={30}
        color={color}
        ease={100}
        refresh
      />
      <div className="container relative z-[10]">
        <div className="process-grid">
          <motion.div
            className="process-content"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="process-badge">Mi método</div>
            <h2 className="process-title">Tu web lista en tiempo récord</h2>
            <p className="process-desc">
              Tengo un sistema para que tu web profesional esté funcionando en solo
              5 días.
              <br />
              <span className="indicative-note">
                *Tiempos para el Pack Starter. Si tu proyecto es más grande, nos adaptaremos.
              </span>
            </p>
          </motion.div>

          <div className="process-steps">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="step-item soft-glass"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="step-day">{step.day}</div>
                <div className="step-icon">{step.icon}</div>
                <div className="step-text">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
