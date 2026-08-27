import { Link } from "react-router-dom";
import Icon from "../Icon.jsx";
import "./FacilityPreview.css";

const roster = [
  { init: "AR", name: "Dr. Anjali Rao",     spec: "Gynaecology", status: "on-time",  slot: "In consult · 4:12 PM" },
  { init: "KM", name: "Dr. Karthik Menon",  spec: "Cardiology",  status: "transit",  slot: "In transit · ETA 12m" },
  { init: "SI", name: "Dr. Sneha Iyer",     spec: "Paediatrics", status: "on-time",  slot: "Available · next slot 4:30" },
  { init: "AK", name: "Dr. Ayesha Khan",    spec: "Psychiatry",  status: "delayed",  slot: "Delayed 8m · reschedule sent" },
];

const statusLabel = { "on-time": "On time", "transit": "In transit", "delayed": "Delayed" };

const benefits = [
  { icon: "activity",  title: "Live roster & queue", desc: "See every doctor's real status and today's waitlist at a glance." },
  { icon: "bell",      title: "Ghost-free bookings", desc: "Auto-nudges, confirm-or-release, and SMS delay alerts baked in." },
  { icon: "shield-check", title: "Verified from day one", desc: "Doctor NMC / ABDM match runs before the profile goes live." },
  { icon: "layers",    title: "Adopt on your terms", desc: "Turn on Pharmacy or Labs modules only when you're ready." },
];

export default function FacilityPreview() {
  return (
    <section className="fp section">
      <div className="container fp__grid">
        {/* Left: pitch */}
        <div className="fp__copy reveal">
          <div className="eyebrow">
            <span className="dot" />
            For hospitals · clinics · pharmacies · labs
          </div>
          <h2 className="h2">See exactly what you get before you sign a thing.</h2>
          <p className="lede mt-16">
            A lightweight preview of the Platform Admin console — live roster, queue,
            verified badges and the ghosting-prevention engine your team gets from day one.
          </p>

          <ul className="fp__benefits">
            {benefits.map((b) => (
              <li key={b.title}>
                <span className="fp__benefit-icon"><Icon name={b.icon} size={16} /></span>
                <div>
                  <strong>{b.title}</strong>
                  <span>{b.desc}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="fp__ctas">
            <Link to="/register/hospital" className="btn btn-primary">
              Book a walkthrough
              <Icon name="arrow-right" size={16} />
            </Link>
            <Link to="/about#how-it-works" className="btn btn-ghost">See how it works</Link>
          </div>
        </div>

        {/* Right: dashboard mock */}
        <div className="fp__mock reveal">
          {/* Window chrome */}
          <div className="fp__chrome">
            <span className="fp__chip"><span /><span /><span /></span>
            <span className="fp__url">
              <Icon name="shield-check" size={12} />
              admin.locdoc.in / dashboard
            </span>
            <span className="fp__chrome-right">
              <span className="fp__chrome-dot" /> Streaming
            </span>
          </div>

          <div className="fp__body">
            {/* Side rail */}
            <aside className="fp__side">
              <div className="fp__brand-mini">
                <span className="fp__brand-mark"><Icon name="map-pin" size={12} strokeWidth={2.2} /></span>
                LocDoc Admin
              </div>
              <div className="fp__facility">
                <span>Trinity Heart Institute</span>
                <em>Banjara Hills · verified</em>
              </div>
              <nav className="fp__nav">
                <a className="is-active"><Icon name="activity" size={14} />Live queue</a>
                <a><Icon name="calendar" size={14} />Appointments</a>
                <a><Icon name="users" size={14} />Doctors</a>
                <a><Icon name="storefront" size={14} />Pharmacy</a>
                <a><Icon name="flask" size={14} />Labs</a>
                <a><Icon name="bell" size={14} />Notifications</a>
              </nav>
            </aside>

            {/* Main */}
            <div className="fp__main">
              <div className="fp__topline">
                <div>
                  <h4>Live queue · today</h4>
                  <p>4 doctors on-call · 22 appointments streaming</p>
                </div>
                <div className="fp__pill fp__pill--ok">
                  <span className="fp__pill-dot" /> 94% on-time this week
                </div>
              </div>

              <div className="fp__kpis">
                <div className="fp__kpi">
                  <span className="fp__kpi-k">In queue</span>
                  <span className="fp__kpi-v">18</span>
                  <span className="fp__kpi-h">across 4 doctors</span>
                </div>
                <div className="fp__kpi fp__kpi--accent">
                  <span className="fp__kpi-k">Delay alerts sent</span>
                  <span className="fp__kpi-v">12</span>
                  <span className="fp__kpi-h">SMS + WhatsApp · today</span>
                </div>
                <div className="fp__kpi">
                  <span className="fp__kpi-k">Waitlist backfill</span>
                  <span className="fp__kpi-v">3</span>
                  <span className="fp__kpi-h">slots recovered</span>
                </div>
              </div>

              <div className="fp__roster">
                <div className="fp__roster-head">
                  <span>Doctor</span>
                  <span>Status</span>
                  <span>Current slot</span>
                </div>
                {roster.map((r) => (
                  <div className="fp__roster-row" key={r.init}>
                    <div className="fp__doc">
                      <span className="fp__avatar">{r.init}</span>
                      <div>
                        <strong>{r.name}</strong>
                        <em>{r.spec}</em>
                      </div>
                    </div>
                    <span className={`fp__status fp__status--${r.status}`}>
                      <span className="fp__status-dot" /> {statusLabel[r.status]}
                    </span>
                    <span className="fp__slot">{r.slot}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
