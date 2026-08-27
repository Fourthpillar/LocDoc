import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import DoctorCard from "../components/DoctorCard.jsx";
import Modal from "../components/Modal.jsx";
import { doctors } from "../data/doctors.js";
import { specialties } from "../data/specialties.js";
import { clinics } from "../data/clinics.js";
import "./FindDoctors.css";

const sorters = {
  rating: (a, b) => b.rating - a.rating,
  experience: (a, b) => b.experience - a.experience,
  fee: (a, b) => a.fee - b.fee,
};

export default function FindDoctors() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [sortKey, setSortKey] = useState("rating");
  const [selected, setSelected] = useState(null);

  const specialtySlug = params.get("specialty") || "";
  const clinicId = params.get("clinic") || "";
  const clinic = clinics.find((c) => c.id === clinicId);

  useEffect(() => {
    document.title = "Find Doctors — LocDoc";
  }, []);

  const results = useMemo(() => {
    let list = [...doctors];
    if (specialtySlug) {
      const spec = specialties.find((s) => s.slug === specialtySlug);
      if (spec) list = list.filter((d) => d.specialty === spec.name);
    }
    if (clinic) {
      list = list.filter((d) => d.facility === clinic.name);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.specialty.toLowerCase().includes(q) ||
          d.facility.toLowerCase().includes(q)
      );
    }
    return list.sort(sorters[sortKey]);
  }, [specialtySlug, clinic, query, sortKey]);

  function updateSpecialty(slug) {
    const next = new URLSearchParams(params);
    if (slug) next.set("specialty", slug);
    else next.delete("specialty");
    next.delete("clinic");
    setParams(next);
  }

  function clearFilters() {
    setParams({});
    setQuery("");
  }

  return (
    <div className="find-doctors">
      <div className="find-doctors__hero">
        <div className="container">
          <div className="eyebrow">
            <span className="dot" />
            {clinic ? clinic.name : "Find doctors"}
          </div>
          <h1 className="h2">
            {clinic ? `Doctors at ${clinic.name}` : "Search verified doctors near you"}
          </h1>
          <p className="lede mt-16">
            Every profile below is registration-verified. Punctuality is shown in plain language,
            not buried in fine print.
          </p>

          <div className="find-doctors__search">
            <Icon name="search" size={18} />
            <input
              placeholder="Search by doctor, specialty or clinic"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container find-doctors__body">
        <div className="find-doctors__chips">
          <button
            className={`chip ${!specialtySlug ? "chip--active" : ""}`}
            onClick={() => updateSpecialty("")}
          >
            All specialties
          </button>
          {specialties.map((s) => (
            <button
              key={s.slug}
              className={`chip ${specialtySlug === s.slug ? "chip--active" : ""}`}
              onClick={() => updateSpecialty(s.slug)}
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="find-doctors__toolbar">
          <p className="find-doctors__count">{results.length} doctors found</p>
          <div className="find-doctors__sort">
            <label htmlFor="sort">Sort by</label>
            <select id="sort" className="select" value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
              <option value="rating">Highest rated</option>
              <option value="experience">Most experienced</option>
              <option value="fee">Lowest fee</option>
            </select>
            {(specialtySlug || clinicId || query) && (
              <button className="btn btn-text btn-sm" onClick={clearFilters}>
                Clear filters
              </button>
            )}
          </div>
        </div>

        {results.length > 0 ? (
          <div className="find-doctors__grid">
            {results.map((d) => (
              <DoctorCard doctor={d} key={d.id} onBook={setSelected} />
            ))}
          </div>
        ) : (
          <div className="find-doctors__empty">
            <Icon name="search" size={30} />
            <p>No doctors match those filters yet.</p>
            <button className="btn btn-ghost btn-sm" onClick={clearFilters}>
              Reset search
            </button>
          </div>
        )}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Booking preview">
        {selected && (
          <div className="booking-preview">
            <p className="body-text">
              This is a product preview of LocDoc's booking flow for{" "}
              <strong>{selected.name}</strong> at <strong>{selected.facility}</strong>.
            </p>
            <p className="body-text mt-16">
              Live booking, OTP verification and the ghosting-prevention notifications go live
              once a facility completes onboarding. For now, log in to be first in line when this
              doctor comes online.
            </p>
            <Link to="/login" className="btn btn-primary btn-block mt-24">
              Log in
            </Link>
          </div>
        )}
      </Modal>
    </div>
  );
}
