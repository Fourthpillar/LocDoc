import Icon from "./Icon.jsx";
import "./LabTestCard.css";

export default function LabTestCard({ item, onBook }) {
  return (
    <div className="labtest-card card card--hover">
      <div className="labtest-card__head">
        <p className="labtest-card__name">{item.name}</p>
        <span className="badge badge-brand">
          <Icon name="clock" size={12} /> {item.turnaround}
        </span>
      </div>

      <div className="labtest-card__meta">
        <span>
          <Icon name="flask" size={14} /> {item.lab}
        </span>
        <span>
          <Icon name="map-pin" size={14} /> {item.area}
        </span>
      </div>

      <div className="labtest-card__tags">
        <span className="badge">{item.sampleType} sample</span>
        {item.fasting && <span className="badge badge-warning">Fasting required</span>}
      </div>

      <div className="labtest-card__row">
        <span className="labtest-card__rating">
          <Icon name="star" size={13} filled />
          {item.rating} <em>({item.reviews})</em>
        </span>
      </div>

      <div className="labtest-card__footer">
        <div>
          <p className="labtest-card__price-label">Price</p>
          <p className="labtest-card__price">₹{item.price}</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => onBook?.(item)}>
          Book test
        </button>
      </div>
    </div>
  );
}
