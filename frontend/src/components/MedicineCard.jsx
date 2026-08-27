import Icon from "./Icon.jsx";
import "./MedicineCard.css";

export default function MedicineCard({ item, onReserve }) {
  return (
    <div className="medicine-card card card--hover">
      <div className="medicine-card__head">
        <div>
          <p className="medicine-card__name">{item.name}</p>
          <p className="medicine-card__form">{item.form} · {item.manufacturer}</p>
        </div>
        <span className={`badge ${item.inStock ? "badge-success" : "badge-danger"}`}>
          <Icon name={item.inStock ? "check-circle" : "close"} size={12} />
          {item.inStock ? "In stock" : "Out of stock"}
        </span>
      </div>

      <div className="medicine-card__meta">
        <span>
          <Icon name="storefront" size={14} /> {item.pharmacy}
        </span>
        <span>
          <Icon name="map-pin" size={14} /> {item.area}
        </span>
      </div>

      <div className="medicine-card__row">
        <span className="medicine-card__rating">
          <Icon name="star" size={13} filled />
          {item.rating} <em>({item.reviews})</em>
        </span>
        <span className="medicine-card__updated">
          <Icon name="clock" size={12} /> Updated {item.lastUpdated}
        </span>
      </div>

      <div className="medicine-card__footer">
        <div>
          <p className="medicine-card__price-label">Price</p>
          <p className="medicine-card__price">₹{item.price}</p>
        </div>
        <button
          className="btn btn-primary btn-sm"
          disabled={!item.inStock}
          onClick={() => onReserve?.(item)}
        >
          {item.inStock ? "Reserve" : "Notify me"}
        </button>
      </div>
    </div>
  );
}
