import Icon from "./Icon.jsx";
import VerifiedBadge from "./VerifiedBadge.jsx";
import "./DoctorCard.css";

const punctualityTone = {
  "Usually on time": "success",
  "Rarely delayed": "success",
  "Sometimes delayed": "warning",
};

export default function DoctorCard({ doctor, onBook }) {
  const initials = doctor.name
    .replace("Dr. ", "")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="doctor-card card card--hover">
      <div className="doctor-card__head">
        <span className="doctor-card__avatar">{initials}</span>
        <div className="doctor-card__id">
          <p className="doctor-card__name">
            {doctor.name} <VerifiedBadge source={doctor.verifiedVia} size="sm" />
          </p>
          <p className="doctor-card__specialty">{doctor.specialty}</p>
          <p className="doctor-card__qual">{doctor.qualifications} · {doctor.experience} yrs exp.</p>
        </div>
      </div>

      <div className="doctor-card__meta">
        <span>
          <Icon name="building" size={14} /> {doctor.facility}
        </span>
        <span>
          <Icon name="map-pin" size={14} /> {doctor.area}
        </span>
      </div>

      <div className="doctor-card__row">
        <span className="doctor-card__rating">
          <Icon name="star" size={13} filled />
          {doctor.rating} <em>({doctor.reviews})</em>
        </span>
        <span className={`badge badge-${punctualityTone[doctor.punctuality] || "brand"}`}>
          <Icon name="clock" size={12} /> {doctor.punctuality}
        </span>
      </div>

      <div className="doctor-card__footer">
        <div>
          <p className="doctor-card__fee-label">Consultation fee</p>
          <p className="doctor-card__fee">₹{doctor.fee}</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => onBook?.(doctor)}>
          Book visit
        </button>
      </div>
    </div>
  );
}
