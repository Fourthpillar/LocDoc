import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import LabTestCard from "../components/LabTestCard.jsx";
import Modal from "../components/Modal.jsx";
import PageHero from "../components/PageHero.jsx";
import { labTests } from "../data/labTests.js";
import "./FindDoctors.css";

const sorters = {
  price: (a, b) => a.price - b.price,
  rating: (a, b) => b.rating - a.rating,
};

export default function LabTests() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [sortKey, setSortKey] = useState("rating");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    document.title = "Book Lab Tests — LocDoc";
  }, []);

  const results = useMemo(() => {
    let list = [...labTests];
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (t) => t.name.toLowerCase().includes(q) || t.lab.toLowerCase().includes(q)
      );
    }
    return list.sort(sorters[sortKey]);
  }, [query, sortKey]);

  function clearFilters() {
    setParams({});
    setQuery("");
  }

  return (
    <div className="find-doctors">
      <PageHero
        variant="labs"
        eyebrow="Book lab tests"
        title="Compare tests and packages before you book"
        lede="Search diagnostic labs near you, compare prices and turnaround times, and book a sample-collection or visit slot — results come back as a verified report."
      >
        <div className="find-doctors__search">
          <Icon name="search" size={18} />
          <input
            placeholder="Search tests or labs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </PageHero>

      <div className="container find-doctors__body">
        <div className="find-doctors__toolbar">
          <p className="find-doctors__count">{results.length} tests found</p>
          <div className="find-doctors__sort">
            <label htmlFor="sort">Sort by</label>
            <select id="sort" className="select" value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
              <option value="rating">Highest rated lab</option>
              <option value="price">Lowest price</option>
            </select>
            {query && (
              <button className="btn btn-text btn-sm" onClick={clearFilters}>
                Clear filters
              </button>
            )}
          </div>
        </div>

        {results.length > 0 ? (
          <div className="find-doctors__grid">
            {results.map((t) => (
              <LabTestCard item={t} key={t.id} onBook={setSelected} />
            ))}
          </div>
        ) : (
          <div className="find-doctors__empty">
            <Icon name="search" size={30} />
            <p>No tests match that search yet.</p>
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
              This is a product preview of LocDoc's test-booking flow for{" "}
              <strong>{selected.name}</strong> at <strong>{selected.lab}</strong>.
            </p>
            <p className="body-text mt-16">
              Live slot booking and verified report delivery go live once labs complete
              onboarding. For now, log in to be notified when this lab comes online.
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
