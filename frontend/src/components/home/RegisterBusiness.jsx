import { Link } from "react-router-dom";
import Icon from "../Icon.jsx";
import { registrationTypes } from "../../data/registrationTypes.js";
import "./RegisterBusiness.css";

const onboardSteps = [
  { icon: "upload", label: "Submit details & certificate" },
  { icon: "shield-check", label: "We verify & background-check" },
  { icon: "mail", label: "Credentials sent by email" },
];

export default function RegisterBusiness() {
  const cards = Object.values(registrationTypes);
  return (
    <section className="register-biz section" id="register">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">
            <span className="dot" />
            To register
          </div>
          <h2 className="h2">Bring your facility onto LocDoc</h2>
          <p className="lede mt-16">
            Register your government-recognised certificate and details — we verify, run a
            background check, and email your credentials once you're onboarded.
          </p>
        </div>

        <div className="register-biz__steps reveal">
          {onboardSteps.map((s, i) => (
            <div className="register-biz__step" key={s.label}>
              <span className="register-biz__step-num">{i + 1}</span>
              <Icon name={s.icon} size={16} />
              {s.label}
            </div>
          ))}
        </div>

        <div className="register-biz__grid reveal">
          {cards.map((c) => (
            <div className="register-card card card--hover" key={c.slug}>
              <div className="register-card__icon">
                <Icon name={c.icon} size={24} />
              </div>
              <h3 className="h3">{c.label}</h3>
              <p className="body-text mt-8">{c.intro}</p>
              <Link to={`/register/${c.slug}`} className="btn btn-primary btn-block mt-24">
                Register {c.label}
                <Icon name="arrow-right" size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
