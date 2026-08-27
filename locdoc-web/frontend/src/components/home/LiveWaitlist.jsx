import { useEffect, useState } from "react";
import Icon from "../Icon.jsx";
import "./LiveWaitlist.css";

const feed = [
  {
    clinic: "Trinity Heart Institute",
    area: "Banjara Hills",
    ahead: 3,
    doctor: "Dr. Karthik Menon",
    specialty: "Cardiology",
    status: "In Transit · ETA 12 min",
    tone: "warn",
  },
  {
    clinic: "Harmony Women's Care",
    area: "Jubilee Hills",
    ahead: 1,
    doctor: "Dr. Anjali Rao",
    specialty: "Gynaecology",
    status: "On time · seeing patients",
    tone: "ok",
  },
  {
    clinic: "Green Valley Family Clinic",
    area: "Kondapur",
    ahead: 5,
    doctor: "Dr. Ayesha Khan",
    specialty: "Psychiatry",
    status: "Delayed 8 min · reschedule offered",
    tone: "warn",
  },
  {
    clinic: "Cityscape Children's Hospital",
    area: "Gachibowli",
    ahead: 0,
    doctor: "Dr. Sneha Iyer",
    specialty: "Paediatrics",
    status: "Ready now · walk in",
    tone: "ok",
  },
];

const ROTATE_MS = 3600;

export default function LiveWaitlist() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => setI((n) => (n + 1) % feed.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [paused]);

  const item = feed[i];

  return (
    <section className="wait section--tight">
      <div className="container">
        <div
          className="wait__band"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="wait__side">
            <span className="wait__pulse" aria-hidden="true" />
            <span className="wait__eyebrow">Live queue · Hyderabad</span>
            <h3 className="wait__title">
              You'd be <span className="wait__ahead">{item.ahead === 0 ? "next in line" : `${item.ahead} ${item.ahead === 1 ? "person" : "people"} behind`}</span>
              {" "}at {item.clinic}.
            </h3>
            <p className="wait__desc">
              LocDoc streams your actual position and delay signal from every partner
              facility, so you never wait blind.
            </p>
          </div>

          <ul className="wait__card" aria-live="polite">
            {feed.map((f, idx) => (
              <li
                key={f.clinic}
                className={`wait__row wait__row--${f.tone} ${idx === i ? "is-active" : ""}`}
                onMouseEnter={() => setI(idx)}
              >
                <span className="wait__row-badge">
                  {f.ahead === 0 ? "NOW" : `#${f.ahead + 1}`}
                </span>
                <div className="wait__row-body">
                  <div className="wait__row-title">
                    <strong>{f.doctor}</strong>
                    <span>· {f.specialty}</span>
                  </div>
                  <div className="wait__row-sub">
                    <Icon name="map-pin" size={11} /> {f.clinic}, {f.area}
                  </div>
                </div>
                <span className={`wait__row-status wait__row-status--${f.tone}`}>
                  <span className="wait__dot" /> {f.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
