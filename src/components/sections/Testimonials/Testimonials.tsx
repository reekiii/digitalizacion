import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
    {
        text: "Iker no solo hizo una web bonita, construyó una herramienta de ventas. Nuestra tasa de conversión subió un 40% en el primer mes.",
        author: "María G.",
        role: "CEO, Salty Soul Trips"
    },
    {
        text: "El diseño transmite exactamente la exclusividad que buscábamos. Un proceso fluido, muy profesional y sin fricciones técnicas.",
        author: "Carlos R.",
        role: "Director, Arquitectura Global"
    }
];

export default function Testimonials() {
    return (
        <section className="testimonials-section">
            <div className="container">
                <h2 className="section-title text-center">Lo que dicen los clientes</h2>

                <div className="testimonials-grid">
                    {testimonials.map((test, index) => (
                        <motion.div
                            key={index}
                            className="testimonial-card soft-glass"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <Quote className="quote-icon" size={32} />
                            <p className="testimonial-text">{test.text}</p>
                            <div className="testimonial-author">
                                <p className="author-name">{test.author}</p>
                                <p className="author-role">{test.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
