import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './FAQ.css';

const faqs = [
    {
        q: "¿Cuánto tiempo tarda el desarrollo?",
        a: "Para el plan Esencial (One-page), el tiempo estimado es de 2 semanas desde la recepción del contenido. Proyectos más complejos llevan entre 4 y 8 semanas."
    },
    {
        q: "¿Necesito conocimientos técnicos para mantener la web?",
        a: "No. Si eliges el plan Profesional, configuro un panel de control (CMS) muy intuitivo para que puedas editar textos e imágenes sin tocar código."
    },
    {
        q: "¿El diseño será responsivo y estará optimizado para Google?",
        a: "Absolutamente. Todas las webs se desarrollan bajo el enfoque Mobile-First y cumplen con las mejores prácticas de SEO técnico y velocidad de carga (Core Web Vitals)."
    },
    {
        q: "¿Incluye hosting y dominio?",
        a: "No, pero te guiaré paso a paso para contratar las mejores opciones del mercado bajo tu propio nombre, asegurando que tú tengas el control total."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="faq-section">
            <div className="container">
                <h2 className="section-title text-center">Preguntas Frecuentes</h2>

                <div className="faq-container soft-glass">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <button
                                className="faq-question"
                                onClick={() => toggleAccordion(index)}
                            >
                                <span>{faq.q}</span>
                                <ChevronDown
                                    className={`faq-icon ${openIndex === index ? 'open' : ''}`}
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
                                        <div className="faq-answer">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
