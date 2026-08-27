import { useEffect, useRef, useState } from "react";
import Icon from "../Icon.jsx";
import "./TrustMetrics.css";

const metrics = [
  {
    icon: "activity",
    label: "Appointments tracked",
    value: 12847,
    suffix: "",
    hint: "this week · live",
    accent: "primary",
  },
  {
    icon: "map-pin",
    label: "Cities live",
    value: 12,
    suffix: "",
    hint: "and growing every quarter",
    accent: "accent",
  },
  {
    icon: "badge-check",
    label: "Verified doctors",
    value: 2340,
    suffix: "+",
    hint: "NMC · ABDM matched",
    accent: "primary",
  },
  {
    icon: "clock",
    label: "On-time rate",
    value: 94.2,
    suffix: "%",
    hint: "avg. across facilities",
    accent: "accent",
  },
];

/* Simple count-up when band enters viewport */
function useCountUp(target, active, duration = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return undefined;
    const start = performance.now();
    const from = 0;
    let raf;
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(from + (target - from) * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return n;
}

function formatValue(n, target) {
  if (Number.isInteger(target)) return Math.round(n).toLocaleString("en-IN");
  return n.toFixed(1);
}

function Metric({ m, active }) {
  const n = useCountUp(m.value, active);
  return (
    <div className={`trust__cell trust__cell--${m.accent}`}>
      <span className="trust__icon">
        <Icon name={m.icon} size={18} />
      </span>
      <div className="trust__body">
        <div className="trust__value">
          {formatValue(n, m.value)}
          <span className="trust__suffix">{m.suffix}</span>
        </div>
        <div className="trust__label">{m.label}</div>
        <div className="trust__hint">{m.hint}</div>
      </div>
    </div>
  );
}

export default function TrustMetrics() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="trust section--tight" ref={ref} aria-label="LocDoc live metrics">
      <div className="container">
        <div className="trust__band">
          <div className="trust__caption">
            <span className="trust__caption-pulse" />
            Live from the LocDoc network
          </div>
          <div className="trust__grid">
            {metrics.map((m) => (
              <Metric key={m.label} m={m} active={visible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
