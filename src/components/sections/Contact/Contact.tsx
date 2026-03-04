import { motion } from 'framer-motion';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';
import './Contact.css';

export default function Contact() {
    return (
        <section id="contacto" className="contact-section">
            <div className="container contact-container">
                <div className="contact-grid">

                    {/* Info Side */}
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title">Hablemos de tu proyecto.</h2>
                        <p className="contact-desc">
                            Si buscas una web rápida, escalable y con un diseño impecable, envíame un mensaje.
                            Responderé en menos de 24 horas para agendar una breve videollamada.
                        </p>

                        <div className="contact-details">
                            <a href="mailto:ikerdelgras@gmail.com" className="contact-item">
                                <div className="contact-icon-wrapper">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="contact-item-label">Email</p>
                                    <p className="contact-item-value">ikerdelgras@gmail.com</p>
                                </div>
                            </a>

                            <a href="tel:+34657828903" className="contact-item">
                                <div className="contact-icon-wrapper">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="contact-item-label">Teléfono</p>
                                    <p className="contact-item-value">+34 657 828 903</p>
                                </div>
                            </a>
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        className="contact-form-wrapper soft-glass"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group">
                                <label htmlFor="name">Nombre</label>
                                <input type="text" id="name" placeholder="Tu nombre" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" placeholder="tu@email.com" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Mensaje</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    placeholder="Cuéntame sobre tu proyecto..."
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="submit-btn">
                                Enviar mensaje <ArrowUpRight size={18} />
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>

        </section>
    );
}
