import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import type { MouseEvent } from "react";
import "./Packs.css";

const plans = [
  {
    name: "Starter",
    price: "300",
    isTextPrice: false,
    description: "Presencia digital profesional de una página.",
    features: [
      "1 Página (Landing Page)",
      "100% Mobile Responsive",
      "Optimización básica",
      "Entrega en 5 días",
    ],
    buttonText: "Elegir Starter",
    highlighted: false,
  },
  {
    name: "Business",
    price: "600",
    isTextPrice: false,
    description: "La solución completa para tu negocio.",
    features: [
      "Hasta 4 Páginas",
      "SEO Básico",
      "Optimización de velocidad",
      "Entrega en 10 días",
    ],
    buttonText: "Elegir Business",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "900",
    isTextPrice: false,
    description: "Máxima potencia y escalabilidad.",
    features: [
      "Hasta 7 Páginas",
      "SEO Optimizado",
      "Animaciones Avanzadas",
      "Soporte Premium",
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
        <div className="packs-header">
          <div className="pricing-badge">Planes</div>
          <h2 className="section-title">Packs de Diseño Web</h2>
          <p className="packs-subtitle">
            Escalabilidad y rendimiento adaptados a tus necesidades.
          </p>
        </div>

        <div className="packs-grid">
          {plans.map((plan, index) => (
            <MagicCard key={index} plan={plan} index={index} />
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
            <strong>Mantenimiento proactivo por solo 20€/mes:</strong>{" "}
            Seguridad, actualizaciones y soporte técnico incluidos.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
