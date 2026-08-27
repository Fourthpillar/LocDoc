import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import VerifiedBadge from "../components/VerifiedBadge.jsx";
import Modal from "../components/Modal.jsx";
import OnboardingTracker from "../components/OnboardingTracker.jsx";
import { doctors } from "../data/doctors.js";
import "./DoctorDetail.css";

/** Seed a stable pseudo-random from the id so metrics don't reshuffle per render */
function seed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = (h ^ str.charCodeAt(i)) * 16777619;
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function buildProfile(doc) {
  const rand = seed(doc.id);
  // 14-day punctuality history
  const history = Array.from({ length: 14 }, () => 74 + Math.round(rand() * 24));
  // Weekly average (last 7)
  const weekly = Math.round(history.slice(-7).reduce((a, b) => a + b, 0) / 7);
  // Delay minutes per weekday (avg)
  const weekdayDelay = dayLabels.map(() => Math.round(rand() * 12));

  // Next available slots — three days, 3-4 slots each
  const today = new Date();
  const slotDays = Array.from({ length: 3 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const label = i === 0 ? "Today" : i === 1 ? "Tomorrow" : dayLabels[(date.getDay() + 6) % 7];
    const dateStr = date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    const baseHours = [10, 11, 15, 17, 18];
    const slots = baseHours
      .filter(() => rand() > 0.25)
      .slice(0, 4)
      .map((h) => {
        const mins = rand() > 0.5 ? 30 : 0;
        const isPopular = rand() > 0.55;
        const isSoon = i === 0 && h < today.getHours() + 2;
        return {
          key: `${i}-${h}-${mins}`,
          label: `${((h - 1) % 12) + 1}:${mins.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`,
          tag: isSoon ? "Next 2h" : isPopular ? "Popular" : null,
        };
      });
    return { label, dateStr, slots };
  });

  const languages = ["English", "Hindi", ...(rand() > 0.5 ? ["Telugu"] : []), ...(rand() > 0.7 ? ["Kannada"] : [])];

  return { history, weekly, weekdayDelay, slotDays, languages };
}

export default function DoctorDetail() {
  const { id } = useParams();
  const doctor = doctors.find((d) => d.id === id);

  useEffect(() => {
    document.title = doctor ? `${doctor.name} · LocDoc` : "Doctor · LocDoc";
  }, [doctor]);

  const profile = useMemo(() => (doctor ? buildProfile(doctor) : null), [doctor]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [openBooking, setOpenBooking] = useState(false);

  if (!doctor) {
    return (
      <section className="container section" style={{ textAlign: "center" }}>
        <div className="eyebrow"><span className="dot" /> Not found</div>
        <h1 className="h2">We can't find that doctor.</h1>
        <p className="lede mt-16">The profile may have been unlisted or moved.</p>
        <Link className="btn btn-primary mt-24" to="/doctors">Back to doctors</Link>
      </section>
    );
  }

  const initials = doctor.name.replace("Dr. ", "").split(" ").map((p) => p[0]).join("").slice(0, 2);
  const maxHistory = Math.max(...profile.history);

  return (
    <>
      {/* Hero */}
      <section className="dd-hero">
        <div className="container">
          <nav className="dd-crumbs">
            <Link to="/doctors"><Icon name="arrow-left" size={14} /> Back to doctors</Link>
          </nav>

          <div className="dd-hero__grid">
            <div className="dd-hero__id">
              <span className="dd-hero__avatar">{initials}</span>
              <div>
                <div className="dd-hero__name">
                  <h1 className="h2">{doctor.name}</h1>
                  <VerifiedBadge source={doctor.verifiedVia} size="md" />
                </div>
                <p className="dd-hero__specialty">{doctor.specialty}</p>
                <p className="dd-hero__qual">{doctor.qualifications} · {doctor.experience} years experience</p>

                <div className="dd-hero__chips">
                  <span className="dd-hero__chip">
                    <Icon name="building" size={13} /> {doctor.facility}
                  </span>
                  <span className="dd-hero__chip">
                    <Icon name="map-pin" size={13} /> {doctor.area}
                  </span>
                  <span className="dd-hero__chip">
                    <Icon name="star" size={13} filled />
                    {doctor.rating} · {doctor.reviews} reviews
                  </span>
                </div>
              </div>
            </div>

            <aside className="dd-book">
              <p className="dd-book__label">Consultation fee</p>
              <p className="dd-book__fee">₹{doctor.fee}</p>
              <p className="dd-book__punct">
                <span className="dd-book__punct-dot" />
                {doctor.punctuality} · {profile.weekly}% on-time (7d)
              </p>
              <button
                className="btn btn-primary btn-lg btn-block"
                onClick={() => setOpenBooking(true)}
              >
                Book a visit
                <Icon name="arrow-right" size={16} />
              </button>
              <p className="dd-book__note">
                No credit card until confirmed. Cancel free up to 2h before.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* Punctuality history */}
      <section className="section--tight">
        <div className="container dd-cols">
          <div className="dd-col dd-punct">
            <div className="dd-col__head">
              <div>
                <div className="eyebrow"><span className="dot" /> Punctuality</div>
                <h2 className="h3">On time, honestly measured</h2>
                <p className="body-text mt-8">
                  LocDoc tracks every consult against its booked slot. This is the last 14 days —
                  live, not marketing.
                </p>
              </div>
              <div className="dd-punct__now">
                <span>7-day average</span>
                <strong>{profile.weekly}%</strong>
              </div>
            </div>

            <div className="dd-punct__chart" aria-label="14 day on-time percentage">
              {profile.history.map((v, i) => (
                <div className="dd-punct__col" key={i} title={`${v}%`}>
                  <span
                    className={`dd-punct__bar ${v >= 88 ? "is-ok" : v >= 78 ? "is-warn" : "is-late"}`}
                    style={{ height: `${(v / maxHistory) * 100}%` }}
                  />
                  {i === profile.history.length - 1 && <span className="dd-punct__cap">Today</span>}
                </div>
              ))}
            </div>

            <div className="dd-punct__legend">
              <span><em className="is-ok" /> ≥ 88% on-time</span>
              <span><em className="is-warn" /> 78 – 87%</span>
              <span><em className="is-late" /> below 78%</span>
            </div>
          </div>

          <div className="dd-col dd-langs">
            <div className="eyebrow"><span className="dot" /> Verified via</div>
            <h2 className="h3">Registration checks</h2>
            <ul className="dd-verify">
              <li>
                <span className="dd-verify__icon"><Icon name="shield-check" size={14} /></span>
                <div>
                  <strong>NMC Indian Medical Register</strong>
                  <em>Matched · {doctor.verifiedVia.includes("NMC") ? "active" : "linked"}</em>
                </div>
              </li>
              <li>
                <span className="dd-verify__icon"><Icon name="badge-check" size={14} /></span>
                <div>
                  <strong>ABDM NMR</strong>
                  <em>{doctor.verifiedVia.includes("ABDM") ? "Linked" : "Verification in progress"}</em>
                </div>
              </li>
              <li>
                <span className="dd-verify__icon"><Icon name="file-text" size={14} /></span>
                <div>
                  <strong>State council</strong>
                  <em>{doctor.verifiedVia.includes("TSMC") ? "TSMC · active" : "state records matched"}</em>
                </div>
              </li>
            </ul>

            <div className="dd-langs__pane">
              <p className="body-text" style={{ marginBottom: 8 }}>Speaks</p>
              <div className="dd-langs__row">
                {profile.languages.map((l) => (
                  <span className="badge" key={l}>{l}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slots */}
      <section className="section--tight">
        <div className="container">
          <div className="section-head align-left">
            <div className="eyebrow"><span className="dot" /> Live availability</div>
            <h2 className="h3">Next available slots</h2>
            <p className="body-text mt-8">
              Slots that show up here have already been reconciled with the doctor's live status
              board — no double-bookings, no ghosting.
            </p>
          </div>

          <div className="dd-slots">
            {profile.slotDays.map((d) => (
              <div className="dd-slots__day" key={d.label}>
                <div className="dd-slots__day-head">
                  <strong>{d.label}</strong>
                  <span>{d.dateStr}</span>
                </div>
                <div className="dd-slots__grid">
                  {d.slots.length === 0 && (
                    <span className="dd-slots__none">Fully booked</span>
                  )}
                  {d.slots.map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      className={`dd-slot ${selectedSlot?.key === s.key ? "is-active" : ""}`}
                      onClick={() => {
                        setSelectedSlot({ ...s, day: d.label, date: d.dateStr });
                        setOpenBooking(true);
                      }}
                    >
                      <span>{s.label}</span>
                      {s.tag && <em>{s.tag}</em>}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking flow preview */}
      <BookingFlowPreview />

      <Modal open={openBooking} onClose={() => setOpenBooking(false)} title="Confirm this visit">
        <BookingFlowConfirm
          doctor={doctor}
          slot={selectedSlot}
          onClose={() => setOpenBooking(false)}
        />
      </Modal>
    </>
  );
}

/* ------------------------------------------------------------ */
/* Static preview of the booking flow shown to prospective users */
/* ------------------------------------------------------------ */
function BookingFlowPreview() {
  const steps = [
    { icon: "calendar",  title: "Pick a slot",       desc: "You choose from live-reconciled times shown above." },
    { icon: "user",       title: "Confirm details",   desc: "Just your name and mobile — one-time OTP for record linkage." },
    { icon: "bell",       title: "SMS + WhatsApp",   desc: "You get a confirmation and a live status link that updates in real time." },
    { icon: "check-circle", title: "Walk in on time", desc: "If the doctor's running late, the link updates and you can reschedule with one tap." },
  ];
  return (
    <section className="section--tight dd-flow">
      <div className="container">
        <div className="dd-flow__card">
          <div className="dd-flow__head">
            <div>
              <div className="eyebrow"><span className="dot" /> Booking preview</div>
              <h2 className="h3">Here's what happens after you tap "book"</h2>
            </div>
            <span className="dd-flow__badge">
              <Icon name="shield-check" size={12} /> Ghost-free
            </span>
          </div>

          <div className="dd-flow__steps">
            {steps.map((s, i) => (
              <div className="dd-flow__step" key={s.title}>
                <span className="dd-flow__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="dd-flow__icon"><Icon name={s.icon} size={16} /></span>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Live tracker inside modal */
function BookingFlowConfirm({ doctor, slot, onClose }) {
  return (
    <div>
      <div className="dd-confirm__summary">
        <div>
          <p className="dd-confirm__label">Doctor</p>
          <strong>{doctor.name} · {doctor.specialty.split(" ")[0]}</strong>
          <em>{doctor.facility}</em>
        </div>
        <div>
          <p className="dd-confirm__label">Slot</p>
          <strong>{slot ? `${slot.day} · ${slot.label}` : "Next available"}</strong>
          <em>{slot?.date || "Confirmed below"}</em>
        </div>
      </div>

      <OnboardingTracker
        stepDurations={[900, 2400, 0]}
        steps={[
          { icon: "check", title: "Slot held",       desc: "Your seat is reserved for 3 minutes while we confirm." },
          { icon: "phone", title: "Sending OTP",     desc: "You'd get a 6-digit code on the phone number linked to this account.", doingHint: "SMS + WhatsApp fallback…" },
          { icon: "bell",  title: "Confirmed",       desc: "Confirmation + a live status link go to your phone. The doctor sees you on their board." },
        ]}
      />

      <div className="dd-confirm__actions">
        <button className="btn btn-ghost btn-sm" onClick={onClose}>Close preview</button>
        <span className="dd-confirm__note">This is a demo of the flow — no real booking is placed.</span>
      </div>
    </div>
  );
}
