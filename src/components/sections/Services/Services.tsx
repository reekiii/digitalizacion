import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Check } from 'lucide-react';
import type { MouseEvent } from 'react';
import './Services.css';

const plans = [
    {
        name: "Esencial",
        price: "300",
        description: "La base perfecta para tu presencia online.",
        features: ["Landing Page (One-page)", "Propiedad total del código", "Configuración técnica inicial", "Optimización móvil"],
        buttonText: "Empezar",
        highlighted: false
    },
    {
        name: "Profesional",
        price: "600",
        description: "Crece con una web rápida y posicionada.",
        features: ["Web Autogestionable (CMS)", "Optimización SEO On-Page", "Diseño avanzado UI/UX", "Integración de analíticas", "Soporte prioritario"],
        buttonText: "Elegir Profesional",
        highlighted: true
    },
    {
        name: "Estratégico",
        price: "Desde 900",
        description: "Soluciones a medida para negocios en expansión.",
        features: ["Soluciones multipágina complejas", "Funciones personalizadas", "Múltiples automatizaciones", "Estrategia de conversión", "Auditoría mensual"],
        buttonText: "Consultar",
        highlighted: false
    }
];

function MagicCard({ plan, index }: { plan: any, index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Only apply mouse tracking for the highlighted card for exclusivity
    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        if (!plan.highlighted) return;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            className={`service-card soft-glass ${plan.highlighted ? 'highlighted group' : ''}`}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
        >
            {/* Magic Glow Effect via pseudo element mask */}
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
                        zIndex: -1
                    }}
                />
            )}

            {plan.highlighted && <div className="card-badge">Más popular</div>}

            <h3 className="plan-name">{plan.name}</h3>
            <div className="plan-price">
                <span className="currency">€</span>
                <span className="amount">{plan.price}</span>
            </div>
            <p className="plan-desc">{plan.description}</p>

            <ul className="plan-features">
                {plan.features.map((feature: string, i: number) => (
                    <li key={i}>
                        <Check size={18} className="feature-icon" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <a href="#contacto" className={`plan-btn ${plan.highlighted ? 'primary' : 'secondary'}`}>
                {plan.buttonText}
            </a>
        </motion.div>
    );
}

export default function Services() {
    return (
        <section id="servicios" className="services-section">
            <div className="container">
                <div className="services-header">
                    <h2 className="section-title">Soluciones escalables</h2>
                    <p className="services-subtitle">
                        Transparencia total. Elige el plan que mejor se adapte a tu etapa.
                    </p>
                </div>

                <div className="services-grid">
                    {plans.map((plan, index) => (
                        <MagicCard key={index} plan={plan} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
