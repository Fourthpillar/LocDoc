import { Link } from "react-router-dom";
import Icon from "../Icon.jsx";
import "./CtaBanner.css";

export default function CtaBanner() {
  return (
    <section className="cta-banner section section--tight">
      <div className="container">
        <div className="cta-banner__inner reveal">
          <div className="cta-banner__glow" aria-hidden="true" />
          <div className="cta-banner__content">
            <h2 className="h2">Ready to end appointment ghosting?</h2>
            <p className="lede mt-16">
              Whether you run a facility, practise medicine, or just want a doctor's word to mean
              something — LocDoc is built for you.
            </p>
            <div className="cta-banner__actions mt-32">
              <Link to="/register/hospital" className="btn btn-primary btn-lg">
                List your facility
                <Icon name="arrow-right" size={17} />
              </Link>
              <Link to="/login?role=patient&intent=signup" className="btn btn-ghost btn-lg">
                Create your account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
