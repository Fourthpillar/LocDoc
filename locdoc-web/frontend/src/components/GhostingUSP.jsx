import Icon from "./Icon.jsx";
import { metrics } from "../data/metrics.js";
import "./GhostingUSP.css";

const flow = [
  { icon: "calendar", title: "Slot booked", desc: "Patient books a doctor at a specific facility & time." },
  { icon: "navigation", title: "Doctor In Transit", desc: "Opt-in location status begins as the doctor heads in." },
  { icon: "radar", title: "Delay detected", desc: "Projected arrival is compared to the booked slot automatically." },
  { icon: "bell", title: "Everyone notified", desc: "Every affected patient gets the revised time — app, SMS or WhatsApp." },
  { icon: "check-circle", title: "Choice, not chaos", desc: "Accept, reschedule, or switch to another doctor — in one tap." },
];

export default function GhostingUSP() {
  return (
    <section className="usp section" id="usp">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">
            <span className="dot" />
            The LocDoc difference
          </div>
          <h2 className="h2">
            We built the one thing every <br className="hide-sm" />
            healthcare app forgot: <span className="text-gradient">punctuality.</span>
          </h2>
          <p className="lede mt-16">
            Doctors run late. Patients don't show up. Nobody finds out until they're already
            sitting in a waiting room. The LocDoc Engine closes that gap — in both directions —
            before it costs anyone their afternoon.
          </p>
        </div>

        <div className="usp-flow reveal">
          {flow.map((step, i) => (
            <div className="usp-flow__step" key={step.title}>
              <div className="usp-flow__icon">
                <Icon name={step.icon} size={20} />
              </div>
              <p className="usp-flow__title">{step.title}</p>
              <p className="usp-flow__desc">{step.desc}</p>
              {i < flow.length - 1 && <span className="usp-flow__arrow"><Icon name="chevron-right" size={16} /></span>}
            </div>
          ))}
        </div>

        <div className="usp-metrics reveal">
          {metrics.map((m) => (
            <div className="usp-metric card card--hover" key={m.label}>
              <p className="usp-metric__target">{m.target}</p>
              <p className="usp-metric__label">{m.label}</p>
              <p className="usp-metric__detail">{m.detail}</p>
            </div>
          ))}
        </div>
        <p className="usp-metrics__note">
          Pilot targets from LocDoc's product requirements — baselines are captured live once a
          facility goes on-platform.
        </p>
      </div>
    </section>
  );
}
