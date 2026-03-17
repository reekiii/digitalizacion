import { motion } from "framer-motion";
import "./PerformanceChart.css";

export default function PerformanceChart() {
  const points = "0,100 20,80 40,85 60,40 80,45 100,10";
  
  return (
    <div className="perf-chart-container">
      <div className="perf-chart-header">
        <span className="chart-label">Conversión Anual</span>
        <span className="chart-value">+324%</span>
      </div>
      
      <div className="svg-container">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="perf-svg">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--text-primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--text-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Area under the curve */}
          <motion.path
            d={`M 0 100 L ${points} L 100 100 Z`}
            fill="url(#chartGradient)"
            initial={{ opacity: 0, pathLength: 0 }}
            whileInView={{ opacity: 1, pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          
          {/* The line itself */}
          <motion.path
            d={`M ${points}`}
            fill="none"
            stroke="var(--text-primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          
          {/* Animated data points */}
          {[0, 20, 40, 60, 80, 100].map((x, i) => {
            const y = [100, 80, 85, 40, 45, 10][i];
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="1.5"
                fill="var(--text-primary)"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
              />
            );
          })}
        </svg>
      </div>
      
      <div className="chart-footer">
        <span>ENE</span>
        <span>MAR</span>
        <span>MAY</span>
        <span>JUL</span>
        <span>SEP</span>
        <span>DIC</span>
      </div>
    </div>
  );
}
