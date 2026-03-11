import { useEffect, useRef } from "react";
import { cn } from "../../../lib/utils";

interface BackgroundBeamsProps {
  className?: string;
}

export default function BackgroundBeams({ className }: BackgroundBeamsProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    let animationId: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;

      // Animate each beam path with slightly different speeds
      const paths = svg.querySelectorAll(".beam-path");
      paths.forEach((path, i) => {
        const speed = 0.3 + i * 0.07;
        const offset = (elapsed * speed * 100) % 200;
        (path as SVGPathElement).style.strokeDashoffset = `${-offset}`;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <svg
      ref={svgRef}
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Gradient for beams – light mode */}
        <linearGradient id="beam-grad-0" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="rgba(113,113,122,0.15)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="beam-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="rgba(161,161,170,0.12)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="beam-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="rgba(82,82,91,0.1)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>

        {/* Mask so beams fade at edges */}
        <mask id="fade-mask">
          <radialGradient id="fade-grad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <rect width="100%" height="100%" fill="url(#fade-grad)" />
        </mask>
      </defs>

      <g mask="url(#fade-mask)">
        {/* Beam 1 – diagonal from top-left to bottom-right */}
        <path
          className="beam-path"
          d="M-200,100 Q400,400 1000,200 T1800,500"
          fill="none"
          stroke="url(#beam-grad-0)"
          strokeWidth="1.5"
          strokeDasharray="80 120"
          opacity="0.8"
        />

        {/* Beam 2 */}
        <path
          className="beam-path"
          d="M-100,300 Q300,100 800,500 T1700,200"
          fill="none"
          stroke="url(#beam-grad-1)"
          strokeWidth="1"
          strokeDasharray="60 150"
          opacity="0.6"
        />

        {/* Beam 3 – from top-right */}
        <path
          className="beam-path"
          d="M1600,50 Q1000,300 600,150 T-100,600"
          fill="none"
          stroke="url(#beam-grad-0)"
          strokeWidth="1.5"
          strokeDasharray="100 100"
          opacity="0.7"
        />

        {/* Beam 4 */}
        <path
          className="beam-path"
          d="M1700,200 Q1100,500 700,300 T0,700"
          fill="none"
          stroke="url(#beam-grad-2)"
          strokeWidth="1"
          strokeDasharray="70 130"
          opacity="0.5"
        />

        {/* Beam 5 – faint horizontal sweep */}
        <path
          className="beam-path"
          d="M-200,450 Q400,350 900,480 T1700,400"
          fill="none"
          stroke="url(#beam-grad-1)"
          strokeWidth="0.8"
          strokeDasharray="90 110"
          opacity="0.4"
        />

        {/* Beam 6 – bottom arc */}
        <path
          className="beam-path"
          d="M0,800 Q500,600 900,750 T1440,650"
          fill="none"
          stroke="url(#beam-grad-0)"
          strokeWidth="1.2"
          strokeDasharray="80 120"
          opacity="0.6"
        />
      </g>
    </svg>
  );
}
