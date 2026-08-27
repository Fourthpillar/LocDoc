import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Icon from "../Icon.jsx";
import { heroScenes } from "../../data/heroScenes.js";
import "./Hero.css";

const searchModes = [
  { key: "doctors", label: "Doctors", icon: "stethoscope", path: "/doctors", placeholder: "Search doctors, specialties or clinics" },
  { key: "medicines", label: "Medicines", icon: "storefront", path: "/medicines", placeholder: "Search medicines or pharmacies" },
  { key: "labs", label: "Lab tests", icon: "flask", path: "/lab-tests", placeholder: "Search tests or labs" },
];

const trustChips = [
  { icon: "shield-check", label: "NMC verified" },
  { icon: "badge-check", label: "ABDM linked" },
  { icon: "clock", label: "Live tracking" },
  { icon: "heart-pulse", label: "12+ cities" },
];

const TRANSITION_MS = 650;
const HOLD_MS = 4200;

function Card({ scene }) {
  return (
    <>
      <div className="mock__topbar">
        <span className="mock__title">{scene.label}</span>
        <span className="mock__live"><span className="mock__pulse" /> Live</span>
      </div>

      <div className="mock__doc">
        <span className="mock__avatar">
          {scene.avatarIcon ? <Icon name={scene.avatarIcon} size={20} /> : scene.avatarText}
        </span>
        <div>
          <strong>{scene.name}</strong>
          <span>{scene.sub}</span>
        </div>
        <span className="mock__badge"><Icon name="badge-check" size={12} filled /> Verified</span>
      </div>

      <div className="mock__status">
        <div>
          <p className="mock__status-title">{scene.statusTitle}</p>
          <p className="mock__status-sub">{scene.statusSub}</p>
        </div>
        <span className="mock__eta">ETA<br /><em>12 min</em></span>
      </div>

      <div className="mock__timeline">
        {scene.timeline.map((step) => (
          <div className={`mock__step ${step.active ? "is-active" : ""}`} key={step.label}>
            <span className={`mock__step-dot ${step.done ? "is-done" : ""}`} />
            <div>
              <p>{step.label}</p>
              <time>{step.t}</time>
            </div>
          </div>
        ))}
      </div>

      <div className="mock__actions">
        <button type="button" className="mock__btn mock__btn--primary">{scene.actions[0]}</button>
        <button type="button" className="mock__btn">{scene.actions[1]}</button>
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
    <section className="hero-fresh">
      <div className="container hero-fresh__grid">
        <div className="hero-fresh__copy reveal is-visible">
          <div className="eyebrow">
            <span className="dot" />
            Trusted local healthcare · Live doctor tracking
          </div>

          <h1 className="h1 hero-fresh__title">
            Healthcare that <em>shows up</em>
            <br />
            on time. Every time.
          </h1>

          <p className="lede hero-fresh__lede">
            Book verified doctors near you, see nearby medicine stock in real time, and
            compare lab tests — all in one calm, honest place.
          </p>

          {/* Search card */}
          <div className="hero-fresh__search">
            <div className="hero-fresh__tabs">
              {searchModes.map((m) => (
                <button
                  key={m.key}
                  type="button"
                  className={`hero-fresh__tab ${mode.key === m.key ? "is-active" : ""}`}
                  onClick={() => setMode(m)}
                >
                  <Icon name={m.icon} size={16} />
                  {m.label}
                </button>
              ))}
            </div>
            <form className="hero-fresh__search-row" onSubmit={handleSearch}>
              <span className="hero-fresh__search-icon">
                <Icon name="search" size={18} />
              </span>
              <input
                className="hero-fresh__search-input"
                placeholder={mode.placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <span className="hero-fresh__loc">
                <Icon name="map-pin" size={15} /> Hyderabad
              </span>
              <button className="hero-fresh__search-btn" type="submit">
                <Icon name="search" size={16} />
                <span>Search</span>
              </button>
            </form>
          </div>

          {/* CTAs */}
          <div className="hero-fresh__ctas">
            <button className="btn btn-primary" type="button" onClick={() => navigate("/doctors")}>
              Find a doctor & book
              <Icon name="arrow-right" size={16} />
            </button>
            <button className="btn btn-ghost" type="button" onClick={() => navigate("/login?role=patient&intent=signup")}>
              Create your account
            </button>
          </div>

          {/* Trust chips */}
          <div className="hero-fresh__chips">
            {trustChips.map((c) => (
              <span className="hero-fresh__chip" key={c.label}>
                <Icon name={c.icon} size={14} /> {c.label}
              </span>
            ))}
          </div>

          <Link to="/#register" className="hero-fresh__supply">
            Run a hospital, pharmacy or lab? <strong>List your facility</strong>
            <Icon name="arrow-right" size={14} />
          </Link>
        </div>

        <div
          className="hero-fresh__visual reveal is-visible"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="hero-fresh__blob" aria-hidden="true" />

          <div className="mock-stage">
            <div className="mock-window">
              <div className={`mock ${transitioning ? "is-out" : ""}`}>
                <Card scene={current} />
              </div>
              {incoming && (
                <div className="mock mock--incoming is-in">
                  <Card scene={incoming} />
                </div>
              )}
            </div>

            {/* Floating badges — sit outside the card, never over its content */}
            <div className="hero-fresh__float hero-fresh__float--top">
              <span className="hero-fresh__float-icon"><Icon name="bell" size={14} /></span>
              <div>
                <strong>SMS alert sent</strong>
                <span>Delay notified in 41s</span>
              </div>
            </div>
            <div className="hero-fresh__float hero-fresh__float--bottom">
              <span className="hero-fresh__float-icon hero-fresh__float-icon--star">
                <Icon name="star" size={14} filled />
              </span>
              <div>
                <strong>4.9 average</strong>
                <span>Punctuality rating</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
