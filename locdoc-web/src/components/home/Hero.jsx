import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Icon from "../Icon.jsx";
import { heroScenes } from "../../data/heroScenes.js";
import "./Hero.css";

const searchModes = [
  { key: "doctors", label: "Doctors", path: "/doctors", placeholder: "Search doctors, specialties or clinics" },
  { key: "medicines", label: "Medicines", path: "/medicines", placeholder: "Search medicines or pharmacies" },
  { key: "labs", label: "Lab tests", path: "/lab-tests", placeholder: "Search tests or labs" },
];

const TRANSITION_MS = 650;
const HOLD_MS = 4200;

const liveStats = [
  { k: "ON-TIME", v: "94.2%", d: "last 7 days" },
  { k: "TRACKED", v: "1,284", d: "appointments today" },
  { k: "VERIFIED", v: "2,340+", d: "doctors" },
  { k: "REACH", v: "12", d: "cities · live" },
];

function LiveTile({ scene }) {
  return (
    <>
      <div className="live-tile__topbar">
        <span className="live-tile__label">{scene.label}</span>
        <span className="live-tile__live">
          <span className="live-tile__pulse" /> LIVE
        </span>
      </div>

      <div className="live-tile__who">
        <span className="live-tile__avatar">
          {scene.avatarIcon ? <Icon name={scene.avatarIcon} size={18} /> : scene.avatarText}
        </span>
        <div>
          <strong>{scene.name}</strong>
          <span className="live-tile__specialty">{scene.sub}</span>
        </div>
      </div>

      <div className="live-tile__status">
        <div className="live-tile__status-title">{scene.statusTitle}</div>
        <div className="live-tile__status-sub">{scene.statusSub}</div>
      </div>

      <div className="live-tile__timeline">
        {scene.timeline.map((step) => (
          <div className={`live-tile__step ${step.active ? "is-active" : ""}`} key={step.label}>
            <span className={`live-tile__dot ${step.done ? "is-done" : ""}`} />
            <div>
              <p>{step.label}</p>
              <time>{step.t}</time>
            </div>
          </div>
        ))}
      </div>

      <div className="live-tile__foot">
        <button type="button" className="live-tile__cta">{scene.actions[0]}</button>
        <button type="button" className="live-tile__cta live-tile__cta--ghost">{scene.actions[1]}</button>
      </div>
    </>
  );
}

export default function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState(searchModes[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || nextIndex !== null) return undefined;
    const t = setTimeout(() => setNextIndex((currentIndex + 1) % heroScenes.length), HOLD_MS);
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

  function handleSearch(e) {
    e.preventDefault();
    navigate(query ? `${mode.path}?q=${encodeURIComponent(query)}` : mode.path);
  }

  const transitioning = nextIndex !== null;
  const current = heroScenes[currentIndex];
  const incoming = transitioning ? heroScenes[nextIndex] : null;

  return (
    <section className="hero-cinema">
      <div className="hero-cinema__frame container">
        {/* left: statement */}
        <div className="hero-cinema__copy">
          <div className="eyebrow">
            <span className="dot" />
            v1 · HEALTHCARE OPS LAYER
          </div>

          <h1 className="h1 hero-cinema__title">
            The time you're given
            <br />
            is the time <em>that happens.</em>
          </h1>

          <p className="lede hero-cinema__lede">
            LocDoc is the operating layer for local healthcare — a live tracker for every
            appointment, a verified doctor registry, and one honest place to find medicines
            and lab tests near you.
          </p>

          {/* Command-line style search */}
          <form className="hero-cinema__cmd" onSubmit={handleSearch}>
            <div className="hero-cinema__cmd-tabs">
              {searchModes.map((m) => (
                <button
                  key={m.key}
                  type="button"
                  className={`hero-cinema__cmd-tab ${mode.key === m.key ? "is-active" : ""}`}
                  onClick={() => setMode(m)}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <div className="hero-cinema__cmd-bar">
              <span className="hero-cinema__cmd-prompt">/</span>
              <input
                className="hero-cinema__cmd-input"
                placeholder={mode.placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <span className="hero-cinema__cmd-loc">
                <Icon name="map-pin" size={14} /> Hyderabad
              </span>
              <button className="hero-cinema__cmd-btn" type="submit">
                <span>Search</span>
                <Icon name="arrow-right" size={14} />
              </button>
            </div>
          </form>

          <div className="hero-cinema__ctas">
            <button className="btn btn-accent btn-lg" onClick={() => navigate("/doctors")}>
              Find a doctor & book
              <Icon name="arrow-right" size={16} />
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => navigate("/login?role=patient&intent=signup")}>
              Create account
            </button>
          </div>

          <Link to="/#register" className="hero-cinema__supply">
            <Icon name="storefront" size={14} />
            Run a hospital, pharmacy or lab? Onboard your facility →
          </Link>
        </div>

        {/* right: live console */}
        <div
          className="hero-cinema__console"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="hero-cinema__console-chrome">
            <span className="hero-cinema__chip"><span /><span /><span /></span>
            <span className="hero-cinema__console-title">locdoc / live-ops</span>
            <span className="hero-cinema__console-time">TSMC · NMC · ABDM synced</span>
          </div>

          <div className="hero-cinema__console-body">
            <div className="live-tile-stage">
              <div className={`live-tile ${transitioning ? "is-out" : ""}`}>
                <LiveTile scene={current} />
              </div>
              {incoming && (
                <div className="live-tile live-tile--incoming is-in">
                  <LiveTile scene={incoming} />
                </div>
              )}
            </div>

            <div className="live-side">
              <div className="live-side__card">
                <div className="live-side__k">DOCTOR</div>
                <div className="live-side__v">
                  Verified <br />
                  <span>NMC · ABDM · TSMC</span>
                </div>
              </div>
              <div className="live-side__card live-side__card--accent">
                <div className="live-side__k">PUNCTUALITY</div>
                <div className="live-side__v live-side__v--big">94.2%</div>
                <div className="live-side__spark">
                  <svg viewBox="0 0 120 40" preserveAspectRatio="none">
                    <polyline
                      points="0,30 15,26 30,28 45,20 60,22 75,14 90,16 105,8 120,10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                </div>
              </div>
              <div className="live-side__card">
                <div className="live-side__k">NEXT PATIENT</div>
                <div className="live-side__v">
                  <span className="live-side__eta">ETA 4:42 PM</span>
                  <em>notified via SMS · WhatsApp</em>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-cinema__console-status">
            <span><span className="live-tile__pulse" /> streaming · 1.2k events / min</span>
            <span>vitals ok</span>
          </div>
        </div>
      </div>

      {/* Marquee of live stats */}
      <div className="hero-cinema__marquee" aria-hidden="true">
        <div className="hero-cinema__marquee-track">
          {[...liveStats, ...liveStats, ...liveStats].map((s, i) => (
            <div className="hero-cinema__marquee-item" key={i}>
              <span className="hero-cinema__mk">{s.k}</span>
              <span className="hero-cinema__mv">{s.v}</span>
              <span className="hero-cinema__md">{s.d}</span>
              <span className="hero-cinema__mdot" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
