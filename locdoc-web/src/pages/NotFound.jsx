import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";

export default function NotFound() {
  return (
    <div className="section" style={{ textAlign: "center", padding: "140px 20px" }}>
      <div className="eyebrow" style={{ margin: "0 auto 18px" }}>
        <span className="dot" />
        404
      </div>
      <h1 className="h2">This page went for a walk-in.</h1>
      <p className="lede mt-16">We couldn't find what you were looking for.</p>
      <Link to="/" className="btn btn-primary mt-32">
        <Icon name="arrow-right" size={16} />
        Back to home
      </Link>
    </div>
  );
}
