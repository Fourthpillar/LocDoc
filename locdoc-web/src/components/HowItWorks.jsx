import { useEffect, useRef, useState } from "react";
import Icon from "./Icon.jsx";
import "./HowItWorks.css";

const steps = [
  {
    icon: "search",
    title: "Search & book",
    desc: "Find doctors by specialty, clinic or location, and book a slot in a few taps — no login wall to browse.",
  },
  {
    icon: "radar",
    title: "See real status",
    desc: "Your appointment screen shows live doctor status, not a static time — Available, In Transit, In Rounds.",
  },
  {
    icon: "bell",
    title: "Confirm or reschedule",
    desc: "Get a nudge at T-24h and T-2h. If your doctor runs late, you get options — not silence.",
  },
  {
    icon: "check-circle",
    title: "Walk in with confidence",
    desc: "Show up knowing the wait is real, or shift on your terms. Non-app patients get the same by SMS/WhatsApp.",
  },
];

const CYCLE_MS = 2400;

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  // start the cycle only once the section is on-screen (so it feels alive when read)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return undefined;
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [visible]);

  const progress = ((active + 0.5) / steps.length) * 100;

  return (
    <section className="how section section--tight" id="how-it-works" ref={sectionRef}>
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">
            <span className="dot" />
            How it works
          </div>
          <h2 className="h2">From search to seen — without the guesswork.</h2>
        </div>

        {/* Animated flow diagram */}
        <div className="how-flow reveal" role="list">
          <div className="how-flow__rail" aria-hidden="true">
            <div className="how-flow__rail-fill" style={{ width: `${progress}%` }} />
            <span className="how-flow__pulse" style={{ left: `${progress}%` }} />
          </div>

          {steps.map((s, i) => (
            <button
              type="button"
              role="listitem"
              key={s.title}
              className={`how-flow__step ${i === active ? "is-active" : ""} ${i < active ? "is-past" : ""}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className="how-flow__num">{String(i + 1).padStart(2, "0")}</span>
              <span className="how-flow__node">
                <Icon name={s.icon} size={22} />
              </span>
              <h3 className="how-flow__title">{s.title}</h3>
              <p className="how-flow__desc">{s.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
