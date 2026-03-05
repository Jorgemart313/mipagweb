import { useState, useEffect, useRef } from "react";
import PhotoCarousel from "./PhotoCarousel";
import CertCarousel from "./CertCarousel";


const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323:wght@400&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{background:#0a0e27;overflow-x:hidden;}
::-webkit-scrollbar{width:8px;}
::-webkit-scrollbar-track{background:#0a0e27;}
::-webkit-scrollbar-thumb{background:#ffd700;}
.pf{font-family:'Press Start 2P',monospace;}
.vt{font-family:'VT323',monospace;}

@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
@keyframes coinSpin{0%{transform:scaleX(1)}25%{transform:scaleX(0.7)}50%{transform:scaleX(0.1)}75%{transform:scaleX(0.7)}100%{transform:scaleX(1)}}
@keyframes cloudDrift{from{transform:translateX(-250px)}to{transform:translateX(110vw)}}
@keyframes starTwinkle{0%,100%{opacity:0.15}50%{opacity:1}}
@keyframes fadeInUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
@keyframes shimmer{to{left:200%;}}
@keyframes scanline{from{top:-20px}to{top:100vh}}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes glow{0%,100%{text-shadow:0 0 8px #ffd700}50%{text-shadow:0 0 24px #ffd700,0 0 48px #ff9800}}

.blink{animation:blink 1s step-end infinite;}
.float-anim{animation:float 3s ease-in-out infinite;}
.coin-spin{animation:coinSpin 0.7s steps(4) infinite;display:inline-block;}
.bounce{animation:bounce 1s ease-in-out infinite;}
.glow-text{animation:glow 2s ease-in-out infinite;}

.mario-btn{
  font-family:'Press Start 2P',monospace;
  background:#e53935;color:white;
  border:none;padding:12px 20px;font-size:9px;cursor:pointer;
  box-shadow:0 6px 0 #7b0000;text-decoration:none;display:inline-block;
  transition:transform .05s,box-shadow .05s;letter-spacing:1px;
  position:relative;top:0;
}
.mario-btn:hover{transform:translateY(3px);box-shadow:0 3px 0 #7b0000;}
.mario-btn:active{transform:translateY(6px);box-shadow:none;}
.mario-btn-yellow{background:#f59e0b;box-shadow:0 6px 0 #78350f;color:#1a0a00;}
.mario-btn-yellow:hover{box-shadow:0 3px 0 #78350f;}
.mario-btn-yellow:active{box-shadow:none;}
.mario-btn-green{background:#16a34a;box-shadow:0 6px 0 #14532d;}
.mario-btn-green:hover{box-shadow:0 3px 0 #14532d;}
.mario-btn-green:active{box-shadow:none;}
.mario-btn-blue{background:#1e40af;box-shadow:0 6px 0 #1e3a8a;}
.mario-btn-blue:hover{box-shadow:0 3px 0 #1e3a8a;}
.mario-btn-blue:active{box-shadow:none;}

.pixel-border{
  border:4px solid #ffd700;
  box-shadow:8px 8px 0 rgba(0,0,0,0.5),0 0 0 4px rgba(255,215,0,0.1);
}

.proj-card{
  background:rgba(10,18,50,0.95);
  border:3px solid #ffd700;
  box-shadow:6px 6px 0 #92620a;
  transition:transform .12s,box-shadow .12s;
  overflow:hidden;position:relative;
}
.proj-card:hover{transform:translate(-4px,-5px);box-shadow:10px 11px 0 #92620a;}
.proj-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:3px;
  background:linear-gradient(90deg,#e53935,#ffd700,#16a34a,#1e40af,#e53935);
  background-size:200% 100%;
  animation:shimmer 3s linear infinite;
}

.prog-outer{
  background:#060d24;border:2px solid rgba(255,215,0,0.4);
  height:22px;width:100%;overflow:hidden;
}
.prog-inner{
  height:100%;
  background:linear-gradient(90deg,#ffd700,#ff9800);
  box-shadow:0 0 12px #ffd700;
  position:relative;transition:width 1.5s cubic-bezier(.23,1,.32,1);
}
.prog-inner::after{
  content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent);
  animation:shimmer 2s infinite;
}

.tag{
  font-family:'Press Start 2P',monospace;font-size:6px;
  padding:3px 7px;background:rgba(255,215,0,0.08);
  border:1px solid rgba(255,215,0,0.5);color:#ffd700;
  display:inline-block;margin:2px;
}

.ground-row{
  height:52px;position:relative;overflow:hidden;
  background:repeating-linear-gradient(90deg,#8B4513 0,#8B4513 51px,#6B3310 51px,#6B3310 52px);
  border-top:4px solid #a0522d;border-bottom:4px solid #4a1f09;
}

.q-block{
  width:52px;height:52px;background:#f59e0b;
  border:4px solid #92400e;display:inline-flex;align-items:center;justify-content:center;
  font-family:'Press Start 2P',monospace;font-size:20px;color:#78350f;
  box-shadow:inset 4px 4px 0 rgba(255,255,255,0.3),inset -4px -4px 0 rgba(0,0,0,0.25);
  cursor:pointer;user-select:none;transition:transform .08s;flex-shrink:0;
}
.q-block:hover{transform:translateY(-6px);}
.q-block:active{transform:translateY(3px);}

.nav-link{
  font-family:'Press Start 2P',monospace;font-size:7px;
  color:#ffd700;text-decoration:none;padding:6px 10px;
  transition:background .15s,color .15s;white-space:nowrap;
}
.nav-link:hover{background:rgba(255,215,0,0.12);color:white;}
.nav-link.active{color:white;border-bottom:2px solid #ffd700;}

.section-wrap{max-width:1100px;margin:0 auto;padding:80px 24px;}
.world-label{
  font-family:'Press Start 2P',monospace;font-size:9px;
  color:#555;letter-spacing:3px;margin-bottom:12px;display:block;
}
.section-title{
  font-family:'Press Start 2P',monospace;
  color:#ffd700;line-height:1.6;
}

.exp-card{
  background:rgba(10,18,50,0.8);
  border-left:4px solid #ffd700;
  padding:20px 24px;
  transition:transform .1s,border-color .1s;
}
.exp-card:hover{transform:translateX(6px);border-color:#ff9800;}

.skill-row{display:flex;align-items:center;gap:12px;margin-bottom:18px;}
.skill-icon{font-size:20px;width:32px;text-align:center;flex-shrink:0;}
.skill-name{
  font-family:'Press Start 2P',monospace;font-size:7px;
  color:#e2e8f0;width:120px;flex-shrink:0;line-height:1.6;
}

.contact-icon-btn{
  display:flex;align-items:center;gap:12px;
  font-family:'Press Start 2P',monospace;font-size:8px;
  color:#ffd700;text-decoration:none;
  padding:16px 20px;
  border:2px solid rgba(255,215,0,0.3);
  background:rgba(10,18,50,0.6);
  transition:background .15s,border-color .15s,transform .1s;
}
.contact-icon-btn:hover{background:rgba(255,215,0,0.08);border-color:#ffd700;transform:translateX(6px);}

/* Clouds */
.cloud-wrap{position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;pointer-events:none;}
.cloud{
  position:absolute;
  animation:cloudDrift linear infinite;
}
.cloud-block{
  background:white;
  image-rendering:pixelated;
}

@media(max-width:768px){
  .section-wrap{padding:60px 16px;}
  .skill-name{width:90px;font-size:6px;}
  .hide-mobile{display:none !important;}
  .hero-title{font-size:22px !important;}
}
@media(max-width:480px){
  .hero-title{font-size:16px !important;}
  .section-title{font-size:14px !important;}
}
`;

// ─── STARS BACKGROUND ─────────────────────────────────────────────────────────
function Stars() {
  const stars = useRef(
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      del: Math.random() * 4,
      dur: 1.5 + Math.random() * 2.5,
      sz: Math.random() > 0.75 ? 2 : 1,
    }))
  ).current;

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden", width: "100vw" }}>
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.sz,
            height: s.sz,
            background: "white",
            animation: `starTwinkle ${s.dur}s ease-in-out infinite`,
            animationDelay: `${s.del}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── PIXEL CLOUD ──────────────────────────────────────────────────────────────
function PixelCloud({ top, delay, duration, scale = 1 }) {
  const W = 96 * scale, H = 48 * scale, u = 8 * scale;
  return (
    <div
      className="cloud"
      style={{ top, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
    >
      <div style={{ position: "relative", width: W, height: H }}>
        {/* Base row */}
        <div style={{ position: "absolute", bottom: 0, left: 0, width: W, height: u * 2, background: "white" }} />
        {/* Mid row */}
        <div style={{ position: "absolute", bottom: u * 2, left: u, width: W - u * 2, height: u * 2, background: "white" }} />
        {/* Top bumps */}
        <div style={{ position: "absolute", bottom: u * 4, left: u * 2, width: u * 3, height: u * 2, background: "white" }} />
        <div style={{ position: "absolute", bottom: u * 4, left: u * 6, width: u * 4, height: u * 3, background: "white" }} />
        <div style={{ position: "absolute", bottom: u * 4, left: u * 11, width: u * 2, height: u * 2, background: "white" }} />
      </div>
    </div>
  );
}

// ─── PIXEL CHAR (CSS ART) ─────────────────────────────────────────────────────
function PixelChar({ animate }) {
  const u = 6;
  // Simple 8-bit dev guy
  const rows = [
    { y: 0, cells: [[2, 4], [3, 4], [4, 4], [5, 4]], color: "#000000ff" },       // cap top
    { y: 1, cells: [[1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4]], color: "#000000ff" }, // cap brim
    { y: 2, cells: [[1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4]], color: "#f5cba7" }, // face
    { y: 3, cells: [[2, 4], [3, 4], [4, 4], [5, 4], [6, 4]], color: "#f5cba7" },
    { y: 4, cells: [[1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4]], color: "#3b82f6" }, // shirt
    { y: 5, cells: [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4]], color: "#3b82f6" },
    { y: 6, cells: [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4]], color: "#3b82f6" },
    { y: 7, cells: [[1, 4], [2, 4], [5, 4], [6, 4]], color: "#e63946" }, // pants
    { y: 8, cells: [[0, 4], [1, 4], [2, 4], [5, 4], [6, 4], [7, 4]], color: "#e63946" },
    { y: 9, cells: [[0, 4], [1, 4], [2, 4], [5, 4], [6, 4], [7, 4]], color: "#8B4513" }, // shoes
  ];

  const totalW = 9 * u;
  const totalH = 10 * u;

  return (
    <div
      style={{
        width: totalW,
        height: totalH,
        position: "relative",
        imageRendering: "pixelated",
        animation: animate ? "float 2s ease-in-out infinite" : "none",
        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))",
      }}
    >
      {rows.map(({ y, cells, color }) =>
        cells.map(([x]) => (
          <div
            key={`${x}-${y}`}
            style={{
              position: "absolute",
              left: x * u,
              top: y * u,
              width: u,
              height: u,
              background: color,
            }}
          />
        ))
      )}
    </div>
  );
}

// ─── GROUND DIVIDER ───────────────────────────────────────────────────────────
function GroundDivider({ showBlocks }) {
  const [popped, setPopped] = useState({});
  return (
    <div style={{ position: "relative" }}>
      {showBlocks && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 8,
            padding: "0 24px 0",
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          {["?", "?", "!", "?", "?"].map((ch, i) => (
            <div
              key={i}
              className="q-block"
              onClick={() => setPopped((p) => ({ ...p, [i]: !p[i] }))}
              style={{
                background: popped[i] ? "#4b5563" : undefined,
                color: popped[i] ? "#9ca3af" : undefined,
              }}
            >
              {popped[i] ? "" : ch}
            </div>
          ))}
        </div>
      )}
      <div className="ground-row" />
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ coins }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { href: "#hero", label: "INICIO" },
    { href: "#about", label: "SOBRE MÍ" },
    { href: "#skills", label: "SKILLS" },
    { href: "#experience", label: "EXP" },
    { href: "#projects", label: "PROYECTOS" },
    { href: "#contact", label: "CONTACTO" },
  ];

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          background: scrolled
            ? "rgba(6,9,30,0.97)"
            : "rgba(6,9,30,0.85)",
          borderBottom: "3px solid #ffd700",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
          backdropFilter: "blur(8px)",
        }}
      >
        {/* HUD left */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span
            className="pf glow-text"
            style={{ fontSize: 10, color: "#ffd700", letterSpacing: 1 }}
          >
            JM
          </span>
          <div
            className="pf"
            style={{
              fontSize: 8,
              color: "white",
              background: "rgba(0,0,0,0.4)",
              padding: "4px 8px",
              border: "1px solid rgba(255,215,0,0.3)",
            }}
          >
            <span className="coin-spin">🪙</span>
            {" ×"}
            {String(coins).padStart(2, "0")}
          </div>
        </div>

        {/* Desktop links */}
        <div
          className="hide-mobile"
          style={{ display: "flex", gap: 2, alignItems: "center" }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((o) => !o)}
          style={{
            display: "none",
            background: "none",
            border: "2px solid #ffd700",
            color: "#ffd700",
            padding: "6px 10px",
            cursor: "pointer",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 10,
          }}
          className="pf"
          id="ham-btn"
        >
          {open ? "✕" : "☰"}
        </button>
        <style>{`@media(max-width:768px){#ham-btn{display:block !important;}}`}</style>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: 60,
            left: 0,
            right: 0,
            zIndex: 199,
            background: "rgba(6,9,30,0.97)",
            borderBottom: "3px solid #ffd700",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link"
              onClick={() => setOpen(false)}
              style={{ display: "block", padding: "10px 8px" }}
            >
              ▶ {l.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  const [started, setStarted] = useState(false);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#0f1f5c 0%,#1a2e7e 40%,#243498 70%,#2d3da8 100%)",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        paddingTop: 60,
      }}
    >
      {/* Clouds */}
      <div className="cloud-wrap">
        <PixelCloud top="8%" delay={0} duration={28} scale={1.2} />
        <PixelCloud top="18%" delay={-10} duration={38} scale={0.8} />
        <PixelCloud top="6%" delay={-20} duration={45} scale={1.5} />
      </div>

      {/* Main hero content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 24px 40px",
          position: "relative",
          zIndex: 2,
          textAlign: "center",
        }}
      >
        {/* World label */}
        <div
          className="pf blink"
          style={{ fontSize: 9, color: "#ffd700", letterSpacing: 4, marginBottom: 28 }}
        >
          ★ WORLD 1-1 · START SCREEN ★
        </div>

        {/* Character */}
        <div style={{ marginBottom: 32 }}>
          <PixelChar animate />
        </div>

        {/* Name */}
        <h1
          className="pf hero-title glow-text"
          style={{
            fontSize: 28,
            color: "#ffd700",
            lineHeight: 1.5,
            letterSpacing: 2,
            marginBottom: 20,
            textShadow: "4px 4px 0 rgba(0,0,0,0.6)",
          }}
        >
          JORGE
          <br />
          MARTINEZ
        </h1>

        {/* Subtitle */}
        <div
          className="vt"
          style={{
            fontSize: 28,
            color: "#a5b4fc",
            marginBottom: 12,
            letterSpacing: 2,
          }}
        >
          Computer Engineering Student
        </div>
        <div
          className="vt"
          style={{ fontSize: 22, color: "#7dd3fc", marginBottom: 40, letterSpacing: 1 }}
        >
          Python · Web Dev · AI · Odoo · Asunción, PY
        </div>

        {/* CTA buttons */}
        {!started ? (
          <div
            className="pf blink"
            style={{ fontSize: 10, color: "white", letterSpacing: 3, cursor: "pointer" }}
            onClick={() => {
              setStarted(true);
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            ▶ PRESS START ◀
          </div>
        ) : (
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <a href="#projects" className="mario-btn">
              VER PROYECTOS
            </a>
            <a href="#contact" className="mario-btn mario-btn-green">
              CONTACTAR
            </a>
          </div>
        )}

        {/* Score board HUD */}
        <div
          style={{
            marginTop: 50,
            display: "flex",
            gap: 32,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { label: "EXPERIENCIA", val: "1 Año y contando" },
            { label: "PROYECTOS", val: "4+" },
            { label: "IDIOMAS", val: "4" },
            { label: "NIVEL", val: "EN CURSO" },
          ].map(({ label, val }) => (
            <div
              key={label}
              style={{
                background: "rgba(0,0,0,0.4)",
                border: "2px solid rgba(255,215,0,0.3)",
                padding: "12px 20px",
                textAlign: "center",
              }}
            >
              <div
                className="pf"
                style={{ fontSize: 6, color: "#9ca3af", marginBottom: 6, letterSpacing: 2 }}
              >
                {label}
              </div>
              <div className="pf" style={{ fontSize: 11, color: "#ffd700" }}>
                {val}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pipes decorations */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: "0 5%",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Pipe height={70} />
        <Pipe height={100} />
        <Pipe height={55} />
      </div>
    </section>
  );
}

function Pipe({ height }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          width: 64,
          height: 18,
          background: "#22c55e",
          border: "3px solid #15803d",
          borderBottom: "none",
          boxShadow: "inset 5px 0 0 rgba(255,255,255,0.2),inset -5px 0 0 rgba(0,0,0,0.2)",
        }}
      />
      <div
        style={{
          width: 52,
          height,
          background: "#16a34a",
          border: "3px solid #15803d",
          borderTop: "none",
          boxShadow: "inset 3px 0 0 rgba(255,255,255,0.15),inset -3px 0 0 rgba(0,0,0,0.2)",
        }}
      />
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    
    <section id="about" style={{ background: "#080c1f", position: "relative", zIndex: 1 }}>
      <div className="section-wrap">
        <span className="world-label">WORLD 1-2</span>
        <h2
          className="section-title"
          style={{ fontSize: 20, marginBottom: 48 }}
        >
          SOBRE MÍ
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 32,
          }}
        >
          
          {/* Bio card */}
          <div
            style={{
              background: "rgba(10,18,50,0.8)",
              border: "3px solid #ffd700",
              boxShadow: "6px 6px 0 rgba(0,0,0,0.4)",
              padding: 28,
            }}
          >
              <PhotoCarousel />
            <div
              className="pf"
              style={{
                fontSize: 8,
                color: "#ffd700",
                marginBottom: 20,
                letterSpacing: 2,
                borderBottom: "2px solid rgba(255,215,0,0.2)",
                paddingBottom: 12,
              }}
            >
              ▶ PLAYER PROFILE
            </div>
            <p
              className="vt"
              style={{
                fontSize: 20,
                color: "#c7d2fe",
                lineHeight: 1.7,
                marginBottom: 16,
              }}
            >
              Soy Jorge — estudiante de Ingeniería en Computación con ganas de aprender y crecer.
              Me gusta crear soluciones que tengan impacto real, desde sistemas administrativos
              hasta apps web interactivas.
            </p>
            <p
              className="vt"
              style={{ fontSize: 20, color: "#94a3b8", lineHeight: 1.7 }}
            >
              Actualmente trabajo como Asistente Administrativo Académico en la Universidad
              Autónoma San Sebastián, gestionando registros con Odoo ERP mientras continúo
              estudiando y construyendo proyectos.
            </p>
          </div>

          {/* Stats card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {[
              { icon: "🎓", label: "EDUCACIÓN", val: "Ing. Computación (En curso)\nUni. Autónoma San Sebastián" },
              { icon: "🌍", label: "UBICACIÓN", val: "Asunción, Paraguay" },
              { icon: "🗣️", label: "IDIOMAS", val: "Español (Nativo) · Inglés B1\nFrancés A1 · Portugués Básico" },
              { icon: "⚡", label: "INTERESES", val: "IA · Web Dev · Python\nAdministración · Automatización" },
            ].map(({ icon, label, val }) => (
              <div
                key={label}
                style={{
                  background: "rgba(10,18,50,0.7)",
                  border: "2px solid rgba(255,215,0,0.25)",
                  padding: "14px 18px",
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  transition: "border-color .2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,215,0,0.8)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,215,0,0.25)")
                }
              >
                <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>{icon}</span>
                <div>
                  <div
                    className="pf"
                    style={{ fontSize: 6, color: "#ffd700", marginBottom: 6, letterSpacing: 1 }}
                  >
                    {label}
                  </div>
                  <div
                    className="vt"
                    style={{
                      fontSize: 18,
                      color: "#c7d2fe",
                      lineHeight: 1.5,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {val}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub link */}
        <div style={{ marginTop: 40 }}>
          <a
            href="https://github.com/Jorgemart313"
            target="_blank"
            rel="noopener noreferrer"
            className="mario-btn"
          >
            ▶ VER GITHUB
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────
const SKILLS = [
  {
    category: "FRONTEND",
    color: "#60a5fa",
    items: [
      { name: "HTML / CSS", level: 80, icon: "🌐" },
      { name: "JavaScript", level: 70, icon: "⚡" },
      { name: "React", level: 65, icon: "⚛️" },
    ],
  },
  {
    category: "BACKEND",
    color: "#4ade80",
    items: [
      { name: "Python", level: 80, icon: "🐍" },
      { name: "Node.js", level: 55, icon: "🟢" },
      { name: "MySQL / Oracle", level: 65, icon: "🗃️" },
    ],
  },
  {
    category: "HERRAMIENTAS",
    color: "#f59e0b",
    items: [
      { name: "Odoo ERP", level: 75, icon: "🏢" },
      { name: "Git / GitHub", level: 70, icon: "🐙" },
      { name: "Google Workspace", level: 85, icon: "📊" },
    ],
  },
  {
    category: "OTROS",
    color: "#c084fc",
    items: [
      { name: "Prompt AI", level: 80, icon: "🤖" },
      { name: "Office (Excel+)", level: 85, icon: "📋" },
      { name: "Soft Skills", level: 90, icon: "🧠" },
    ],
  },
];

function SkillBar({ name, level, icon, color }) {
  const [width, setWidth] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), 150);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div className="skill-row" ref={ref}>
      <span className="skill-icon">{icon}</span>
      <span className="skill-name">{name}</span>
      <div style={{ flex: 1 }}>
        <div className="prog-outer">
          <div
            className="prog-inner"
            style={{
              width: `${width}%`,
              background: `linear-gradient(90deg, ${color}, ${color}88)`,
              boxShadow: `0 0 10px ${color}`,
            }}
          />
        </div>
      </div>
      <span
        className="pf"
        style={{ fontSize: 7, color, width: 36, textAlign: "right", flexShrink: 0 }}
      >
        {level}%
      </span>
    </div>
  );
}

function SkillsSection() {
  return (
    <section id="skills" style={{ background: "#06091a", position: "relative", zIndex: 1 }}>
      <div className="section-wrap">
        <span className="world-label">WORLD 2-1</span>
        <h2 className="section-title" style={{ fontSize: 20, marginBottom: 48 }}>
          HABILIDADES
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 32,
          }}
        >
          {SKILLS.map(({ category, color, items }) => (
            <div
              key={category}
              style={{
                background: "rgba(10,18,50,0.7)",
                border: `2px solid ${color}44`,
                padding: "24px",
                transition: "border-color .2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = color)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = `${color}44`)
              }
            >
              <div
                className="pf"
                style={{
                  fontSize: 7,
                  color,
                  letterSpacing: 2,
                  marginBottom: 20,
                  paddingBottom: 10,
                  borderBottom: `2px solid ${color}33`,
                }}
              >
                ▌ {category}
              </div>
              {items.map((item) => (
                <SkillBar key={item.name} {...item} color={color} />
              ))}
            </div>
          ))}
        </div>

        {/* Certifications strip */}
        <div style={{ marginTop: 48 }}>
          <CertCarousel />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[
              "Python Data Science & ML – Udemy",
              "Advanced Python – Udemy",
              "Web Dev (HTML/CSS/JS/React) – Udemy",
              "Database Management – Udemy",
              "Google AI Summit for Education",
              "Robotics Competition 2023",
              "ESOL B1 – Anglia",
            ].map((cert) => (
              <div
                key={cert}
                style={{
                  background: "rgba(255,215,0,0.05)",
                  border: "1px solid rgba(255,215,0,0.3)",
                  padding: "8px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ color: "#ffd700", fontSize: 12 }}>🏅</span>
                <span
                  className="vt"
                  style={{ fontSize: 16, color: "#c7d2fe" }}
                >
                  {cert}
                </span>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
const EXPERIENCE = [
  {
    company: "Uni. Autónoma San Sebastián",
    role: "Asistente Administrativo Académico",
    period: "2025 – PRESENTE",
    icon: "🎓",
    color: "#ffd700",
    desc: "Gestión de registros académicos y calificaciones con Odoo ERP. Soporte operativo a docentes y estudiantes. Asistencia a autoridades académicas en coordinación y tareas administrativas.",
    tags: ["Odoo ERP", "Admin", "Excel"],
  },
  {
    company: "Banco Central del Paraguay",
    role: "Pasante Administrativo",
    period: "2019 – 2020",
    icon: "🏦",
    color: "#60a5fa",
    desc: "Soporte en gestión documental y procesos administrativos internos. Elaboración de reportes con Excel, Word y PowerPoint en uno de los organismos más importantes del país.",
    tags: ["Excel", "Word", "PowerPoint"],
  },
  {
    company: "Repastore",
    role: "Atención al Cliente & Ventas Online",
    period: "2020 – 2021",
    icon: "🛒",
    color: "#4ade80",
    desc: "Gestión de comunicación con clientes, pedidos y seguimiento post-venta. Manejo de canales de ventas presenciales y digitales.",
    tags: ["Ventas", "Ecommerce", "Comunicación"],
  },
];

function ExperienceSection() {
  return (
    <section id="experience" style={{ background: "#080c1f", position: "relative", zIndex: 1 }}>
      <div className="section-wrap">
        <span className="world-label">WORLD 2-2</span>
        <h2 className="section-title" style={{ fontSize: 20, marginBottom: 48 }}>
          EXPERIENCIA
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {EXPERIENCE.map(({ company, role, period, icon, color, desc, tags }, i) => (
            <div key={company} style={{ display: "flex", gap: 0 }}>
              {/* Timeline */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 40,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    background: color,
                    border: `3px solid ${color}88`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>
                {i < EXPERIENCE.length - 1 && (
                  <div
                    style={{
                      width: 3,
                      flexGrow: 1,
                      background: `linear-gradient(${color}, ${EXPERIENCE[i + 1].color})`,
                      minHeight: 40,
                      margin: "4px 0",
                    }}
                  />
                )}
              </div>

              {/* Card */}
              <div
                className="exp-card"
                style={{
                  flex: 1,
                  marginLeft: 20,
                  marginBottom: i < EXPERIENCE.length - 1 ? 24 : 0,
                  borderLeftColor: color,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <div>
                    <div
                      className="pf"
                      style={{ fontSize: 8, color, marginBottom: 6, letterSpacing: 1 }}
                    >
                      {role}
                    </div>
                    <div
                      className="vt"
                      style={{ fontSize: 20, color: "#e2e8f0", fontWeight: "bold" }}
                    >
                      {company}
                    </div>
                  </div>
                  <div
                    className="pf"
                    style={{
                      fontSize: 7,
                      color: "#64748b",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      padding: "4px 8px",
                      alignSelf: "flex-start",
                    }}
                  >
                    {period}
                  </div>
                </div>
                <p
                  className="vt"
                  style={{
                    fontSize: 18,
                    color: "#94a3b8",
                    lineHeight: 1.6,
                    marginBottom: 14,
                  }}
                >
                  {desc}
                </p>
                <div>
                  {tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    name: "Calculadora\nBinaria Web",
    desc: "Calculadora web que realiza operaciones en sistema binario. Hecha con HTML, CSS y JavaScript puro.",
    tags: ["HTML", "CSS", "JavaScript"],
    icon: "🔢",
    color: "#f59e0b",
    github: "https://github.com/Jorgemart313/Calculadora-Binaria-Web",
    live: "https://calculadorabinariaweb.netlify.app/",
  },
  {
    name: "Kampa\nTorneos Uni",
    desc: "App web para gestión de torneos universitarios con dashboard, foro y sistema de torneos. Proyecto grupal universitario.",
    tags: ["HTML", "CSS", "JavaScript"],
    icon: "🏆",
    color: "#4ade80",
    github: "https://github.com/Jorgemart313/Kampa---Aplicacion-de-gestion-de-Torneos-Universitarios",
    live: "https://kampa-torneos.netlify.app/",
  },
  {
    name: "Python\nScripts & Utils",
    desc: "Repositorio de ejercicios, scripts y proyectos en Python — desde fundamentos hasta aplicaciones de data science.",
    tags: ["Python", "Data Science", "ML"],
    icon: "🐍",
    color: "#60a5fa",
    github: "https://github.com/Jorgemart313/Python",
    live: null,
  },
  {
    name: "Juego de\nAdivinanzas",
    desc: "Juego interactivo de adivinanzas desarrollado con React. UI dinámica y gestión de estado con hooks.",
    tags: ["React", "JavaScript", "Hooks"],
    icon: "🎮",
    color: "#c084fc",
    github: "https://github.com/Jorgemart313/juego-adivinanzas-react",
    live: null,
  },
];

function ProjectsSection() {
  return (
    <section id="projects" style={{ background: "#06091a", position: "relative", zIndex: 1 }}>
      <div className="section-wrap">
        <span className="world-label">WORLD 3-1</span>
        <h2 className="section-title" style={{ fontSize: 20, marginBottom: 48 }}>
          PROYECTOS
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {PROJECTS.map(({ name, desc, tags, icon, color, github, live }) => (
            <div key={name} className="proj-card">
              {/* Card header */}
              <div
                style={{
                  background: `${color}18`,
                  borderBottom: `2px solid ${color}44`,
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: `${color}22`,
                    border: `2px solid ${color}55`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>
                <h3
                  className="pf"
                  style={{
                    fontSize: 9,
                    color,
                    lineHeight: 1.7,
                    whiteSpace: "pre-line",
                    flex: 1,
                  }}
                >
                  {name}
                </h3>
              </div>

              {/* Card body */}
              <div style={{ padding: "20px 24px" }}>
                <p
                  className="vt"
                  style={{
                    fontSize: 18,
                    color: "#94a3b8",
                    lineHeight: 1.6,
                    marginBottom: 16,
                  }}
                >
                  {desc}
                </p>

                {/* Tags */}
                <div style={{ marginBottom: 20 }}>
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="tag"
                      style={{ borderColor: `${color}55`, color }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mario-btn"
                    style={{ fontSize: 7 }}
                  >
                    ▶ GITHUB
                  </a>
                  {live && (
                    <a
                      href={live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mario-btn mario-btn-green"
                      style={{ fontSize: 7 }}
                    >
                      🌐 DEMO LIVE
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("jorgemart3130@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" style={{ background: "#080c1f", position: "relative", zIndex: 1 }}>
      <div className="section-wrap">
        <span className="world-label">WORLD 4-1</span>
        <h2 className="section-title" style={{ fontSize: 20, marginBottom: 16 }}>
          CONTACTO
        </h2>
        <p
          className="vt"
          style={{
            fontSize: 22,
            color: "#94a3b8",
            marginBottom: 48,
            lineHeight: 1.6,
            maxWidth: 600,
          }}
        >
          ¿Tienes un proyecto en mente o quieres contactarme? ¡Escríbeme! Estoy
          disponible para oportunidades de trabajo, colaboración o simplemente para
          hablar de tecnología. 🚀
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
            maxWidth: 700,
          }}
        >
          <a
            href="mailto:jorgemart3130@gmail.com"
            className="contact-icon-btn"
          >
            <span style={{ fontSize: 24 }}>📧</span>
            <div>
              <div
                className="pf"
                style={{ fontSize: 6, color: "#64748b", marginBottom: 4, letterSpacing: 1 }}
              >
                EMAIL
              </div>
              jorgemart3130@gmail.com
            </div>
          </a>

          <a
            href="https://github.com/Jorgemart313"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-icon-btn"
          >
            <span style={{ fontSize: 24 }}>🐙</span>
            <div>
              <div
                className="pf"
                style={{ fontSize: 6, color: "#64748b", marginBottom: 4, letterSpacing: 1 }}
              >
                GITHUB
              </div>
              github.com/Jorgemart313
            </div>
          </a>

          <a
            href="tel:+595984573854"
            className="contact-icon-btn"
          >
            <span style={{ fontSize: 24 }}>📱</span>
            <div>
              <div
                className="pf"
                style={{ fontSize: 6, color: "#64748b", marginBottom: 4, letterSpacing: 1 }}
              >
                TELÉFONO
              </div>
              +595 984 573 854
            </div>
          </a>

          <div
            className="contact-icon-btn"
            style={{ cursor: "pointer" }}
            onClick={copyEmail}
          >
            <span style={{ fontSize: 24 }}>{copied ? "✅" : "📋"}</span>
            <div>
              <div
                className="pf"
                style={{ fontSize: 6, color: "#64748b", marginBottom: 4, letterSpacing: 1 }}
              >
                COPIAR EMAIL
              </div>
              {copied ? "¡Copiado!" : "Click para copiar"}
            </div>
          </div>
        </div>

        {/* Big CTA */}
        <div style={{ marginTop: 48 }}>
          <a
            href="https://wa.me/+595984573854"
            className="mario-btn mario-btn-yellow"
            style={{ fontSize: 10 }}
          >
            ★ MI WHATSAPP ★
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        background: "#04060f",
        borderTop: "3px solid #ffd700",
        padding: "28px 24px",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 12, flexWrap: "wrap" }}>
        {["INICIO", "SKILLS", "PROYECTOS", "CONTACTO"].map((l, i) => (
          <a
            key={l}
            href={`#${["hero", "skills", "projects", "contact"][i]}`}
            className="nav-link"
            style={{ fontSize: 7 }}
          >
            {l}
          </a>
        ))}
      </div>
      <p
        className="pf"
        style={{ fontSize: 7, color: "#2d3748", letterSpacing: 2, lineHeight: 2 }}
      >
        © 2025 JORGE MARTINEZ · ASUNCIÓN, PARAGUAY
        <br />
        MADE WITH ❤️ & LOTS OF ☕
      </p>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    const handle = () => {
      const pct =
        window.scrollY /
        Math.max(document.body.scrollHeight - window.innerHeight, 1);
      setCoins(Math.min(99, Math.floor(pct * 100)));
    };
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <Stars />
      <Navbar coins={coins} />

      <HeroSection />
      <GroundDivider showBlocks />

      <AboutSection />
      <GroundDivider />

      <SkillsSection />
      <GroundDivider showBlocks />

      <ExperienceSection />
      <GroundDivider />

      <ProjectsSection />
      <GroundDivider showBlocks />

      <ContactSection />
      <Footer />
    </>
  );
}
