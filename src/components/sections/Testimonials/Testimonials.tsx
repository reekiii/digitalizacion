import { motion } from "framer-motion";
import { Star } from "lucide-react";
import "./Testimonials.css";

const testimonials = [
  {
    text: "Iker transformó completamente nuestra presencia digital. La web es rápida, elegante y nos ha ayudado a atraer muchos más clientes. Su atención al detalle y conocimiento técnico son impresionantes.",
    author: "Angela J.",
    role: "CEO, Salty Soul Trips",
    initials: "AJ",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="testimonials-header">
          <h2 className="section-title">Lo que dicen los clientes</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((test, index) => (
            <motion.div
              key={index}
              className="testimonial-card soft-glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="testimonial-stars">
                {Array.from({ length: test.stars }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              <p className="testimonial-text">"{test.text}"</p>

              <div className="testimonial-author">
                <div className="author-avatar">{test.initials}</div>
                <div>
                  <p className="author-name">{test.author}</p>
                  <p className="author-role">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
