import { useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import GhostingUSP from "../components/GhostingUSP.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import { team } from "../data/team.js";
import { useReveal } from "../hooks/useReveal.js";
import { useScrollSpy } from "../hooks/useScrollSpy.js";
import "./About.css";

const values = [
  {
    icon: "radar",
    title: "Punctuality is the product",
    desc: "Every other feature exists to support one promise: the time you're given is the time that happens.",
  },
  {
    icon: "shield-check",
    title: "Trust is earned, not claimed",
    desc: "Facilities are verified against government certificates. Doctors are matched against official medical registers.",
  },
  {
    icon: "layers",
    title: "Adoption on your terms",
    desc: "No facility is asked to rip out what already works. Start small, add modules only when they make sense.",
  },
  {
    icon: "users",
    title: "Built for every patient",
    desc: "The full ghosting-prevention experience works over SMS and WhatsApp too — an app is an upgrade, never a requirement.",
  },
];

const goals = [
  "Reduce average patient wait time caused by doctor delay.",
  "Reduce appointment no-show rate through confirm-or-release and waitlist backfill.",
  "Give facilities usable digital operations without forcing them to replace existing software.",
  "Give patients accurate local availability for medicines and diagnostic tests before they travel.",
];

const subNav = [
  { id: "story", label: "Our Story" },
  { id: "usp", label: "The LocDoc Engine" },
  { id: "how-it-works", label: "How It Works" },
  { id: "principles", label: "Principles" },
  { id: "team", label: "Team" },
];

export default function About() {
  useReveal();
  const active = useScrollSpy(subNav.map((s) => s.id));

  useEffect(() => {
    document.title = "About LocDoc";
  }, []);

  return (
    <div className="about">
      <section className="about-hero section section--tight" id="story">
        <div className="container">
          <div className="eyebrow">
            <span className="dot" />
            About LocDoc
          </div>
          <h1 className="h1">
            We're making one broken promise <span className="text-gradient">work again.</span>
          </h1>
          <p className="lede mt-24 about-hero__lede">
            LocDoc is a SaaS platform for local healthcare that makes appointment times
            trustworthy. Around that core, we run facility operations for hospitals and clinics,
            and a discovery marketplace connecting patients to nearby pharmacies and diagnostic
            labs.
          </p>
        </div>
      </section>

      <nav className="about-subnav">
        <div className="container about-subnav__inner">
          {subNav.map((s) => (
            <Link
              key={s.id}
              to={`#${s.id}`}
              className={`about-subnav__link ${active === s.id ? "is-active" : ""}`}
            >
              {s.label}
            </Link>
          ))}
        </div>
      </nav>

      <section className="section section--tight about-problem">
        <div className="container about-problem__grid">
          <div className="reveal">
            <h2 className="h2">The problem, plainly</h2>
            <p className="body-text mt-16">
              Patients wait for hours because doctors run late, are in rounds, or are travelling
              between facilities — with no visibility and no warning. Facilities lose capacity to
              no-shows while other patients are turned away. And smaller clinics, pharmacies and
              labs run on fragmented, paper-based systems, so none of this is even visible
              digitally in the first place.
            </p>
          </div>
          <div className="reveal about-goals card">
            <h3 className="h3">What we're solving for</h3>
            <ul>
              {goals.map((g) => (
                <li key={g}>
                  <Icon name="check" size={15} />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <GhostingUSP />
      <HowItWorks />

      <section className="section values" id="principles">
        <div className="container">
          <div className="section-head reveal">
            <div className="eyebrow">
              <span className="dot" />
              How we operate
            </div>
            <h2 className="h2">The principles behind every screen</h2>
          </div>
          <div className="values__grid reveal">
            {values.map((v) => (
              <div className="values__item card card--hover" key={v.title}>
                <div className="values__icon">
                  <Icon name={v.icon} size={20} />
                </div>
                <h3 className="h3">{v.title}</h3>
                <p className="body-text mt-8">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight team" id="team">
        <div className="container">
          <div className="section-head reveal">
            <div className="eyebrow">
              <span className="dot" />
              The team
            </div>
            <h2 className="h2">Built by a small team that showed up on time</h2>
          </div>
          <div className="team__grid reveal">
            {team.map((m) => (
              <div className="team__card card card--hover" key={m.name}>
                <span className="team__avatar">
                  {m.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <p className="team__name">{m.name}</p>
                <p className="team__role">{m.role}</p>
                <p className="team__blurb">{m.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight about-cta">
        <div className="container about-cta__inner reveal">
          <h2 className="h2">Want to bring LocDoc to your facility?</h2>
          <p className="lede mt-16">
            We're onboarding hospitals, clinics, pharmacies and labs for the pilot right now.
          </p>
          <div className="about-cta__actions mt-24">
            <Link to="/register/hospital" className="btn btn-primary btn-lg">
              List your facility
              <Icon name="arrow-right" size={16} />
            </Link>
            <Link to="/register/doctor" className="btn btn-ghost btn-lg">
              Register as a doctor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
