import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import VerifiedBadge from "../components/VerifiedBadge.jsx";
import OnboardingTracker from "../components/OnboardingTracker.jsx";
import { specialties } from "../data/specialties.js";
import "./RegisterForm.css";
import "./RegisterDoctor.css";

const councils = [
  "Telangana State Medical Council (TSMC)",
  "Andhra Pradesh Medical Council",
  "Karnataka Medical Council",
  "Maharashtra Medical Council",
  "Tamil Nadu Medical Council",
  "Delhi Medical Council",
  "Other state council",
];

export default function RegisterDoctor() {
  const [form, setForm] = useState({
    name: "",
    nmcId: "",
    council: councils[0],
    specialty: specialties[0].name,
    experience: "",
    phone: "",
    email: "",
    agree: false,
  });
  const [verifyState, setVerifyState] = useState("idle"); // idle | checking | verified
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Doctor Registration & Verification — LocDoc";
  }, []);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (field === "nmcId" || field === "name") setVerifyState("idle");
  }

  function runVerification() {
    if (!form.name.trim() || !form.nmcId.trim()) return;
    setVerifyState("checking");
    setTimeout(() => setVerifyState("verified"), 1400);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 900);
  }

  if (submitted) {
    return (
      <div className="register-form section">
        <div className="container register-form__success">
          <div className="register-form__success-icon">
            <Icon name="check-circle" size={32} />
          </div>
          <h1 className="h2">You're in the review queue</h1>
          <p className="lede mt-16">
            Thanks, Dr. {form.name.split(" ")[0] || ""} — we'll finish verifying your registration
            and get your profile live.
          </p>
          <div className="register-form__timeline">
            <OnboardingTracker
              stepDurations={[1200, 3800, 0]}
              steps={[
                {
                  icon: "file-text",
                  title: "Submitted",
                  desc: `Registration ID ${form.regId || "captured"} received with your details.`,
                },
                {
                  icon: "shield-check",
                  title: "Verifying against registries",
                  desc: `Cross-checking NMC · ABDM NMR · ${form.council.split(" (")[0] || "your state council"}.`,
                  doingHint: "Real registry pings usually finish in under 2 minutes…",
                },
                {
                  icon: "badge-check",
                  title: "Verified badge live",
                  desc: "Your public profile will show a check like a blue-tick — visible to every patient at booking.",
                },
              ]}
            />
          </div>
          <p className="body-text mt-24">
            This is a product preview — no backend is connected yet, so no real registry lookup
            was made. This is exactly the flow doctors will follow once verification is live.
          </p>
          <Link to="/" className="btn btn-primary mt-32">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="register-form section">
      <div className="container register-form__grid">
        <aside className="register-form__aside">
          <div className="eyebrow">
            <span className="dot" />
            Doctor registration
          </div>
          <h1 className="h2">Get your verified badge</h1>
          <p className="lede mt-16">
            Register with your NMC ID and we cross-check it against the Indian Medical Register,
            the ABDM National Medical Register, and your state council — the same way it'll work
            in production.
          </p>

          <div className="register-form__aside-steps">
            <div>
              <Icon name="file-text" size={16} /> Enter your NMC / registration ID
            </div>
            <div>
              <Icon name="shield-check" size={16} /> We match it against official registries
            </div>
            <div>
              <Icon name="badge-check" size={16} /> Your profile shows a verified badge, like a check mark
            </div>
          </div>

          <div className="register-form__switch">
            <p>Registering a facility instead?</p>
            <div className="register-form__switch-links">
              <Link to="/register/hospital">Hospital &amp; Clinic</Link>
              <Link to="/register/pharmacy">Pharmacy</Link>
              <Link to="/register/labs">Labs &amp; Diagnostics</Link>
            </div>
          </div>
        </aside>

        <form className="register-form__card card" onSubmit={handleSubmit}>
          <h2 className="h3">Verify your registration</h2>

          <div className="field">
            <label>Full name (as on your medical registration)</label>
            <input
              className="input"
              required
              placeholder="Dr. Full Name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </div>

          <div className="register-form__row">
            <div className="field">
              <label>NMC / registration number</label>
              <input
                className="input"
                required
                placeholder="e.g. TS-12345-2014"
                value={form.nmcId}
                onChange={(e) => update("nmcId", e.target.value)}
              />
            </div>
            <div className="field">
              <label>State medical council</label>
              <select className="select" value={form.council} onChange={(e) => update("council", e.target.value)}>
                {councils.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-ghost btn-block"
            onClick={runVerification}
            disabled={verifyState === "checking" || !form.name || !form.nmcId}
          >
            <Icon name="shield-check" size={16} />
            {verifyState === "checking"
              ? "Checking NMC · ABDM NMR · council…"
              : verifyState === "verified"
              ? "Re-run verification"
              : "Verify with NMC / ABDM NMR"}
          </button>

          {verifyState === "verified" && (
            <div className="doctor-verify-result">
              <div className="doctor-verify-result__head">
                <span className="doctor-verify-result__avatar">
                  {form.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase() || "DR"}
                </span>
                <div>
                  <p className="doctor-verify-result__name">
                    {form.name || "Dr. —"} <VerifiedBadge source="NMC + ABDM" size="sm" />
                  </p>
                  <p className="doctor-verify-result__meta">{form.specialty}</p>
                </div>
              </div>
              <ul>
                <li>
                  <Icon name="check-circle" size={14} /> Indian Medical Register — match found
                </li>
                <li>
                  <Icon name="check-circle" size={14} /> ABDM National Medical Register — match found
                </li>
                <li>
                  <Icon name="check-circle" size={14} /> {form.council} — active registration
                </li>
              </ul>
            </div>
          )}

          <hr className="divider" />

          <div className="register-form__row">
            <div className="field">
              <label>Specialty</label>
              <select className="select" value={form.specialty} onChange={(e) => update("specialty", e.target.value)}>
                {specialties.map((s) => (
                  <option key={s.slug} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Years of experience</label>
              <input
                className="input"
                type="number"
                min="0"
                required
                value={form.experience}
                onChange={(e) => update("experience", e.target.value)}
              />
            </div>
          </div>

          <div className="register-form__row">
            <div className="field">
              <label>Mobile number</label>
              <input
                className="input"
                type="tel"
                required
                placeholder="10-digit mobile number"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>
            <div className="field">
              <label>Email</label>
              <input
                className="input"
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>
          </div>

          <label className="checkbox-row mt-16">
            <input
              type="checkbox"
              required
              checked={form.agree}
              onChange={(e) => update("agree", e.target.checked)}
            />
            <span>
              I consent to LocDoc verifying my registration number against the Indian Medical
              Register, ABDM NMR and applicable state council records.
            </span>
          </label>

          <button className="btn btn-primary btn-block btn-lg mt-24" type="submit" disabled={submitting}>
            {submitting ? "Submitting…" : "Submit registration"}
            {!submitting && <Icon name="arrow-right" size={17} />}
          </button>
        </form>
      </div>
    </div>
  );
}
