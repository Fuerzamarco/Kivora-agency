/* global React, ReactDOM */
const { useState, useEffect, useRef } = React;

// ===== HERO WHATSAPP ANIMATION =====
const HERO_SCRIPT = [
  { side: "in", text: "Hola, ¿siguen abiertos? Necesito una cita urgente para mi coche", time: "23:42", delay: 1000 },
  { typing: true, delay: 1100 },
  { side: "out", text: "¡Hola Carlos! 👋 Sí, abrimos mañana a las 9. Te paso huecos disponibles 👇", time: "23:42", delay: 1300, ai: true },
  { side: "out", text: "🕘 9:00\n🕚 11:30\n🕒 15:00", time: "23:42", delay: 800, ai: true },
  { side: "in", text: "Perfecto, las 11:30 👌", time: "23:43", delay: 1400 },
  { typing: true, delay: 900 },
  { side: "out", text: "Listo ✅ Cita confirmada mañana 11:30 con Don Memo. Te recuerdo 1h antes.", time: "23:43", delay: 1200, ai: true },
];

function HeroChat() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let cancelled = false;
    let i = 0;
    let acc = [];

    async function tick() {
      while (!cancelled && i < HERO_SCRIPT.length) {
        const step = HERO_SCRIPT[i];
        await new Promise((r) => setTimeout(r, step.delay || 1000));
        if (cancelled) return;
        if (step.typing) {
          acc = [...acc, { typing: true, key: `t-${i}` }];
        } else {
          acc = acc.filter((x) => !x.typing);
          acc = [...acc, { ...step, key: `m-${i}` }];
        }
        setItems([...acc]);
        i++;
      }
      await new Promise((r) => setTimeout(r, 4500));
      if (cancelled) return;
      // Smooth reset: fade messages out before clearing
      acc = acc.map(x => ({ ...x, fading: true }));
      setItems([...acc]);
      await new Promise((r) => setTimeout(r, 600));
      if (cancelled) return;
      acc = [];
      setItems([]);
      i = 0;
      await new Promise((r) => setTimeout(r, 400));
      if (cancelled) return;
      tick();
    }
    tick();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="wa-frame">
      <div className="wa-screen">
        <div className="wa-ai-badge">
          <span className="pulse"></span>
          <span>IA · KIVORA</span>
        </div>
        <div className="wa-header">
          <div className="wa-avatar">TM</div>
          <div>
            <div className="wa-name">Taller Mendoza</div>
            <div className="wa-status">
              <span className="typing">en línea · responde al instante</span>
            </div>
          </div>
        </div>
        <div className="wa-body">
          {items.map((it) => it.typing ? (
            <div key={it.key} className="wa-typing"><span></span><span></span><span></span></div>
          ) : (
            <div key={it.key} className={`wa-bubble ${it.side} ${it.fading ? "fading" : ""}`}>
              <div className="wa-text">
                {it.text.split("\n").map((l, k) => <div key={k}>{l}</div>)}
              </div>
              <span className="wa-time">{it.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== USE CASES TABS =====
const USE_CASES = {
  taller: {
    label: "Talleres mecánicos",
    icon: "🔧",
    title: "Bot para talleres mecánicos",
    desc: "Agenda servicios, cotiza piezas y envía recordatorios sin que el dueño tenga que vivir pegado al móvil.",
    bullets: [
      "Calendario de citas integrado con horarios reales",
      "Cotizaciones automáticas de servicios comunes",
      "Recordatorios 24h antes — reduce ausencias",
      "Filtra urgencias vs consultas generales",
    ],
    metric: { v: "−68%", l: "ausencias en talleres piloto" },
    chat: [
      { side: "in", text: "¿Cuánto cuesta un cambio de aceite?", time: "10:14" },
      { side: "out", text: "Para tu modelo: 89€ con filtro y aceite sintético. ¿Te lo agendo?", time: "10:14" },
      { side: "in", text: "Sí, mañana por la tarde 🙌", time: "10:15" },
      { side: "out", text: "Listo ✅ Mañana 16:00 con Don Memo. Te recuerdo 1h antes.", time: "10:15" },
    ],
  },
  restaurante: {
    label: "Restaurantes",
    icon: "🍽️",
    title: "Bot para restaurantes",
    desc: "Reserva mesas, gestiona pedidos a domicilio y responde el menú sin tener a alguien atendiendo el móvil.",
    bullets: [
      "Reservas con confirmación automática",
      "Menú interactivo con precios y disponibilidad",
      "Pedidos a domicilio con pasarela de pago",
      "Lista de espera y cancelaciones inteligentes",
    ],
    metric: { v: "+42%", l: "reservas confirmadas vs llamada" },
    chat: [
      { side: "in", text: "¿Mesa para 4 el sábado a las 21?", time: "18:02" },
      { side: "out", text: "Tengo 20:30 o 21:15. ¿Cuál te va mejor?", time: "18:02" },
      { side: "in", text: "21:15 perfecto", time: "18:03" },
      { side: "out", text: "Reservado ✅ Te mando ubicación y carta 📍", time: "18:03" },
    ],
  },
  clinica: {
    label: "Clínicas y consultorios",
    icon: "🩺",
    title: "Bot para clínicas y consultorios",
    desc: "Agenda consultas, contesta dudas frecuentes y filtra urgencias para que el doctor solo vea lo importante.",
    bullets: [
      "Triaje de síntomas antes de la consulta",
      "Agenda sincronizada con varios doctores",
      "Recordatorios de pago y seguimiento post-consulta",
      "Cumplimiento RGPD y aviso de privacidad",
    ],
    metric: { v: "<5s", l: "tiempo de respuesta promedio" },
    chat: [
      { side: "in", text: "Necesito cita con cardiología", time: "09:21" },
      { side: "out", text: "Dr. Ramírez: martes 10:00 o jueves 16:00. ¿Es primera visita?", time: "09:21" },
      { side: "in", text: "Sí, primera vez", time: "09:22" },
      { side: "out", text: "Te envío formulario rápido y confirmo cita 🩺", time: "09:22" },
    ],
  },
  inmobiliaria: {
    label: "Inmobiliarias",
    icon: "🏡",
    title: "Bot para inmobiliarias",
    desc: "Califica leads 24/7, envía fichas de propiedades y agenda visitas — solo te llegan los prospectos serios.",
    bullets: [
      "Lead scoring automático (presupuesto, urgencia, financiación)",
      "Envío de fichas con fotos, vídeo y ubicación",
      "Agenda de visitas con asesor disponible",
      "Seguimiento automático a 7, 14 y 30 días",
    ],
    metric: { v: "3.2×", l: "leads calificados al mes" },
    chat: [
      { side: "in", text: "Vi el piso de Chamberí, ¿sigue libre?", time: "12:08" },
      { side: "out", text: "¡Sí! 2 hab, 380.000€. ¿Para vivir o inversión? ¿Tienes pre-aprobación?", time: "12:08" },
      { side: "in", text: "Para vivir, sin pre-aprobación aún", time: "12:09" },
      { side: "out", text: "Te conecto con asesora y agendamos visita esta semana 🏡", time: "12:09" },
    ],
  },
};

function UseCaseTabs() {
  const [active, setActive] = useState("taller");
  const data = USE_CASES[active];

  return (
    <div>
      <div className="tabs" role="tablist">
        {Object.entries(USE_CASES).map(([k, uc]) => (
          <button
            key={k}
            className={`tab ${active === k ? "active" : ""}`}
            onClick={() => setActive(k)}
            role="tab"
          >
            <span className="tab-icon">{uc.icon}</span>
            {uc.label}
          </button>
        ))}
      </div>
      <div className="usecase-pane" key={active}>
        <div className="usecase-info">
          <h3>{data.title}</h3>
          <p className="desc">{data.desc}</p>
          <ul className="usecase-list">
            {data.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
          <div className="usecase-metric">
            <span className="v">{data.metric.v}</span>
            <span className="l">{data.metric.l}</span>
          </div>
        </div>
        <div className="uc-chat">
          <div className="uc-chat-head">
            <div className="wa-avatar">{data.icon}</div>
            <div>
              <strong>{data.label.split(" ")[0]} · KIVORA</strong>
              <div className="small">respondiendo en tiempo real</div>
            </div>
          </div>
          <div className="uc-chat-inner">
            {data.chat.map((m, i) => (
              <div key={i} className={`wa-bubble ${m.side}`} style={{ animationDelay: `${i * 0.18}s` }}>
                <div className="wa-text">{m.text}</div>
                <span className="wa-time">{m.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== FAQ =====
const FAQS = [
  { q: "¿La IA por llamada suena realmente como un humano?", a: "Sí. Usamos modelos de voz de última generación con pausas, entonación y respiración natural. En pruebas a ciegas, más del 85% de los clientes no detectan que están hablando con una IA. Si quieres, te enseño en directo durante la llamada de descubrimiento." },
  { q: "¿Cuánto cuesta? ¿Por qué no hay precios en la web?", a: "Cada negocio es distinto. Una clínica con 500 llamadas al mes no necesita lo mismo que un taller con 80. Después de 30 minutos de llamada te paso una propuesta clara con precio cerrado. Sin sorpresas, sin letra pequeña." },
  { q: "¿Necesito conocimientos técnicos?", a: "Cero. Yo me encargo de todo: conectamos tu número, WhatsApp Business, calendario y CRM. Entrenamos la IA con tu información y la activamos. Tú solo apruebas las respuestas y miras los resultados." },
  { q: "¿Y si la IA no sabe qué responder?", a: "Tiene reglas estrictas: no inventa precios, no hace promesas fuera de tu catálogo, no maneja temas sensibles. Si detecta algo fuera de su alcance, deriva al humano automáticamente con todo el contexto." },
  { q: "¿Cuánto tarda en estar funcionando?", a: "7 días. Día 1 llamada de descubrimiento. Días 2–6 configuración, entrenamiento y pruebas. Día 7 activación en vivo. Te acompaño personalmente el primer mes." },
  { q: "¿Hay permanencia?", a: "No. Mensual, cancelas cuando quieras. Si no funciona para tu negocio, te devuelvo el primer mes íntegro. Sin discusión." },
  { q: "¿Puedo probarlo antes de comprometerme?", a: "Sí. La llamada de descubrimiento (30 min) es gratis y sin compromiso. Te enseño la IA funcionando en directo con un caso parecido al tuyo. Si te convence, definimos plan. Si no, te quedas con ideas para tu negocio." },
  { q: "¿Trabajas con negocios fuera de España?", a: "Sí. Aunque estoy en España, doy servicio a PYMEs en LATAM también. La IA puede operar en español neutro, español de España o adaptada a cualquier acento regional." },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list">
      {FAQS.map((f, i) => (
        <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
          <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{f.q}</span>
            <span className="icon">+</span>
          </button>
          <div className="faq-a">{f.a}</div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { HeroChat, UseCaseTabs, FAQ });
