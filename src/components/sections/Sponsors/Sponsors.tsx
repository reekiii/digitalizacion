import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  SiReact, 
  SiTailwindcss, 
  SiVercel, 
  SiGithub, 
  SiFramer,
  SiTypescript,
  SiVite,
  SiOpenai
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import './Sponsors.css';

const techLogos = [
  { name: "React", icon: <SiReact /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "Vercel", icon: <SiVercel /> },
  { name: "GitHub", icon: <SiGithub /> },
  { name: "VS Code", icon: <VscCode /> },
  { name: "Framer Motion", icon: <SiFramer /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "Vite", icon: <SiVite /> },
  { name: "Antigravity", icon: <SiOpenai /> }, 
];

export default function Sponsors() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);

  return (
    <section className="sponsors-section" id="tecnologia" ref={containerRef}>
      <div className="container">
        <p className="sponsors-label">Tecnología de alto impacto</p>
        <div className="sponsors-marquee-container">
          <motion.div 
            className="sponsors-marquee"
            animate={isInView ? { x: [0, -1200] } : {}} 
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[...techLogos, ...techLogos, ...techLogos].map((tech, index) => (
              <div key={index} className="sponsor-logo-wrapper">
                <span className="tech-icon">{tech.icon}</span>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
