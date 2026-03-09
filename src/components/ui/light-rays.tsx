import { motion } from "framer-motion";

export const LightRays = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="w-full h-full opacity-60"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ray-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Generate multiple rays with different animations */}
        {[...Array(12)].map((_, i) => (
          <motion.path
            key={i}
            d={`M ${10 + i * 8} -10 L ${-20 + i * 8} 110 L ${-10 + i * 8} 110 L ${20 + i * 8} -10 Z`}
            className="text-primary-alpha"
            style={{
              color: "var(--text-primary)",
              fill: "url(#ray-gradient)",
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: [0.15, 0.5, 0.15],
              x: [0, 5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
      {/* Soft glow at the top source */}
      <div
        className="absolute top-0 left-0 right-0 h-48 blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, var(--text-primary), transparent 70%)",
        }}
      />
    </div>
  );
};

export default LightRays;
