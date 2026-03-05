/**
 * CertCarousel.jsx
 * ─────────────────────────────────────────────────────
 * Carrusel infinito horizontal de certificados.
 * Las imágenes son horizontales (landscape).
 *
 * 🖼️  CÓMO AGREGAR TUS CERTIFICADOS:
 * 1. Poné tus imágenes en src/assets/certs/
 *    Ej: cert1.jpg, cert2.jpg, cert3.jpg ...
 * 2. Importalas abajo donde dice "CAMBIÁ ESTOS IMPORTS"
 * 3. Actualizá el array CERTS con los datos de cada uno
 *
 * Ejemplo de import:
 *   import cert1 from "../assets/certs/python-udemy.jpg";
 * ─────────────────────────────────────────────────────
 */

import { useState, useRef, useEffect } from "react";
import cert1 from './assets/certificados/anglia.jpg';
import cert2 from './assets/certificados/Certificado de Bases de datos sql_page-0001.jpg';
import cert3 from './assets/certificados/Certificado de Javascript total_page-0001.jpg';
import cert4 from './assets/certificados/Certificado de python - Programacion_page-0001.jpg';
import cert5 from './assets/certificados/Certificado de Python para Data science y machine learning_page-0001.jpg';
import cert6 from './assets/certificados/certificado_jorge_rafael_martinez_delgado__alta_resolucion.png';
import cert7 from './assets/certificados/N8n total.jpg';
import cert8 from './assets/certificados/Scan_20260117 (2).jpg';

// ── 🔧 CAMBIÁ ESTOS IMPORTS POR TUS CERTIFICADOS REALES ──────────────────────
// import cert1 from "../assets/certs/python-ds.jpg";
// import cert2 from "../assets/certs/python-avanzado.jpg";
// import cert3 from "../assets/certs/webdev.jpg";
// import cert4 from "../assets/certs/database.jpg";
// import cert5 from "../assets/certs/google-ai.jpg";
// import cert6 from "../assets/certs/robotica.jpg";
// import cert7 from "../assets/certs/esol.jpg";
// ─────────────────────────────────────────────────────────────────────────────

// ── 🔧 CAMBIÁ ESTE ARRAY CON TUS DATOS ───────────────────────────────────────
const CERTS = [
  {
    src: cert1,
    title: "ESOL B1 English",
    issuer: "Anglia",
    color: "#34d399",
    icon: "🗣️",
  },
  {
    src: cert2,
    title: "Bases de Datos SQL",
    issuer: "Certificación",
    color : "#f87171",
    icon: "🗃️",
  },
  {
    src: cert3,
    title: "Javascript Total",
    issuer: "Desarrollo Web",
    color: "#c084fc",
    icon: "🌐",
  },
  {
    src: cert4,
    title: "Python - Programación",
    issuer: "Especialidad",
    color: "#60a5fa",
    icon: "🐍",
  },
  {
    src: cert5,
    title: "Python Data Science & ML",
    issuer: "Especialidad",
    color: "#4ade80",
    icon: "📊",
  },
  {
    src: cert6,
    title: "Google summit for Ia",
    issuer: "Certificación de participacion",
    color: "#f59e0b",
    icon: "✨",
  },
  {
    src: cert7,
    title: "N8n Total",
    issuer: "Automatización",
    color: "#93c5fd",
    icon: "⚙️",
  },
  {
    src: cert8,
    title: "Certificado Universitario por el Proyecto Kampa",
    issuer: "Certificación",
    color: "#fbbf24",
    icon: "📜",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

const CARD_W = 320; // ancho de cada card en px
const GAP = 20;     // gap entre cards
const SPEED = 0.6;  // px por frame (velocidad del scroll)

const CSS_CERT = `
  @keyframes certGlow {
    0%,100% { box-shadow: 6px 6px 0 #92620a; }
    50%      { box-shadow: 6px 6px 0 #92620a, 0 0 20px rgba(255,215,0,0.3); }
  }

  .cert-card {
    flex-shrink: 0;
    width: ${CARD_W}px;
    background: rgba(10,18,50,0.95);
    border: 3px solid rgba(255,215,0,0.3);
    box-shadow: 6px 6px 0 #92620a;
    overflow: hidden;
    cursor: pointer;
    transition: border-color .2s, transform .2s;
    position: relative;
  }
  .cert-card:hover {
    border-color: #ffd700;
    transform: translateY(-6px);
    animation: certGlow 1.5s ease-in-out infinite;
    z-index: 2;
  }

  .cert-img-wrap {
    width: 100%;
    aspect-ratio: 16/11;
    overflow: hidden;
    position: relative;
    background: #04060f;
  }
  .cert-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform .3s;
  }
  .cert-card:hover .cert-img-wrap img {
    transform: scale(1.04);
  }

  /* Modal */
  .cert-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.88);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    backdrop-filter: blur(6px);
  }
  .cert-modal-box {
    position: relative;
    max-width: 860px;
    width: 100%;
    border: 4px solid #ffd700;
    box-shadow: 10px 10px 0 #92620a;
    background: #04060f;
    overflow: hidden;
  }
  .cert-modal-close {
    position: absolute;
    top: 10px; right: 10px;
    width: 36px; height: 36px;
    background: #e53935;
    border: 3px solid #7b0000;
    box-shadow: 3px 3px 0 #7b0000;
    color: white;
    font-family: 'Press Start 2P', monospace;
    font-size: 10px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    z-index: 10;
    transition: transform .08s;
  }
  .cert-modal-close:hover  { transform: translateY(-2px); }
  .cert-modal-close:active { transform: translateY(2px); box-shadow: 1px 1px 0 #7b0000; }
`;

// ── Modal ─────────────────────────────────────────────────────────────────────
function CertModal({ cert, onClose }) {
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  return (
    <div className="cert-modal-overlay" onClick={onClose}>
      <div className="cert-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="cert-modal-close" onClick={onClose}>✕</button>
        <img
          src={cert.src}
          alt={cert.title}
          style={{ width: "100%", display: "block" }}
        />
        <div style={{ padding: "16px 20px", borderTop: `3px solid ${cert.color}44` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>{cert.icon}</span>
            <div>
              <div
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 9,
                  color: cert.color,
                  marginBottom: 4,
                  letterSpacing: 1,
                }}
              >
                {cert.title}
              </div>
              <div
                style={{
                  fontFamily: "'VT323', monospace",
                  fontSize: 18,
                  color: "#64748b",
                }}
              >
                {cert.issuer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function CertCarousel() {
  const trackRef   = useRef(null);
  const posRef     = useRef(0);
  const rafRef     = useRef(null);
  const pausedRef  = useRef(false);
  const [selected, setSelected] = useState(null);

  // Duplicate items for seamless infinite loop
  const items = [...CERTS, ...CERTS, ...CERTS];
  const totalW = CERTS.length * (CARD_W + GAP);

  useEffect(() => {
    const animate = () => {
      if (!pausedRef.current && trackRef.current) {
        posRef.current += SPEED;
        // reset when one full set has scrolled
        if (posRef.current >= totalW) posRef.current = 0;
        trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [totalW]);

  return (
    <>
      <style>{CSS_CERT}</style>

      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <div
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 8,
            color: "#ffd700",
            letterSpacing: 2,
          }}
        >
          ★ CERTIFICACIONES &amp; FORMACIÓN
        </div>
        <div
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: 16,
            color: "#475569",
            letterSpacing: 1,
          }}
        >
          CLICK PARA VER · HOVER PARA PAUSAR
        </div>
      </div>

      {/* Carousel viewport */}
      <div
        style={{
          overflow: "hidden",
          position: "relative",
          width: "100%",
          // Fade edges
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        {/* Scrolling track */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: GAP,
            willChange: "transform",
            paddingBottom: 12, // room for box-shadow
          }}
        >
          {items.map((cert, i) => (
            <div
              key={i}
              className="cert-card"
              onClick={() => setSelected(cert)}
            >
              {/* Top color bar */}
              <div
                style={{
                  height: 4,
                  background: cert.color,
                  boxShadow: `0 0 8px ${cert.color}`,
                }}
              />

              {/* Image */}
              <div className="cert-img-wrap">
                <img src={cert.src} alt={cert.title} />
                {/* Scanline overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.07) 2px,rgba(0,0,0,0.07) 4px)",
                    pointerEvents: "none",
                  }}
                />
                {/* Zoom hint */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    background: "rgba(0,0,0,0.7)",
                    border: `1px solid ${cert.color}66`,
                    padding: "3px 6px",
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: 6,
                    color: cert.color,
                    opacity: 0,
                    transition: "opacity .2s",
                  }}
                  className="cert-zoom-hint"
                >
                  🔍 VER
                </div>
              </div>

              {/* Footer */}
              <div
                style={{
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  borderTop: `2px solid ${cert.color}33`,
                }}
              >
                <span style={{ fontSize: 16, flexShrink: 0 }}>{cert.icon}</span>
                <div style={{ overflow: "hidden" }}>
                  <div
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: 7,
                      color: cert.color,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      marginBottom: 4,
                      letterSpacing: 0.5,
                    }}
                  >
                    {cert.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'VT323', monospace",
                      fontSize: 16,
                      color: "#64748b",
                    }}
                  >
                    {cert.issuer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <CertModal cert={selected} onClose={() => setSelected(null)} />
      )}

      {/* Hint CSS for zoom icon on hover */}
      <style>{`.cert-card:hover .cert-zoom-hint { opacity: 1 !important; }`}</style>
    </>
  );
}
