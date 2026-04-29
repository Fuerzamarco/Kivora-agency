/* global React, ReactDOM, HeroChat, UseCaseTabs, FAQ */

// ===== DEFAULTS =====
const DEFAULTS = {
  accent1: "#3b5bff",
  accent2: "#6e3bff",
  headlineVariant: "perdido",
  heroLayout: "split",
  density: "comfy"
};

function hexToRgba(hex, a) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

function applyTweaks(t) {
  document.documentElement.style.setProperty("--accent-1", t.accent1);
  document.documentElement.style.setProperty("--accent-2", t.accent2);
  document.documentElement.style.setProperty(
    "--accent-grad",
    `linear-gradient(135deg, ${t.accent1} 0%, ${t.accent2} 100%)`
  );
  document.documentElement.style.setProperty(
    "--accent-soft",
    hexToRgba(t.accent2, 0.08)
  );
  document.body.dataset.density = t.density;

  // Headline variant
  const h = document.getElementById("hero-headline");
  if (h) {
    const variants = {
      "247": 'Tu negocio puede <span class="accent">funcionar solo 24/7</span>.<br/>Nosotros lo automatizamos con IA.',
      voice: 'Una IA atiende tus llamadas <span class="accent">como una persona</span>.<br/>Tú solo cobras los clientes.',
      perdido: 'Cada llamada que <span class="accent">no contestas</span><br/>es un cliente que se va a la competencia.',
      delegate: 'Deja de gestionar mensajes.<br/><span class="accent">Empieza a cerrar ventas.</span>',
    };
    h.innerHTML = variants[t.headlineVariant] || variants["247"];
  }

  // Hero layout
  const hero = document.querySelector(".hero");
  if (hero) hero.dataset.layout = t.heroLayout;
}

// Apply defaults immediately
applyTweaks(DEFAULTS);

// Mount React islands
ReactDOM.createRoot(document.getElementById("hero-chat-mount")).render(<HeroChat />);
ReactDOM.createRoot(document.getElementById("usecase-mount")).render(<UseCaseTabs />);
ReactDOM.createRoot(document.getElementById("faq-mount")).render(<FAQ />);
