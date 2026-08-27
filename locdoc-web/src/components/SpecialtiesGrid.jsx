import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import { specialties } from "../data/specialties.js";
import "./SpecialtiesGrid.css";

export default function SpecialtiesGrid({ title = true, limit }) {
  const list = limit ? specialties.slice(0, limit) : specialties;
  return (
    <section className="specialties section section--tight" id="specialties">
      <div className="container">
        {title && (
          <div className="section-head align-left reveal">
            <div className="eyebrow">
              <span className="dot" />
              Discover
            </div>
            <h2 className="h2">Find doctors in top specialties</h2>
          </div>
        )}
        <div className="specialties__grid reveal">
          {list.map((s) => (
            <Link to={`/doctors?specialty=${s.slug}`} className="specialty-card card card--hover" key={s.slug}>
              <div className="specialty-card__icon">
                <Icon name={s.icon} size={22} />
              </div>
              <p className="specialty-card__name">{s.name}</p>
              <p className="specialty-card__blurb">{s.blurb}</p>
              <p className="specialty-card__count">{s.count}+ doctors</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
