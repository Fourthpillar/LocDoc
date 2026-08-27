import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Icon from "./Icon";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

const patientLinks = [
  { to: "/doctors", label: "Find Doctors & Book", icon: "search", desc: "Search by specialty, clinic or location" },
  { to: "/medicines", label: "Find Medicines", icon: "storefront", desc: "Check nearby pharmacy stock & prices" },
  { to: "/lab-tests", label: "Book Lab Tests", icon: "flask", desc: "Compare tests, prices & turnaround" },
  { to: "/login", label: "Log in", icon: "users", desc: "Track appointments & delay alerts" },
];

const registerLinks = [
  { to: "/register/hospital", label: "Hospital & Clinic", icon: "building", desc: "Facility, doctor & queue tooling" },
  { to: "/register/pharmacy", label: "Pharmacy", icon: "storefront", desc: "Stock listing & reservations" },
  { to: "/register/labs", label: "Labs & Diagnostics", icon: "flask", desc: "Test catalogue & bookings" },
];

// Hover-driven dropdown with a short close delay, so moving the mouse across
// the small gap between the trigger and the panel (or briefly off either)
// doesn't slam it shut. Clicking only ever opens it — it never toggles shut
// under the cursor while you're still hovering.
function useHoverDropdown() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  function cancelClose() {
    clearTimeout(closeTimer.current);
  }

  function openNow() {
    cancelClose();
    setOpen(true);
  }

  function scheduleClose() {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 200);
  }

  useEffect(() => () => cancelClose(), []);

  return {
    open,
    close: () => {
      cancelClose();
      setOpen(false);
    },
    handlers: {
      onMouseEnter: openNow,
      onMouseLeave: scheduleClose,
      onFocus: openNow,
      onBlur: scheduleClose,
    },
    onTriggerClick: openNow,
  };
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const patients = useHoverDropdown();
  const facilities = useHoverDropdown();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    patients.close();
    facilities.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <Link to="/" className="nav__brand">
          <span className="nav__brand-mark">
            <Icon name="map-pin" size={18} strokeWidth={2.2} />
          </span>
          LocDoc
        </Link>

        <nav className="nav__links">
          <div className="nav__dropdown" {...patients.handlers}>
            <button className="nav__link nav__link--btn" onClick={patients.onTriggerClick}>
              For Patients <Icon name="chevron-down" size={15} />
            </button>
            {patients.open && (
              <div className="nav__dropdown-panel">
                {patientLinks.map((l) => (
                  <Link key={l.to} to={l.to} className="nav__dropdown-item">
                    <span className="nav__dropdown-icon">
                      <Icon name={l.icon} size={17} />
                    </span>
                    <span>
                      <strong>{l.label}</strong>
                      <small>{l.desc}</small>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="nav__dropdown" {...facilities.handlers}>
            <button className="nav__link nav__link--btn" onClick={facilities.onTriggerClick}>
              For Facilities <Icon name="chevron-down" size={15} />
            </button>
            {facilities.open && (
              <div className="nav__dropdown-panel">
                {registerLinks.map((l) => (
                  <Link key={l.to} to={l.to} className="nav__dropdown-item">
                    <span className="nav__dropdown-icon">
                      <Icon name={l.icon} size={17} />
                    </span>
                    <span>
                      <strong>{l.label}</strong>
                      <small>{l.desc}</small>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <NavLink to="/register/doctor" className="nav__link">
            For Doctors
          </NavLink>
          <NavLink to="/about" className="nav__link">
            About
          </NavLink>
        </nav>

        <div className="nav__actions">
          <button className="nav__theme" onClick={toggleTheme} aria-label="Toggle theme">
            <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
          </button>
          <Link to="/login" className="btn btn-primary btn-sm">
            Log in
          </Link>
          <button className="nav__burger" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {open && (
        <div className="nav__mobile">
          <p className="nav__mobile-heading">For Patients</p>
          {patientLinks.map((l) => (
            <Link key={l.to} to={l.to} className="nav__mobile-link nav__mobile-link--sub">
              {l.label}
            </Link>
          ))}
          <p className="nav__mobile-heading">For Facilities</p>
          {registerLinks.map((l) => (
            <Link key={l.to} to={l.to} className="nav__mobile-link nav__mobile-link--sub">
              {l.label}
            </Link>
          ))}
          <NavLink to="/register/doctor" className="nav__mobile-link">
            For Doctors
          </NavLink>
          <NavLink to="/about" className="nav__mobile-link">
            About
          </NavLink>
          <div className="nav__mobile-actions">
            <Link to="/login" className="btn btn-primary btn-block">
              Log in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
