import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useIsDarkMode } from "../../../lib/useIsDarkMode";
import Particles from "../../ui/Particles/Particles";
import "./FAQ.css";

const faqs = [
  {
    q: "¿Cuánto tiempo tardas en hacer la web?",
    a: "Para el Pack Express, la tengo lista en solo 5 días hábiles desde que empezamos. Si tu proyecto es más grande, como el Pack Business, tardaré unos 10 días.",
  },
  {
    q: "¿Soy el dueño legal de mi página?",
    a: "Totalmente. Todo se configura a tu nombre. El código es tuyo y tú tienes todas las llaves de acceso desde el primer momento. Yo solo te ayudo a montarlo.",
  },
  {
    q: "¿Necesito saber de informática para mantener la web?",
    a: "Para nada. Mi objetivo es que tú te centres en tu negocio. Si quieres, yo me encargo de que esté siempre actualizada y segura por ti.",
  },
  {
    q: "¿La web me servirá para captar clientes?",
    a: "Sí. Diseño cada página para que sea muy rápida y fácil de usar, lo que ayuda a que tus visitas se conviertan en clientes reales.",
  },
  {
    q: "¿Cómo se paga el hosting y el dominio?",
    a: "Te ayudo paso a paso a contratarlos a tu nombre. Así tú tienes el control total de tus facturas y de tu propiedad en internet.",
  },
  {
    q: "¿Cómo se realiza el pago?",
    a: "Se paga el 50% al empezar y el otro 50% cuando la web esté terminada y estés conforme con el resultado.",
  },
  {
    q: "¿Por qué no usas WordPress?",
    a: "Uso herramientas más modernas porque hacen que tu web sea mucho más rápida y segura. Una web rápida gusta más a los clientes y a Google.",
  },
  {
    q: "¿Qué sucede si necesito hacer cambios en el futuro?",
    a: "Tu web puede crecer conmigo. Podemos añadir secciones o nuevas funciones en cualquier momento según lo vaya necesitando tu negocio.",
  },
  {
    q: "¿Quién escribe los textos y pone las fotos?",
    a: "Tú me das la información básica de tu negocio y yo me encargo de darle forma para que sea atractiva y profesional para tus visitas.",
  },
  {
    q: "¿Qué pasa si ya tengo un nombre de dominio?",
    a: "No hay problema. Lo conectamos a tu nueva web en un momento. Yo me encargo de que todo funcione correctamente.",
  },
  {
    q: "¿Tienes algún tipo de garantía?",
    a: "Mi garantía es que no publicamos nada hasta que tú no estés totalmente contento con cómo ha quedado la web. Tu satisfacción es lo primero.",
  },
];

export default function FAQ() {
  const isDark = useIsDarkMode();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(isDark ? "#ffffff" : "#000000");
  }, [isDark]);

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section relative overflow-hidden">
      <Particles
        className="absolute inset-0 z-[0]"
        quantity={200}
        staticity={30}
        color={color}
        ease={100}
        refresh
      />
      <div className="container relative z-[10]">
        <motion.h2
          className="section-title text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          Preguntas Frecuentes
        </motion.h2>

        <motion.div
          className="faq-container soft-glass"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleAccordion(index)}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`faq-icon ${openIndex === index ? "open" : ""}`}
                  size={20}
                />
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="faq-answer-container"
                  >
                    <div className="faq-answer">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
