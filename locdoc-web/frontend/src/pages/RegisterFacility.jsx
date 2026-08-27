import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import OnboardingTracker from "../components/OnboardingTracker.jsx";
import { registrationTypes } from "../data/registrationTypes.js";
import "./RegisterForm.css";

const initialForm = {
  facilityName: "",
  regNumber: "",
  address: "",
  city: "",
  pincode: "",
  lat: "",
  lng: "",
  contactName: "",
  phone: "",
  email: "",
  modules: [],
  fileName: "",
  agree: false,
};

export default function RegisterFacility({ type }) {
  const config = registrationTypes[type];
  const [form, setForm] = useState(initialForm);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = `${config.heading} — LocDoc`;
    setForm(initialForm);
    setSubmitted(false);
  }, [type]); // eslint-disable-line react-hooks/exhaustive-deps

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function toggleModule(id) {
    setForm((f) => ({
      ...f,
      modules: f.modules.includes(id) ? f.modules.filter((m) => m !== id) : [...f.modules, id],
    }));
  }

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setLocError("Location isn't available in this browser.");
      return;
    }
    setLocating(true);
    setLocError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        update("lat", pos.coords.latitude.toFixed(5));
        update("lng", pos.coords.longitude.toFixed(5));
        setLocating(false);
      },
      () => {
        setLocError("Couldn't fetch your location — enter it manually.");
        setLocating(false);
      },
      { timeout: 8000 }
    );
  }

  function handleFile(e) {
    const f = e.target.files?.[0];
    update("fileName", f ? f.name : "");
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
          <h1 className="h2">Application received</h1>
          <p className="lede mt-16">
            Thanks, {form.contactName || "there"} — <strong>{form.facilityName}</strong> is now in
            our onboarding queue.
          </p>

          <OnboardingTracker
            stepDurations={[1400, 3600, 0]}
            steps={[
              {
                icon: "upload",
                title: "Submitted",
                desc: "Details, certificate and geo-location captured.",
              },
              {
                icon: "shield-check",
                title: "Verifying registration",
                desc: `Certificate ${form.regNumber || "number"} cross-checked with the ${config.registryName || "state health registry"}.`,
                doingHint: "Usually done in under 90 seconds…",
              },
              {
                icon: "mail",
                title: "Credentials sent",
                desc: `Login link and admin console access will land at ${form.email || "your inbox"}.`,
              },
            ]}
          />
          <p className="body-text mt-24">
            This is a product preview — no backend is connected yet, so nothing has actually been
            sent. Once LocDoc's verification service is live, this is exactly the flow your
            application will follow.
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
            Facility registration
          </div>
          <h1 className="h2">{config.heading}</h1>
          <p className="lede mt-16">{config.intro}</p>

          <div className="register-form__aside-steps">
            <div>
              <Icon name="upload" size={16} /> Submit details &amp; certificate
            </div>
            <div>
              <Icon name="shield-check" size={16} /> Platform Admin verifies &amp; runs a background check
            </div>
            <div>
              <Icon name="mail" size={16} /> Credentials emailed once approved
            </div>
          </div>

          <div className="register-form__switch">
            <p>Registering something else?</p>
            <div className="register-form__switch-links">
              {Object.values(registrationTypes)
                .filter((c) => c.slug !== type)
                .map((c) => (
                  <Link key={c.slug} to={`/register/${c.slug}`}>
                    {c.label}
                  </Link>
                ))}
              <Link to="/register/doctor">Doctor registration</Link>
            </div>
          </div>
        </aside>

        <form className="register-form__card card" onSubmit={handleSubmit}>
          <h2 className="h3">Facility details</h2>

          <div className="field">
            <label>{config.label} name</label>
            <input
              className="input"
              required
              placeholder="e.g. Sunrise Multispecialty Hospital"
              value={form.facilityName}
              onChange={(e) => update("facilityName", e.target.value)}
            />
          </div>

          <div className="field">
            <label>{config.idLabel}</label>
            <input
              className="input"
              required
              placeholder="Enter the certificate / licence number"
              value={form.regNumber}
              onChange={(e) => update("regNumber", e.target.value)}
            />
          </div>

          <div className="field">
            <label>{config.certificateLabel}</label>
            <label className="file-drop">
              <Icon name="upload" size={20} />
              <p className="mt-8">{form.fileName || "Click to upload your certificate"}</p>
              <span className="hint">{config.certificateHint}</span>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFile} hidden required />
            </label>
          </div>

          <div className="field">
            <label>Address</label>
            <textarea
              className="textarea"
              required
              placeholder="Building, street, area"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
            />
          </div>

          <div className="register-form__row">
            <div className="field">
              <label>City</label>
              <input
                className="input"
                required
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
              />
            </div>
            <div className="field">
              <label>Pincode</label>
              <input
                className="input"
                required
                value={form.pincode}
                onChange={(e) => update("pincode", e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label>Geo location</label>
            <div className="register-form__geo">
              <input
                className="input"
                placeholder="Latitude"
                value={form.lat}
                onChange={(e) => update("lat", e.target.value)}
              />
              <input
                className="input"
                placeholder="Longitude"
                value={form.lng}
                onChange={(e) => update("lng", e.target.value)}
              />
              <button type="button" className="btn btn-ghost btn-sm" onClick={useCurrentLocation} disabled={locating}>
                <Icon name="navigation" size={14} />
                {locating ? "Locating…" : "Use current location"}
              </button>
            </div>
            {locError && <p className="hint" style={{ color: "var(--danger)" }}>{locError}</p>}
          </div>

          <div className="field">
            <label>Modules you need</label>
            <div className="register-form__modules">
              {config.moduleOptions.map((m) => (
                <label className="checkbox-row register-form__module" key={m.id}>
                  <input
                    type="checkbox"
                    checked={form.modules.includes(m.id)}
                    onChange={() => toggleModule(m.id)}
                  />
                  <span>
                    <strong>{m.label}</strong>
                    <small>{m.note}</small>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <hr className="divider" />
          <h2 className="h3">Contact person</h2>

          <div className="register-form__row">
            <div className="field">
              <label>Full name</label>
              <input
                className="input"
                required
                value={form.contactName}
                onChange={(e) => update("contactName", e.target.value)}
              />
            </div>
            <div className="field">
              <label>Phone number</label>
              <input
                className="input"
                type="tel"
                required
                placeholder="10-digit mobile number"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label>Email — credentials will be sent here</label>
            <input
              className="input"
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>

          <label className="checkbox-row mt-16">
            <input
              type="checkbox"
              required
              checked={form.agree}
              onChange={(e) => update("agree", e.target.checked)}
            />
            <span>
              I confirm the details above are accurate and consent to LocDoc verifying this
              registration against government records.
            </span>
          </label>

          <button className="btn btn-primary btn-block btn-lg mt-24" type="submit" disabled={submitting}>
            {submitting ? "Submitting…" : "Submit for verification"}
            {!submitting && <Icon name="arrow-right" size={17} />}
          </button>
        </form>
      </div>
    </div>
  );
}
