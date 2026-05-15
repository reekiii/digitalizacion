import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import type { MouseEvent } from "react";
import TiltCard from "../../ui/TiltCard";
import "./Packs.css";

const plans = [
  {
    name: "Express",
    time: "Lista en 5 días",
    price: "350",
    isTextPrice: false,
    description:
      "Para quien necesita una web profesional ya. Sin esperas, sin complicaciones. Tu negocio online esta semana.",
    features: [
      "1 página completa con hero, servicios, sobre ti y contacto",
      "Diseño a medida según tu imagen de marca",
      "100% responsive: móvil, tablet y escritorio",
      "Velocidad de carga optimizada",
      "Formulario de contacto + botón WhatsApp",
      "Aviso legal y política de privacidad (RGPD)",
    ],
    buttonText: "Empezar ya",
    highlighted: false,
  },
  {
    name: "Business",
    subtitle: "Web de negocio",
    time: "Lista en 10 días",
    price: "650",
    isTextPrice: false,
    description:
      "Una web completa que presenta tu negocio con claridad, genera confianza y convierte visitas en contactos.",
    features: [
      "Hasta 4 páginas: inicio, servicios, sobre mí, contacto",
      "Diseño personalizado + coherencia de marca",
      "Web ultrarrápida (Core Web Vitals optimizados)",
      "Google Maps integrado y ficha de empresa configurada",
      "Formularios, WhatsApp y enlaces a redes sociales",
      "Página visible en Google (indexada y con metadatos)",
      "RGPD completo + certificado SSL",
    ],
    buttonText: "Elegir Business",
    highlighted: true,
  },
  {
    name: "Premium",
    subtitle: "Web completa",
    time: "Lista en 15–18 días",
    price: "950",
    isTextPrice: false,
    description:
      "Para negocios que quieren una web sólida, con más páginas, funcionalidades avanzadas y rendimiento técnico de nivel alto.",
    features: [
      "Hasta 7 páginas con estructura clara y escalable",
      "Diseño avanzado con animaciones y microinteracciones",
      "Máxima velocidad: 95+ en PageSpeed",
      "Formulario de reservas o presupuesto automático",
      "Google Maps + galería de proyectos o portfolio",
      "Página visible en Google con metadatos avanzados",
      "30 días de soporte post-entrega incluidos",
    ],
    buttonText: "Consultar Premium",
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

      {plan.highlighted && <div className="pack-badge">⭐ Más elegido</div>}

      <div className="pack-header-info">
        <span className="pack-time">{plan.time}</span>
        <h3 className="pack-name">{plan.name}</h3>
        {plan.subtitle && <span className="pack-subtitle-tag">{plan.subtitle}</span>}
      </div>

      <div className={`pack-price ${plan.isTextPrice ? "text-price" : ""}`}>
        <div className="price-main">
          {!plan.isTextPrice && <span className="currency">€</span>}
          <span className="amount">{plan.price}</span>
        </div>
        <span className="iva-tag">+ IVA</span>
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
