import Icon from "./Icon.jsx";
import "./HowItWorks.css";

const steps = [
  {
    icon: "search",
    title: "Search & book",
    desc: "Find doctors by specialty, clinic or location, and book a slot in a few taps — no login wall to browse.",
  },
  {
    icon: "radar",
    title: "See real status",
    desc: "Your appointment screen shows live doctor status, not a static time — Available, In Transit, In Rounds.",
  },
  {
    icon: "bell",
    title: "Confirm or reschedule",
    desc: "Get a nudge at T-24h and T-2h. If your doctor runs late, you get options — not silence.",
  },
  {
    icon: "check-circle",
    title: "Walk in with confidence",
    desc: "Show up knowing the wait is real, or shift on your terms. Non-app patients get the same by SMS/WhatsApp.",
  },
];

export default function HowItWorks() {
  return (
    <section className="how section section--tight" id="how-it-works">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">
            <span className="dot" />
            How it works
          </div>
          <h2 className="h2">From search to seen — without the guesswork.</h2>
        </div>

        <div className="how__grid reveal">
          {steps.map((s, i) => (
            <div className="how__step" key={s.title}>
              <span className="how__num">{String(i + 1).padStart(2, "0")}</span>
              <div className="how__icon">
                <Icon name={s.icon} size={20} />
              </div>
              <h3 className="h3">{s.title}</h3>
              <p className="body-text mt-8">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
