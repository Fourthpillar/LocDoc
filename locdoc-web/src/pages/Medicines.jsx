import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import MedicineCard from "../components/MedicineCard.jsx";
import Modal from "../components/Modal.jsx";
import PageHero from "../components/PageHero.jsx";
import { medicines } from "../data/medicines.js";
import "./FindDoctors.css";

const sorters = {
  price: (a, b) => a.price - b.price,
  rating: (a, b) => b.rating - a.rating,
  stock: (a, b) => Number(b.inStock) - Number(a.inStock),
};

export default function Medicines() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortKey, setSortKey] = useState("stock");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    document.title = "Find Medicines Nearby — LocDoc";
  }, []);

  const results = useMemo(() => {
    let list = [...medicines];
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (m) => m.name.toLowerCase().includes(q) || m.pharmacy.toLowerCase().includes(q)
      );
    }
    if (inStockOnly) list = list.filter((m) => m.inStock);
    return list.sort(sorters[sortKey]);
  }, [query, inStockOnly, sortKey]);

  function clearFilters() {
    setParams({});
    setQuery("");
    setInStockOnly(false);
  }

  return (
    <div className="find-doctors">
      <PageHero
        variant="medicines"
        eyebrow="Find medicines"
        title="Check who actually has it in stock"
        lede="Search nearby pharmacies before you travel. Every listing shows a live-updated stock status, so you're not chasing a medicine that's already sold out."
      >
        <div className="find-doctors__search">
          <Icon name="search" size={18} />
          <input
            placeholder="Search medicines or pharmacies"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </PageHero>

      <div className="container find-doctors__body">
        <div className="find-doctors__chips">
          <button
            className={`chip ${!inStockOnly ? "chip--active" : ""}`}
            onClick={() => setInStockOnly(false)}
          >
            All listings
          </button>
          <button
            className={`chip ${inStockOnly ? "chip--active" : ""}`}
            onClick={() => setInStockOnly(true)}
          >
            In stock only
          </button>
        </div>

        <div className="find-doctors__toolbar">
          <p className="find-doctors__count">{results.length} results</p>
          <div className="find-doctors__sort">
            <label htmlFor="sort">Sort by</label>
            <select id="sort" className="select" value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
              <option value="stock">In stock first</option>
              <option value="price">Lowest price</option>
              <option value="rating">Highest rated pharmacy</option>
            </select>
            {(query || inStockOnly) && (
              <button className="btn btn-text btn-sm" onClick={clearFilters}>
                Clear filters
              </button>
            )}
          </div>
        </div>

        {results.length > 0 ? (
          <div className="find-doctors__grid">
            {results.map((m) => (
              <MedicineCard item={m} key={m.id} onReserve={setSelected} />
            ))}
          </div>
        ) : (
          <div className="find-doctors__empty">
            <Icon name="search" size={30} />
            <p>No medicines match those filters yet.</p>
            <button className="btn btn-ghost btn-sm" onClick={clearFilters}>
              Reset search
            </button>
          </div>
        )}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Reservation preview">
        {selected && (
          <div className="booking-preview">
            <p className="body-text">
              This is a product preview of LocDoc's reservation flow for{" "}
              <strong>{selected.name}</strong> at <strong>{selected.pharmacy}</strong>.
            </p>
            <p className="body-text mt-16">
              Live holds, expiry windows and pickup notifications go live once pharmacies
              complete onboarding. For now, log in to be notified when this store comes online.
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
