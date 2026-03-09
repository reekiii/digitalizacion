import { motion } from "framer-motion";
import { Target, PenTool, Code, Rocket } from "lucide-react";
import "./Process.css";

export default function Process() {
  const steps = [
    {
      day: "Día 1",
      icon: <Target size={24} />,
      title: "Cuéntame tu idea",
      desc: "Análisis de marca y definición de objetivos para tu proyecto.",
    },
    {
      day: "Día 2",
      icon: <PenTool size={24} />,
      title: "Diseño",
      desc: "Prototipado y diseño visual de alta fidelidad centrado en conversión.",
    },
    {
      day: "Día 3-4",
      icon: <Code size={24} />,
      title: "Desarrollo",
      desc: "Implementación técnica con el máximo rendimiento y velocidad.",
    },
    {
      day: "Día 5",
      icon: <Rocket size={24} />,
      title: "Lanzamiento",
      desc: "Revisión final, optimización técnica y puesta en marcha.",
    },
  ];

  return (
    <section className="process-section" id="process">
      <div className="container">
        <div className="process-grid">
          <motion.div
            className="process-content"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="process-badge">Nuestro Proceso</div>
            <h2 className="process-title">Tu web lista en tiempo récord</h2>
            <p className="process-desc">
              Optimizamos cada fase para entregarte una web profesional en solo
              5 días.
              <br />
              <span className="indicative-note">
                *Tiempos basados en el Pack Starter. Para proyectos Business o
                Premium, el proceso se adapta a la complejidad.
              </span>
            </p>
          </motion.div>

          <div className="process-steps">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4 }}
            >
              {steps.map((step, i) => (
                <div key={i} className="step-item soft-glass">
                  <div className="step-day">{step.day}</div>
                  <div className="step-icon">{step.icon}</div>
                  <div className="step-text">
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
