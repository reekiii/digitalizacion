import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import './Contact.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        pack: 'unknown',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', pack: 'unknown', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

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
                            <a href="mailto:contactgrasdesign@gmail.com" className="contact-item">
                                <div className="contact-icon-wrapper">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="contact-item-label">Email</p>
                                    <p className="contact-item-value">contactgrasdesign@gmail.com</p>
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
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group-row">
                                <div className="form-group">
                                    <label htmlFor="name">Nombre</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        placeholder="Tu nombre" 
                                        required 
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Teléfono</label>
                                    <input 
                                        type="tel" 
                                        id="phone" 
                                        placeholder="+34 600 000 000" 
                                        required 
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    placeholder="tu@email.com" 
                                    required 
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="pack">Pack deseado</label>
                                <select 
                                    id="pack" 
                                    value={formData.pack}
                                    onChange={handleChange}
                                >
                                    <option value="starter">Pack Starter</option>
                                    <option value="business">Pack Business</option>
                                    <option value="premium">Pack Premium</option>
                                    <option value="unknown">Aún no lo sé</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Mensaje</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    placeholder="Cuéntame sobre tu proyecto..."
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                className={`submit-btn ${status === 'success' ? 'success' : ''}`}
                                disabled={status === 'loading'}
                            >
                                {status === 'idle' && (
                                    <>Enviar mensaje <ArrowUpRight size={18} /></>
                                )}
                                {status === 'loading' && (
                                    <>Enviando... <Loader2 size={18} className="animate-spin" /></>
                                )}
                                {status === 'success' && (
                                    <>Mensaje enviado <CheckCircle2 size={18} /></>
                                )}
                                {status === 'error' && (
                                    <>Error al enviar <AlertCircle size={18} /></>
                                )}
                            </button>
                            
                            {status === 'success' && (
                                <p className="status-msg success">¡Gracias! Te contactaremos pronto.</p>
                            )}
                            {status === 'error' && (
                                <p className="status-msg error">Hubo un problema. Inténtalo de nuevo.</p>
                            )}
                        </form>
                    </motion.div>

                </div>
            </div>

        </section>
    );
}
