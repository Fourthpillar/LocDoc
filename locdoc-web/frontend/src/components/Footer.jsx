import { Link } from "react-router-dom";
import Icon from "./Icon";
import "./Footer.css";

const columns = [
  {
    heading: "For Patients",
    links: [
      { label: "Find Doctors", to: "/doctors" },
      { label: "Find Medicines", to: "/medicines" },
      { label: "Book Lab Tests", to: "/lab-tests" },
      { label: "Top Specialties", to: "/#specialties" },
      { label: "Top Clinics", to: "/#clinics" },
      { label: "Log in", to: "/login" },
    ],
  },
  {
    heading: "For Providers",
    links: [
      { label: "Hospital & Clinic Registration", to: "/register/hospital" },
      { label: "Pharmacy Registration", to: "/register/pharmacy" },
      { label: "Labs & Diagnostics Registration", to: "/register/labs" },
      { label: "Doctor Registration & Verification", to: "/register/doctor" },
    ],
  },
  {
    heading: "Platform",
    links: [
      { label: "The LocDoc Engine", to: "/about#usp" },
      { label: "How It Works", to: "/about#how-it-works" },
      { label: "About LocDoc", to: "/about" },
      { label: "Our Team", to: "/about#team" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="nav__brand">
              <span className="nav__brand-mark">
                <Icon name="map-pin" size={18} strokeWidth={2.2} />
              </span>
              LocDoc
            </Link>
            <p className="footer__tagline">
              Healthcare that shows up on time. Live doctor tracking, automatic rescheduling and a
              verified local marketplace for hospitals, pharmacies and labs.
            </p>
            <div className="footer__social">
              <a href="#" aria-label="LinkedIn" className="footer__social-link">
                <Icon name="linkedin" size={17} />
              </a>
              <a href="#" aria-label="Twitter" className="footer__social-link">
                <Icon name="twitter" size={17} />
              </a>
              <a href="#" aria-label="Instagram" className="footer__social-link">
                <Icon name="instagram" size={17} />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading} className="footer__col">
              <h4>{col.heading}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__trust">
          <span className="footer__trust-item">
            <Icon name="shield-check" size={15} /> Doctor identity verified via NMC / ABDM NMR / state council
          </span>
          <span className="footer__trust-item">
            <Icon name="file-text" size={15} /> Facilities verified against government registration certificates
          </span>
        </div>

        <div className="divider" />

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} LocDoc. All rights reserved.</p>
          <div className="footer__legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
