import { Link } from "react-router-dom";
import Icon from "../Icon.jsx";
import "./ServicePillars.css";

const pillars = [
  {
    icon: "stethoscope",
    title: "Book a doctor",
    desc: "Search by specialty or clinic, and get live status — not just a booked slot.",
    to: "/doctors",
    cta: "Find doctors",
  },
  {
    icon: "storefront",
    title: "Order medicines",
    desc: "See which nearby pharmacy actually has your prescription in stock, right now.",
    to: "/medicines",
    cta: "Find medicines",
  },
  {
    icon: "flask",
    title: "Book a lab test",
    desc: "Compare tests and packages across labs, and get a verified report back.",
    to: "/lab-tests",
    cta: "Browse tests",
  },
];

export default function ServicePillars() {
  return (
    <section className="pillars section--tight">
      <div className="container">
        <div className="pillars__grid reveal">
          {pillars.map((p) => (
            <Link to={p.to} className="pillar card card--hover" key={p.title}>
              <div className="pillar__icon">
                <Icon name={p.icon} size={22} />
              </div>
              <h3 className="h3">{p.title}</h3>
              <p className="body-text mt-8">{p.desc}</p>
              <span className="pillar__cta">
                {p.cta} <Icon name="arrow-right" size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
