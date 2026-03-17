import { Warp } from "@paper-design/shaders-react";
import { useIsDarkMode } from "../../lib/useIsDarkMode";
import { Spotlight } from "./Spotlight/Spotlight";
import "./wrap-shader.css";

export default function WarpShaderHero() {
  const isDark = useIsDarkMode();

  const lightColors = [
    "hsla(206, 30%, 96%, 1.00)",
    "hsla(160, 5%, 76%, 1.00)",
    "hsla(180, 2%, 58%, 1.00)",
    "hsla(175, 9%, 72%, 1.00)",
  ];

  const darkColors = [
    "hsla(240, 2%, 24%, 1.00)",
    "hsla(0, 0%, 4%, 1.00)",
    "hsla(180, 6%, 23%, 1.00)",
    "hsla(0, 0%, 0%, 1.00)",
  ];

  return (
    <main className="warp-shader-main">
      <div className="warp-shader-bg">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill={isDark ? "white" : "rgba(0,0,0,0.1)"}
        />
        <Warp
          style={{ height: "100%", width: "100%" }}
          proportion={0.45}
          softness={1}
          distortion={0.25}
          swirl={0.8}
          swirlIterations={10}
          shape="checks"
          shapeScale={0.1}
          scale={1}
          rotation={0}
          speed={1}
          colors={isDark ? darkColors : lightColors}
        />
      </div>

      <div className="warp-shader-content">
        <div className="warp-shader-container">
          <img src="/assets/icon.png" alt="Logo" />
          <h1 className="warp-shader-title">
            <b>Diseño webs</b> que convierten visitas en clientes
          </h1>

          <p className="warp-shader-desc">
            Agencia de diseño web y tecnología de alto impacto. Creamos
            experiencias digitales que potencian tu negocio.
          </p>

          <div className="warp-shader-actions">
            <a
              href="#contacto"
              className="warp-shader-btn warp-shader-btn-glass"
            >
              Solicitar web
            </a>
            <a
              href="https://www.saltysoultrips.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="warp-shader-btn warp-shader-btn-white"
            >
              Ver proyectos
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
