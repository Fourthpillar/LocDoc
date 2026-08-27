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
const HOLD_MS = 4000;

function Tile({ scene }) {
  return (
    <>
      <div className="phone-mock__notch" />
      <div className="phone-mock__header">
        <p className="phone-mock__label">{scene.label}</p>
        <div className="phone-mock__who">
          <span className="phone-mock__avatar">
            {scene.avatarIcon ? <Icon name={scene.avatarIcon} size={18} /> : scene.avatarText}
          </span>
          <div>
            <strong>{scene.name}</strong>
            <span className="phone-mock__specialty">{scene.sub}</span>
          </div>
        </div>
      </div>

      <div className="phone-mock__status">
        <span className="phone-mock__pulse" />
        <div>
          <p className="phone-mock__status-title">{scene.statusTitle}</p>
          <p className="phone-mock__status-sub">{scene.statusSub}</p>
        </div>
      </div>

      <div className="phone-mock__timeline">
        {scene.timeline.map((step) => (
          <div className={`phone-mock__step ${step.active ? "is-active" : ""}`} key={step.label}>
            <span className={`phone-mock__step-dot ${step.done ? "is-done" : ""}`} />
            <div>
              <p>{step.label}</p>
              <time>{step.t}</time>
            </div>
          </div>
        ))}
      </div>

      <div className="phone-mock__actions">
        <button type="button">{scene.actions[0]}</button>
        <button type="button">{scene.actions[1]}</button>
      </div>
    </>
  );
}

export default function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState(searchModes[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Set only while a transition is in flight — the outgoing and incoming
  // tiles render and animate at the same time, in the same direction.
  const [nextIndex, setNextIndex] = useState(null);
  const [paused, setPaused] = useState(false);

  // Step 1 — after a hold, kick off the next transition.
  useEffect(() => {
    if (paused || nextIndex !== null) return undefined;
    const holdTimer = setTimeout(() => {
      setNextIndex((currentIndex + 1) % heroScenes.length);
    }, HOLD_MS);
    return () => clearTimeout(holdTimer);
  }, [paused, currentIndex, nextIndex]);

  // Step 2 — once the animation has had time to run, commit the swap.
  useEffect(() => {
    if (nextIndex === null) return undefined;
    const endTimer = setTimeout(() => {
      setCurrentIndex(nextIndex);
      setNextIndex(null);
    }, TRANSITION_MS);
    return () => clearTimeout(endTimer);
  }, [nextIndex]);

  function handleSearch(e) {
    e.preventDefault();
    navigate(query ? `${mode.path}?q=${encodeURIComponent(query)}` : mode.path);
  }

  const transitioning = nextIndex !== null;
  const current = heroScenes[currentIndex];
  const incoming = transitioning ? heroScenes[nextIndex] : null;

  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__copy reveal is-visible">
          <div className="eyebrow">
            <span className="dot" />
            Live doctor tracking, built in
          </div>
          <h1 className="h1">
            Healthcare that
            <br />
            <span className="text-gradient">shows up on time.</span>
          </h1>
          <p className="lede mt-16">
            LocDoc is built around one promise: the time you're given is the time that happens.
            Book a doctor with live status tracking, check real medicine stock at nearby
            pharmacies, and compare lab tests — all verified, all in one place.
          </p>

          <div className="hero__search-tabs">
            {searchModes.map((m) => (
              <button
                key={m.key}
                type="button"
                className={`hero__search-tab ${mode.key === m.key ? "is-active" : ""}`}
                onClick={() => setMode(m)}
              >
                {m.label}
              </button>
            ))}
          </div>

          <form className="hero__search" onSubmit={handleSearch}>
            <Icon name="search" size={18} className="hero__search-icon" />
            <input
              className="hero__search-input"
              placeholder={mode.placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="hero__search-divider" />
            <span className="hero__search-loc">
              <Icon name="map-pin" size={16} />
              Hyderabad
            </span>
            <button className="btn btn-primary hero__search-btn" type="submit">
              Search
            </button>
          </form>

          <div className="hero__ctas">
            <button className="btn btn-primary" onClick={() => navigate("/doctors")}>
              Find a doctor & book
              <Icon name="arrow-right" size={16} />
            </button>
            <button className="btn btn-ghost" onClick={() => navigate("/login?role=patient&intent=signup")}>
              Create your account
            </button>
          </div>

          <div className="hero__trust">
            <Icon name="shield-check" size={16} />
            Doctors verified via NMC · ABDM NMR · state medical councils
          </div>

          <Link to="/#register" className="hero__supply-link">
            Run a hospital, pharmacy or lab? List your facility
            <Icon name="arrow-right" size={14} />
          </Link>
        </div>

        <div
          className="hero__visual reveal is-visible"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="hero__glow" aria-hidden="true" />

          <div className="phone-mock-stage">
            <div className={`phone-mock ${transitioning ? "is-tile-out" : ""}`}>
              <Tile scene={current} />
            </div>
            {incoming && (
              <div className="phone-mock phone-mock--incoming is-tile-in">
                <Tile scene={incoming} />
              </div>
            )}
          </div>

          <div className={`floating-card floating-card--top ${!transitioning ? "is-visible" : ""}`}>
            <Icon name={current.floatingTop.icon} size={15} />
            {current.floatingTop.text}
          </div>
          <div className={`floating-card floating-card--bottom ${!transitioning ? "is-visible" : ""}`}>
            <Icon name={current.floatingBottom.icon} size={15} />
            {current.floatingBottom.text}
          </div>
        </div>
      </div>
    </section>
  );
}
