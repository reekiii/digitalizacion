import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import GlslNoiseShader from "../../ui/GlslNoiseShader/GlslNoiseShader";
import "./FAQ.css";

const faqs = [
  {
    q: "¿Cuánto tiempo tarda el desarrollo?",
    a: "Para el Pack Starter, el tiempo de entrega es de solo 5 días hábiles tras la auditoría inicial. Proyectos más complejos como el Pack Business se entregan en 10 días.",
  },
  {
    q: "¿Soy el dueño legal de mi página y mi código?",
    a: "Totalmente. En GrasDesign configuramos las cuentas de GitHub y Vercel bajo tu propio nombre. El código es un activo de tu empresa y tú tienes las llaves de acceso desde el primer día.",
  },
  {
    q: "¿Necesito conocimientos técnicos para mantener la web?",
    a: "Para nada. Nuestro objetivo es que te centres en tu negocio. Ofrecemos mantenimiento opcional para que tu web esté siempre actualizada, segura y con los cambios que necesites.",
  },
  {
    q: "¿La web estará optimizada para captar clientes?",
    a: "Sí. Aplicamos el estándar de 'Salty Soul Trips': rendimiento extremo con menos de 1 segundo de carga, 100% de SEO técnico y una puntuación de 99 en PageSpeed.",
  },
  {
    q: "¿Cómo gestionamos el hosting y el dominio?",
    a: "Te guío paso a paso para contratar el dominio y hosting a tu nombre. Esto garantiza que nadie pueda 'secuestrar' tu web y que tengas el control total de tus facturas.",
  },
  {
    q: "¿Cómo se realiza el pago de los servicios?",
    a: "Para comenzar el proyecto se abona el 50% del presupuesto tras la auditoría inicial. El 50% restante se paga el Día 5, una vez que la web está terminada y lista para ser lanzada.",
  },
  {
    q: "¿Por qué usáis esta tecnología y no WordPress?",
    a: "En GrasDesign utilizamos tecnologías modernas (Next.js y Vercel) porque son infinitamente más rápidas y seguras. Esto nos permite alcanzar rendimientos extremos como el de Salty Soul Trips, con cargas en menos de 1 segundo y 99 de PageSpeed, algo muy difícil de lograr con herramientas tradicionales.",
  },
  {
    q: "¿Qué sucede si necesito hacer cambios en el futuro?",
    a: "Tu web es totalmente escalable. Si tu negocio crece, podemos pasar del Pack Starter al Business o incluso al Premium en cualquier momento. Estamos aquí para acompañar tu crecimiento.",
  },
  {
    q: "¿Quién se encarga de las fotos y los textos?",
    a: "Durante el proceso de diseño definimos la estructura y los textos. Tú proporcionas la información clave de tu negocio y nosotros la optimizamos mediante 'copywriting' estratégico para que convenza a tus visitas.",
  },
  {
    q: "¿Qué pasa si ya tengo un dominio comprado?",
    a: "No hay problema. Simplemente lo vincularemos a tu nueva infraestructura en Vercel. Te guiaremos para hacer una pequeña configuración técnica que tardaremos menos de 5 minutos en completar.",
  },
  {
    q: "¿Ofrecéis algún tipo de garantía?",
    a: "Nuestra garantía es nuestro método de trabajo: hasta que no estés conforme con el resultado final en la revisión previa al lanzamiento, no realizamos el despliegue definitivo. Tu éxito es nuestra prioridad.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <GlslNoiseShader />
      <div className="container">
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
