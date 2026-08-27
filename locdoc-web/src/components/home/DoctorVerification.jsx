import { Link } from "react-router-dom";
import Icon from "../Icon.jsx";
import VerifiedBadge from "../VerifiedBadge.jsx";
import "./DoctorVerification.css";

const sources = [
  {
    icon: "shield-check",
    title: "Indian Medical Register (NMC)",
    desc: "Cross-checked against the National Medical Commission's Indian Medical Register.",
  },
  {
    icon: "compass",
    title: "ABDM National Medical Register",
    desc: "Matched against the ABDM NMR search portal for a second, independent confirmation.",
  },
  {
    icon: "map-pin",
    title: "State Medical Council",
    desc: "Cross-referenced with the relevant state council — e.g. TSMC — where available.",
  },
];

export default function DoctorVerification() {
  return (
    <section className="verify section">
      <div className="container verify__grid">
        <div className="reveal">
          <div className="eyebrow">
            <span className="dot" />
            Trust, verified
          </div>
          <h2 className="h2">Every badge is earned — not decorative.</h2>
          <p className="lede mt-16">
            A doctor doesn't get listed by simply signing up. LocDoc checks their registration
            number against official medical registers before the profile ever goes live — the
            same way a blue check works, except this one is tied to a government record.
          </p>

          <div className="verify__sources mt-32">
            {sources.map((s) => (
              <div className="verify__source" key={s.title}>
                <div className="verify__source-icon">
                  <Icon name={s.icon} size={18} />
                </div>
                <div>
                  <p className="verify__source-title">{s.title}</p>
                  <p className="verify__source-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Link to="/register/doctor" className="btn btn-primary mt-32">
            Register &amp; get verified
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>

        <div className="reveal verify__preview-wrap">
          <div className="verify__preview card">
            <div className="verify__preview-head">
              <span className="verify__preview-avatar">AR</span>
              <div>
                <div className="verify__preview-name">
                  Dr. Anjali Rao <VerifiedBadge source="NMC + TSMC" size="sm" />
                </div>
                <p className="verify__preview-role">Gynecologist &amp; Obstetrician · MBBS, MS (OBG)</p>
              </div>
            </div>

            <div className="verify__preview-rows">
              <div className="verify__preview-row">
                <span>NMC Registration</span>
                <strong>Matched — Indian Medical Register</strong>
                <Icon name="check-circle" size={16} className="ok" />
              </div>
              <div className="verify__preview-row">
                <span>ABDM NMR</span>
                <strong>Matched — National Medical Register</strong>
                <Icon name="check-circle" size={16} className="ok" />
              </div>
              <div className="verify__preview-row">
                <span>Telangana State Medical Council</span>
                <strong>Matched — Active registration</strong>
                <Icon name="check-circle" size={16} className="ok" />
              </div>
            </div>

            <p className="verify__preview-foot">
              <Icon name="badge-check" size={14} filled /> Verified profile — shown to every patient at booking
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
