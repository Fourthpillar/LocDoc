import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon.jsx";
import { platformScenes } from "../../data/platformScenes.js";
import "./FacilityPreview.css";

const benefits = [
  { icon: "activity",  title: "Live roster & queue", desc: "See every doctor's real status and today's waitlist at a glance." },
  { icon: "bell",      title: "Ghost-free bookings", desc: "Auto-nudges, confirm-or-release, and SMS delay alerts baked in." },
  { icon: "shield-check", title: "Verified from day one", desc: "Doctor NMC / ABDM match runs before the profile goes live." },
  { icon: "layers",    title: "Adopt on your terms", desc: "Turn on Pharmacy or Labs modules only when you're ready." },
];

const TRANSITION_MS = 650;
const HOLD_MS = 5000;

function DashboardMock({ scene }) {
  return (
    <>
      {/* Window chrome */}
      <div className="fp__chrome">
        <span className="fp__chip"><span /><span /><span /></span>
        <span className="fp__url">
          <Icon name="shield-check" size={12} />
          admin.locdoc.in / dashboard
        </span>
        <span className="fp__chrome-right">
          <span className="fp__chrome-dot" /> Streaming
        </span>
      </div>

      <div className="fp__body">
        {/* Side rail */}
        <aside className="fp__side">
          <div className="fp__brand-mini">
            <span className="fp__brand-mark"><Icon name="map-pin" size={12} strokeWidth={2.2} /></span>
            LocDoc Admin
          </div>
          <div className="fp__facility">
            <span>{scene.facility}</span>
            <em>{scene.location}</em>
          </div>
          <nav className="fp__nav">
            {scene.nav.map((n) => (
              <a key={n.label} className={n.active ? "is-active" : ""}>
                <Icon name={n.icon} size={14} />{n.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <div className="fp__main">
          <div className="fp__topline">
            <div>
              <h4>{scene.topline.title}</h4>
              <p>{scene.topline.sub}</p>
            </div>
            <div className="fp__pill fp__pill--ok">
              <span className="fp__pill-dot" /> {scene.pill}
            </div>
          </div>

          <div className="fp__kpis">
            {scene.kpis.map((kpi) => (
              <div className={`fp__kpi ${kpi.accent ? "fp__kpi--accent" : ""}`} key={kpi.k}>
                <span className="fp__kpi-k">{kpi.k}</span>
                <span className="fp__kpi-v">{kpi.v}</span>
                <span className="fp__kpi-h">{kpi.h}</span>
              </div>
            ))}
          </div>

          <div className="fp__roster">
            <div className="fp__roster-head">
              {scene.rosterHead.map((h) => <span key={h}>{h}</span>)}
            </div>
            {scene.roster.map((r) => (
              <div className="fp__roster-row" key={r.init + r.name}>
                <div className="fp__doc">
                  <span className="fp__avatar">{r.init}</span>
                  <div>
                    <strong>{r.name}</strong>
                    <em>{r.spec}</em>
                  </div>
                </div>
                <span className={`fp__status fp__status--${r.status}`}>
                  <span className="fp__status-dot" /> {scene.statusLabel[r.status]}
                </span>
                <span className="fp__slot">{r.slot}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default function FacilityPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || nextIndex !== null) return undefined;
    const t = setTimeout(() => setNextIndex((currentIndex + 1) % platformScenes.length), HOLD_MS);
    return () => clearTimeout(t);
  }, [paused, currentIndex, nextIndex]);

  useEffect(() => {
    if (nextIndex === null) return undefined;
    const t = setTimeout(() => {
      setCurrentIndex(nextIndex);
      setNextIndex(null);
    }, TRANSITION_MS);
    return () => clearTimeout(t);
  }, [nextIndex]);

  const transitioning = nextIndex !== null;
  const current = platformScenes[currentIndex];
  const incoming = transitioning ? platformScenes[nextIndex] : null;

  return (
    <section className="fp section">
      <div className="container fp__grid">
        {/* Left: pitch */}
        <div className="fp__copy reveal">
          <div className="eyebrow">
            <span className="dot" />
            For hospitals · clinics · pharmacies · labs
          </div>
          <h2 className="h2">See exactly what you get before you sign a thing.</h2>
          <p className="lede mt-16">
            A lightweight preview of the Platform Admin console — live roster, queue,
            verified badges and the ghosting-prevention engine your team gets from day one.
          </p>

          <ul className="fp__benefits">
            {benefits.map((b) => (
              <li key={b.title}>
                <span className="fp__benefit-icon"><Icon name={b.icon} size={16} /></span>
                <div>
                  <strong>{b.title}</strong>
                  <span>{b.desc}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="fp__ctas">
            <Link to="/register/hospital" className="btn btn-primary">
              Book a walkthrough
              <Icon name="arrow-right" size={16} />
            </Link>
            <Link to="/about#how-it-works" className="btn btn-ghost">See how it works</Link>
          </div>
        </div>

        {/* Right: dashboard mock, rotating through hospital / pharmacy / labs */}
        <div
          className="fp__stage reveal"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="fp__window">
            <div className={`fp__mock ${transitioning ? "is-out" : ""}`}>
              <DashboardMock scene={current} />
            </div>
            {incoming && (
              <div className="fp__mock fp__mock--incoming is-in">
                <DashboardMock scene={incoming} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
