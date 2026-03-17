import { motion } from "framer-motion";
import { 
  SiReact, 
  SiTypescript, 
  SiNextdotjs, 
  SiFramer, 
  SiTailwindcss, 
  SiVite, 
  SiVercel, 
  SiShopify,
  SiGoogleanalytics
} from "react-icons/si";
import './Sponsors.css';

const techLogos = [
  { name: "React", icon: <SiReact /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Framer", icon: <SiFramer /> },
  { name: "Tailwind", icon: <SiTailwindcss /> },
  { name: "Vite", icon: <SiVite /> },
  { name: "Vercel", icon: <SiVercel /> },
  { name: "Shopify", icon: <SiShopify /> },
  { name: "Google Analytics", icon: <SiGoogleanalytics /> },
];

export default function Sponsors() {
  return (
    <section className="sponsors-section">
      <div className="container">
        <p className="sponsors-label">Tecnología de alto impacto</p>
        <div className="sponsors-marquee-container">
          <motion.div 
            className="sponsors-marquee"
            animate={{ x: [0, -1035] }} // Adjust based on content width
            transition={{ 
              duration: 30, 
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
