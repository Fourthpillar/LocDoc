import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import { clinics } from "../data/clinics.js";
import "./TopClinics.css";

export default function TopClinics({ limit }) {
  const list = limit ? clinics.slice(0, limit) : clinics;
  return (
    <section className="clinics section section--tight" id="clinics">
      <div className="container">
        <div className="section-head align-left reveal">
          <div className="eyebrow">
            <span className="dot" />
            Trusted facilities
          </div>
          <h2 className="h2">Find doctors in top clinics &amp; hospitals</h2>
        </div>

        <div className="clinics__grid reveal">
          {list.map((c) => (
            <Link to={`/doctors?clinic=${c.id}`} className="clinic-card card card--hover" key={c.id}>
              <div className="clinic-card__top">
                <div className="clinic-card__icon">
                  <Icon name="building" size={20} />
                </div>
                <div className="clinic-card__rating">
                  <Icon name="star" size={13} filled />
                  {c.rating}
                  <span>({c.reviews})</span>
                </div>
              </div>
              <p className="clinic-card__name">{c.name}</p>
              <p className="clinic-card__area">
                <Icon name="map-pin" size={13} /> {c.area}, {c.city}
              </p>
              <p className="clinic-card__meta">
                {c.doctors} doctors · {c.specialties} specialties
              </p>
              {c.modules.length > 0 && (
                <div className="clinic-card__modules">
                  {c.modules.map((m) => (
                    <span className="badge badge-brand" key={m}>
                      {m}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
