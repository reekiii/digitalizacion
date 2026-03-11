import { useEffect, useRef } from "react";
import { cn } from "../../../lib/utils";

// ─── GLSL Vertex Shader ──────────────────────────────────────────────────────
const VERT = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// ─── GLSL Fragment Shader — FBM Domain Warping ───────────────────────────────
// Classic technique by Inigo Quilez: fbm(p + fbm(p + fbm(p)))
// Creates organic flowing "cloud-like" patterns running on the GPU.
const FRAG = `
  precision mediump float;

  uniform float u_time;
  uniform vec2  u_resolution;
  uniform float u_dark;   // 0.0 = light mode, 1.0 = dark mode

  // ── Pseudo-random hash ──────────────────────────────────────────────────
  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  // ── Smooth value noise ──────────────────────────────────────────────────
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f); // smoothstep

    return mix(
      mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), u.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
      u.y
    );
  }

  // ── Fractal Brownian Motion (5 octaves) ─────────────────────────────────
  float fbm(vec2 p) {
    float v    = 0.0;
    float amp  = 0.5;
    float freq = 1.0;
    mat2 rot   = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5)); // rotate each octave

    for (int i = 0; i < 5; i++) {
      v   += amp  * noise(p * freq);
      p    = rot  * p;
      freq *= 2.0;
      amp  *= 0.45;
    }
    return v;
  }

  void main() {
    // Normalise UV (0→1), flip Y
    vec2 uv = gl_FragCoord.xy / u_resolution;
    uv.y    = 1.0 - uv.y;

    float t = u_time * 0.04; // very slow drift

    // ── Domain warping (3 layers) ───────────────────────────────────────
    vec2 q = vec2(
      fbm(uv * 2.1 + t),
      fbm(uv * 2.1 + vec2(5.2, 1.3) + t)
    );

    vec2 r = vec2(
      fbm(uv * 2.0 + 2.0 * q + vec2(1.7, 9.2) + 0.15 * t),
      fbm(uv * 2.0 + 2.0 * q + vec2(8.3, 2.8) + 0.126 * t)
    );

    float f = fbm(uv + r);

    // ── Colour mapping ──────────────────────────────────────────────────
    vec4 col;

    if (u_dark > 0.5) {
      // Dark mode — zinc/slate tones, very subtle
      vec3 deep  = vec3(0.055, 0.055, 0.072);   // #0e0e12
      vec3 mid   = vec3(0.110, 0.110, 0.140);   // #1c1c24
      vec3 light = vec3(0.175, 0.175, 0.210);   // #2c2c35
      vec3 c     = mix(deep, mix(mid, light, clamp(f * 2.0 - 1.0, 0.0, 1.0)), clamp(f * 2.0, 0.0, 1.0));
      col        = vec4(c, 0.55 + f * 0.3);
    } else {
      // Light mode — near-white with warm grey variation
      vec3 bright = vec3(0.975, 0.975, 0.980);  // #f8f8fa
      vec3 soft   = vec3(0.920, 0.920, 0.930);  // #ebebed
      vec3 muted  = vec3(0.860, 0.860, 0.875);  // #dbdbdf
      vec3 c      = mix(bright, mix(soft, muted, clamp(f * 2.0 - 1.0, 0.0, 1.0)), clamp(f * 2.0, 0.0, 1.0));
      col         = vec4(c, 0.50 + f * 0.35);
    }

    gl_FragColor = col;
  }
`;

// ─── Helper: compile + link WebGL program ────────────────────────────────────
function createProgram(gl: WebGLRenderingContext) {
  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(s));
    }
    return s;
  };
  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs = compile(gl.FRAGMENT_SHADER, FRAG);
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  return prog;
}

// ─── Component ───────────────────────────────────────────────────────────────
interface Props {
  className?: string;
}

export default function GlslNoiseShader({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false });
    if (!gl) {
      console.warn("WebGL not supported; skipping shader.");
      return;
    }

    const prog = createProgram(gl);
    gl.useProgram(prog);

    // Full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const posLoc = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uResolution = gl.getUniformLocation(prog, "u_resolution");
    const uDark = gl.getUniformLocation(prog, "u_dark");

    // Render at half-res for performance, CSS scales it up
    const scale = 0.5;

    const resize = () => {
      canvas.width = Math.floor(canvas.offsetWidth * scale);
      canvas.height = Math.floor(canvas.offsetHeight * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let animId: number;
    let startTime = performance.now();

    const render = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      const dark = document.documentElement.classList.contains("dark")
        ? 1.0
        : 0.0;

      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uDark, dark);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      gl.deleteProgram(prog);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "absolute inset-0 w-full h-full pointer-events-none",
        // CSS upscales the half-res canvas without blurring too much
        "image-rendering: pixelated",
        className,
      )}
      style={{
        imageRendering: "pixelated",
        filter: "blur(32px)",
        opacity: 0.9,
      }}
    />
  );
}
