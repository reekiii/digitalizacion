import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import type { MouseEvent } from "react";
import TiltCard from "../../ui/TiltCard";
import "./Packs.css";

const plans = [
  {
    name: "Starter",
    price: "300",
    isTextPrice: false,
    description: "Ideal para empezar con una página de presentación clara.",
    features: [
      "1 Página (Landing)",
      "Se ve perfecto en el móvil",
      "Rápida y segura",
      "Lista en 5 días",
    ],
    buttonText: "Elegir Starter",
    highlighted: false,
  },
  {
    name: "Business",
    price: "600",
    isTextPrice: false,
    description: "La opción más completa con varias secciones para tu negocio.",
    features: [
      "Hasta 4 Páginas",
      "Preparada para Google",
      "Web ultrarrápida",
      "Puesta a punto Google Maps",
    ],
    buttonText: "Elegir Business",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "900",
    isTextPrice: false,
    description: "Si necesitas una web más grande y con funciones especiales.",
    features: [
      "Hasta 7 Páginas",
      "Mejor posición en Google",
      "Diseño dinámico",
      "Gestión de Google Maps",
    ],
    buttonText: "Elegir Premium",
    highlighted: false,
  },
];

function MagicCard({ plan, index }: { plan: any; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (!plan.highlighted) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className={`pack-card soft-glass ${plan.highlighted ? "highlighted group" : ""}`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      {plan.highlighted && (
        <motion.div
          className="magic-glow pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
                            radial-gradient(
                                350px circle at ${mouseX}px ${mouseY}px,
                                rgba(161, 161, 170, 0.15),
                                transparent 80%
                            )
                        `,
            zIndex: -1,
          }}
        />
      )}

      {plan.highlighted && <div className="pack-badge">Más elegido</div>}

      <h3 className="pack-name">{plan.name}</h3>

      <div className={`pack-price ${plan.isTextPrice ? "text-price" : ""}`}>
        {!plan.isTextPrice && <span className="currency">€</span>}
        <span className="amount">{plan.price}</span>
      </div>

      <p className="pack-desc">{plan.description}</p>

      <ul className="pack-features">
        {plan.features.map((feature: string, i: number) => (
          <li key={i}>
            <Check size={18} className="feature-icon" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href="#contacto"
        className={`pack-btn ${plan.highlighted ? "primary" : "secondary"}`}
      >
        {plan.buttonText}
      </a>
    </motion.div>
  );
}

export default function Packs() {
  return (
    <section id="packs" className="packs-section">
      <div className="container">
        <motion.div
          className="packs-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="pricing-badge">Oferta de Lanzamiento</div>
          <h2 className="section-title">Planes y Precios</h2>
          <p className="packs-subtitle">
            Aprovecha estos precios especiales para los primeros proyectos de este año.
          </p>
        </motion.div>

        <div className="packs-grid">
          {plans.map((plan, index) => (
            <TiltCard key={index} className="h-full">
              <MagicCard plan={plan} index={index} />
            </TiltCard>
          ))}
        </div>

        <motion.div
          className="pricing-maintenance soft-glass"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ShieldCheck size={24} className="maintenance-icon" />
          <p>
            <strong>Mantenimiento + Google Maps por 40€/mes:</strong>{" "}
            Seguridad, actualizaciones y gestión de tu ficha de Google Maps incluidos.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
