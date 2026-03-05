/**
 * PhotoCarousel.jsx
 * ─────────────────────────────────────────────────────
 * Carrusel automático estilo pixel art para el portfolio.
 *
 * 🖼️  CÓMO AGREGAR TUS FOTOS:
 * 1. Poné tus fotos en la carpeta src/assets/  (ej: foto1.jpg, foto2.jpg)
 * 2. Reemplazá los imports de abajo con tus archivos reales.
 * 3. Actualizá el array PHOTOS con los imports y las descripciones que quieras.
 *
 * Ejemplo:
 *   import foto1 from "../assets/mi-foto-1.jpg";
 *   import foto2 from "../assets/mi-foto-2.jpg";
 * ─────────────────────────────────────────────────────
 */

import { useState, useEffect, useRef } from "react";
import foto1 from "./assets/Fotos/WhatsApp Image 2026-03-05 at 14.08.27.jpeg";
import foto2 from "./assets/Fotos/WhatsApp Image 2026-03-05 at 13.46.44.jpeg";
import foto3 from "./assets/Fotos/WhatsApp Image 2026-03-05 at 14.03.42.jpeg";
import foto4 from "./assets/Fotos/WhatsApp Image 2026-03-05 at 14.03.43.jpeg";
import foto5 from "./assets/Fotos/WhatsApp Image 2026-03-05 at 14.03.45.jpeg";
import foto6 from "./assets/Fotos/WhatsApp Image 2026-03-05 at 14.03.46.jpeg";
import foto7 from "./assets/Fotos/WhatsApp Image 2026-03-05 at 14.03.47.jpeg";
import foto8 from "./assets/Fotos/WhatsApp Image 2026-03-05 at 14.06.24.jpeg";
import foto9 from "./assets/Fotos/WhatsApp Image 2026-03-05 at 14.06.26.jpeg";
import foto10 from "./assets/Fotos/WhatsApp Image 2026-03-05 at 14.06.28 (1).jpeg";
import foto11 from "./assets/Fotos/WhatsApp Image 2026-03-05 at 14.14.33.jpeg";


// ── 🔧 CAMBIÁ ESTOS IMPORTS POR TUS FOTOS REALES ──────────────────────────────
// import foto1 from "../assets/foto1.jpg";
// import foto2 from "../assets/foto2.jpg";
// import foto3 from "../assets/foto3.jpg";
// import foto4 from "../assets/foto4.jpg";
// ──────────────────────────────────────────────────────────────────────────────

// ── 🔧 CAMBIÁ ESTE ARRAY CON TUS DATOS ───────────────────────────────────────
const PHOTOS = [
  { src: foto1, label: "📸 Foto 1", caption: "" },
  { src: foto2, label: "📸 Foto 2", caption: "" },
  { src: foto3, label: "📸 Foto 3", caption: "" },
  { src: foto4, label: "📸 Foto 4", caption: "" },
  { src: foto5, label: "📸 Foto 5", caption: "" },
  { src: foto6, label: "📸 Foto 6", caption: "" },
  { src: foto7, label: "📸 Foto 7", caption: "" },
  { src: foto8, label: "📸 Foto 8", caption: "" },
  { src: foto9, label: "📸 Foto 9", caption: "" },
  { src: foto10, label: "📸 Foto 10", caption: "" },
  { src: foto11, label: "📸 Foto 11", caption: "" },
];

// ── Intervalo en ms entre slides (por defecto 3.5 seg) ───────────────────────
const AUTO_INTERVAL = 3500;
// ─────────────────────────────────────────────────────────────────────────────

const CSS_CAROUSEL = `
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes progressBar {
    from { width: 0%; }
    to   { width: 100%; }
  }
  .slide-in-right { animation: slideInRight 0.35s ease forwards; }
  .slide-in-left  { animation: slideInLeft  0.35s ease forwards; }

  .carousel-thumb {
    width: 44px; height: 44px;
    border: 3px solid rgba(255,215,0,0.2);
    cursor: pointer;
    overflow: hidden;
    transition: border-color .15s, transform .15s;
    flex-shrink: 0;
  }
  .carousel-thumb:hover { border-color: rgba(255,215,0,0.7); transform: translateY(-3px); }
  .carousel-thumb.active { border-color: #ffd700; box-shadow: 0 0 10px #ffd700; }

  .carousel-arrow {
    width: 40px; height: 40px;
    background: rgba(10,18,50,0.85);
    border: 3px solid #ffd700;
    color: #ffd700;
    font-family: 'Press Start 2P', monospace;
    font-size: 14px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 4px 4px 0 #92620a;
    transition: transform .08s, box-shadow .08s;
    flex-shrink: 0;
    user-select: none;
  }
  .carousel-arrow:hover  { transform: translateY(-2px); box-shadow: 4px 6px 0 #92620a; }
  .carousel-arrow:active { transform: translateY(2px);  box-shadow: 2px 2px 0 #92620a; }
`;

export default function PhotoCarousel() {
  const [current, setCurrent]   = useState(0);
  const [dir, setDir]           = useState("right"); // animation direction
  const [paused, setPaused]     = useState(false);
  const [animKey, setAnimKey]   = useState(0);       // force re-mount for animation
  const [progKey, setProgKey]   = useState(0);       // restart progress bar
  const timerRef                = useRef(null);
  const total                   = PHOTOS.length;

  const goTo = (index, direction = "right") => {
    setDir(direction);
    setAnimKey((k) => k + 1);
    setProgKey((k) => k + 1);
    setCurrent((index + total) % total);
  };

  const next = () => goTo(current + 1, "right");
  const prev = () => goTo(current - 1, "left");

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, AUTO_INTERVAL);
    return () => clearTimeout(timerRef.current);
  }, [current, paused]);

  const photo = PHOTOS[current];

  return (
    <>
      <style>{CSS_CAROUSEL}</style>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          width: "100%",
          maxWidth: 440,
          margin: "0 auto",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* ── Main frame ─────────────────────────────────────────────────── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            border: "4px solid #ffd700",
            boxShadow: "8px 8px 0 #92620a, 0 0 30px rgba(255,215,0,0.1)",
            background: "#04060f",
            overflow: "hidden",
          }}
        >
          {/* Scanline overlay (pixel vibe) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
              pointerEvents: "none",
              zIndex: 3,
            }}
          />

          {/* Corner decorations */}
          {["top:0;left:0", "top:0;right:0", "bottom:0;left:0", "bottom:0;right:0"].map(
            (pos, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  ...Object.fromEntries(pos.split(";").map((p) => p.split(":"))),
                  width: 14,
                  height: 14,
                  background: "#ffd700",
                  zIndex: 4,
                }}
              />
            )
          )}

          {/* Photo */}
          <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
            <img
              key={animKey}
              src={photo.src}
              alt={photo.label}
              className={dir === "right" ? "slide-in-right" : "slide-in-left"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />

            {/* Caption overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
                padding: "32px 16px 16px",
                zIndex: 2,
              }}
            >
              <p
                style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: 20,
                  color: "white",
                  lineHeight: 1.4,
                  textShadow: "1px 1px 0 #000",
                }}
              >
                {photo.caption}
              </p>
            </div>

            {/* Slide counter badge */}
            <div
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "rgba(0,0,0,0.75)",
                border: "2px solid #ffd700",
                padding: "4px 8px",
                zIndex: 2,
              }}
            >
              <span
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 7,
                  color: "#ffd700",
                }}
              >
                {String(current + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          {!paused && (
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 4,
                background: "rgba(255,215,0,0.2)",
                zIndex: 5,
              }}
            >
              <div
                key={progKey}
                style={{
                  height: "100%",
                  background: "#ffd700",
                  boxShadow: "0 0 8px #ffd700",
                  animation: `progressBar ${AUTO_INTERVAL}ms linear forwards`,
                }}
              />
            </div>
          )}
        </div>

        {/* ── Controls row ───────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            width: "100%",
            justifyContent: "center",
          }}
        >
          {/* Prev */}
          <button className="carousel-arrow" onClick={prev}>
            ◀
          </button>

          {/* Thumbnails */}
          <div style={{ display: "flex", gap: 8, flex: 1, justifyContent: "center", overflow: "hidden" }}>
            {PHOTOS.map((p, i) => (
              <button
                key={i}
                className={`carousel-thumb ${i === current ? "active" : ""}`}
                onClick={() => goTo(i, i > current ? "right" : "left")}
                title={p.label}
                style={{ padding: 0, background: "none" }}
              >
                <img
                  src={p.src}
                  alt={p.label}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </button>
            ))}
          </div>

          {/* Next */}
          <button className="carousel-arrow" onClick={next}>
            ▶
          </button>
        </div>

        {/* ── Label ──────────────────────────────────────────────────────── */}
        <div
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 7,
            color: "#64748b",
            letterSpacing: 2,
            textAlign: "center",
          }}
        >
          {photo.label}
          {paused && (
            <span style={{ color: "#ffd700", marginLeft: 12 }}>⏸ PAUSED</span>
          )}
        </div>
      </div>
    </>
  );
}
