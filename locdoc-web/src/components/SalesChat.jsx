import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Icon from "./Icon.jsx";
import "./SalesChat.css";

/**
 * Lightweight "Ask us anything" widget for facility decision-makers.
 * - Only mounts on facility-flow routes (register/hospital, pharmacy, labs, doctor)
 *   plus the doctor-detail page (also facility-relevant).
 * - Uses a simulated sales agent (Priya) with canned replies matched to intent.
 * - No real network — the widget is a design prop, not a live channel.
 */

const AGENT = {
  name: "Priya Menon",
  role: "Facility partnerships · LocDoc",
  initials: "PM",
  sla: "usually replies in ~5 min",
};

const QUICK_REPLIES = [
  { id: "verify",  label: "How does verification work?" },
  { id: "demo",    label: "Can we book a demo?" },
  { id: "pricing", label: "What does it cost?" },
  { id: "sms",     label: "Do patients need the app?" },
];

const CANNED = {
  verify:
    "For hospitals and pharmacies we cross-check your establishment licence with the state health registry, and for doctors we match NMC + ABDM NMR + your state council. The whole thing usually finishes in under 2 minutes and puts a public 'blue-tick' on your profile.",
  demo:
    "Yes — a 20-minute live walkthrough is on us. Share your city and I'll get you a calendar link with our onboarding lead. No slides, we just log into a real facility's console.",
  pricing:
    "Onboarding is free. We only charge a small fee per confirmed appointment and a flat monthly platform fee that scales with your doctor count. I can email a tailored quote if you tell me facility size.",
  sms:
    "Never. Patients get everything over SMS + WhatsApp — the app is an optional upgrade for regulars. Your front desk keeps its existing workflow, LocDoc just layers live status on top.",
  default:
    "Great question — let me pull up the exact answer. In the meantime, if you drop your work email or phone, our onboarding lead will reach out with the specifics within a few minutes.",
};

const INTRO = [
  {
    from: "agent",
    id: "welcome",
    text: `Hi 👋 I'm ${AGENT.name.split(" ")[0]}. Curious about how LocDoc fits your facility? Ask me anything — verification, pricing, demos, or how patients get updates.`,
  },
];

function matchIntent(text) {
  const t = text.toLowerCase();
  if (/(verify|nmc|abdm|registry|check|licen[cs]e|badge)/.test(t)) return "verify";
  if (/(demo|walkthrough|call|meeting|showcase|tour)/.test(t)) return "demo";
  if (/(cost|price|pricing|charge|fee|plan|billing)/.test(t)) return "pricing";
  if (/(sms|whatsapp|app|patient(s)?|download|install)/.test(t)) return "sms";
  return "default";
}

function useShouldMount() {
  const { pathname } = useLocation();
  return useMemo(() => {
    if (pathname.startsWith("/register/")) return true;
    if (pathname.startsWith("/doctors/") && pathname !== "/doctors/") return true;
    if (pathname === "/#register") return true;
    return false;
  }, [pathname]);
}

export default function SalesChat() {
  const show = useShouldMount();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(INTRO);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [pulse, setPulse] = useState(true); // fresh-visit attention pulse
  const feedRef = useRef(null);

  // Kill the attention pulse once the user opens the widget.
  useEffect(() => {
    if (open) setPulse(false);
  }, [open]);

  // Auto-scroll to the newest message.
  useEffect(() => {
    if (!open || !feedRef.current) return;
    feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, [messages, open, typing]);

  // Escape closes.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function pushUser(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const id = `u-${Date.now()}`;
    setMessages((m) => [...m, { from: "user", id, text: trimmed }]);
    setDraft("");
    setTyping(true);
    const intent = matchIntent(trimmed);
    const delay = 900 + Math.random() * 800;
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { from: "agent", id: `a-${Date.now()}`, text: CANNED[intent] || CANNED.default },
      ]);
      setTyping(false);
    }, delay);
  }

  function onSubmit(e) {
    e.preventDefault();
    pushUser(draft);
  }

  if (!show) return null;

  return (
    <div className={`sc ${open ? "sc--open" : ""}`}>
      {/* Toggle */}
      <button
        type="button"
        className={`sc__toggle ${pulse ? "sc__toggle--pulse" : ""}`}
        aria-expanded={open}
        aria-label={open ? "Close sales chat" : "Open sales chat — ask us anything"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <Icon name="close" size={20} />
        ) : (
          <>
            <span className="sc__toggle-icon">
              <Icon name="sparkle" size={16} />
            </span>
            <span className="sc__toggle-label">Ask us anything</span>
            <span className="sc__toggle-dot" aria-hidden="true" />
          </>
        )}
      </button>

      {/* Panel */}
      <div className="sc__panel" role="dialog" aria-label="LocDoc facility sales chat">
        <header className="sc__head">
          <div className="sc__agent">
            <span className="sc__avatar">{AGENT.initials}</span>
            <div>
              <strong>{AGENT.name}</strong>
              <em>{AGENT.role}</em>
            </div>
          </div>
          <div className="sc__status">
            <span className="sc__status-dot" /> Online · {AGENT.sla}
          </div>
        </header>

        <div className="sc__feed" ref={feedRef}>
          {messages.map((m) => (
            <div key={m.id} className={`sc__msg sc__msg--${m.from}`}>
              {m.from === "agent" && <span className="sc__msg-avatar">{AGENT.initials}</span>}
              <p>{m.text}</p>
            </div>
          ))}
          {typing && (
            <div className="sc__msg sc__msg--agent sc__msg--typing" aria-live="polite">
              <span className="sc__msg-avatar">{AGENT.initials}</span>
              <p>
                <span className="sc__typing"><span /><span /><span /></span>
                {AGENT.name.split(" ")[0]} is typing…
              </p>
            </div>
          )}
        </div>

        {messages.length <= 2 && (
          <div className="sc__quick">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q.id}
                type="button"
                className="sc__quick-chip"
                onClick={() => pushUser(q.label)}
              >
                {q.label}
              </button>
            ))}
          </div>
        )}

        <form className="sc__composer" onSubmit={onSubmit}>
          <input
            className="sc__input"
            placeholder="Type your question…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            aria-label="Message"
          />
          <button className="sc__send" type="submit" disabled={!draft.trim()}>
            <Icon name="arrow-right" size={16} />
          </button>
        </form>

        <footer className="sc__foot">
          Prefer email? <a href="mailto:facilities@locdoc.in">facilities@locdoc.in</a>
        </footer>
      </div>
    </div>
  );
}
