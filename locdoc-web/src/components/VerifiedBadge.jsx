import "./VerifiedBadge.css";
import Icon from "./Icon";

export default function VerifiedBadge({ source = "NMC", size = "md" }) {
  return (
    <span className={`verified-badge verified-badge--${size}`} title={`Verified via ${source}`}>
      <Icon name="badge-check" size={size === "sm" ? 14 : 16} strokeWidth={2} filled />
      <span className="verified-badge__label">Verified</span>
    </span>
  );
}
