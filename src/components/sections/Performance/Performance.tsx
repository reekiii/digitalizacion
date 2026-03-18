import { motion } from 'framer-motion';
import { ExternalLink, Zap, CheckCircle2, BarChart } from 'lucide-react';
import NumberTicker from '../../ui/NumberTicker/NumberTicker';
import PerformanceChart from './PerformanceChart';
import './Performance.css';

export default function Performance() {
    const metrics = [
        { icon: <Zap size={24} />, value: <NumberTicker value={1} prefix="< " suffix="s" delay={0.2} />, label: 'Carga inicial' },
        { icon: <BarChart size={24} />, value: <NumberTicker value={100} suffix="%" delay={0.4} />, label: 'Estructura para Google' },
        { icon: <CheckCircle2 size={24} />, value: <NumberTicker value={99} delay={0.6} />, label: 'Puntuación técnica' },
    ];

    return (
        <section className="perf-section">
            <div className="container">
                <div className="perf-grid">
                    <motion.div
                        className="perf-content"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="perf-badge">Caso de éxito: Salty Soul Trips</div>
                        <h2 className="perf-title">Tu web será ultrarrápida</h2>
                        <p className="perf-desc">
                            Como hice con Salty Soul Trips, optimizo tu web al máximo. Una página que vuela no solo da confianza, sino que facilita mucho que tus clientes y Google te encuentren.
                        </p>
                        <a
                            href="https://www.saltysoultrips.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="perf-link"
                        >
                            Ver proyecto en vivo <ExternalLink size={16} />
                        </a>
                    </motion.div>

                    <motion.div
                        className="perf-metrics soft-glass"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <PerformanceChart />
                        <div className="metrics-grid">
                            {metrics.map((metric, i) => (
                                <div key={i} className="metric-item">
                                    <div className="metric-icon">{metric.icon}</div>
                                    <div className="metric-value">{metric.value}</div>
                                    <div className="metric-label">{metric.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
