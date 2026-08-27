import Icon from "../Icon.jsx";
import "./FacilityReviews.css";

const rowA = [
  {
    quote: "Our no-show rate dropped from 22% to 6% in the first six weeks. The confirm-or-release nudge alone paid for the platform.",
    author: "Dr. Rukmini Rao",
    role: "Founder · Harmony Women's Care",
    initials: "RR",
    kind: "clinic",
  },
  {
    quote: "For the first time, patients arrive knowing exactly how late I am. Nobody's angry at the front desk — they got a message twelve minutes ago.",
    author: "Dr. Karthik Menon",
    role: "Cardiologist · Trinity Heart Institute",
    initials: "KM",
    kind: "doctor",
  },
  {
    quote: "The pharmacy stock module cut phantom listings to zero. Customers stopped calling to ask 'do you actually have it?'",
    author: "Vinay Kulkarni",
    role: "Owner · MediPlus Pharmacy",
    initials: "VK",
    kind: "pharmacy",
  },
  {
    quote: "Getting NMC-verified inside LocDoc took ninety seconds. That badge on my profile has changed how new patients trust me.",
    author: "Dr. Anjali Rao",
    role: "Gynaecologist · Jubilee Hills",
    initials: "AR",
    kind: "doctor",
  },
];

const rowB = [
  {
    quote: "The dashboard shows waitlist backfill in real time — three slots recovered a day is real revenue, not a vanity metric.",
    author: "Nisha Bansal",
    role: "COO · Cityscape Children's Hospital",
    initials: "NB",
    kind: "clinic",
  },
  {
    quote: "We turned on Labs last month with no engineering effort. Sample-collection bookings started flowing from day one.",
    author: "Sameer Iyer",
    role: "Ops Lead · Bluewave Diagnostics",
    initials: "SI",
    kind: "lab",
  },
  {
    quote: "Onboarding felt like verifying a bank account, not filling a Google form. That's the kind of seriousness we needed.",
    author: "Dr. Farhan Ahmed",
    role: "General Physician · Kondapur",
    initials: "FA",
    kind: "doctor",
  },
  {
    quote: "Our SMS delay alerts have replaced a full-time receptionist call queue. Patients still show up — just at the right time.",
    author: "Meera Suri",
    role: "Admin Head · Sunrise Multispecialty",
    initials: "MS",
    kind: "clinic",
  },
];

const kindLabel = {
  clinic: "Hospital / Clinic",
  doctor: "Doctor",
  pharmacy: "Pharmacy",
  lab: "Lab & Diagnostics",
};

function Card({ q }) {
  return (
    <figure className="fr__card">
      <blockquote>
        <Icon name="quote" size={16} />
        <p>{q.quote}</p>
      </blockquote>
      <figcaption>
        <span className="fr__avatar">{q.initials}</span>
        <div>
          <strong>{q.author}</strong>
          <em>{q.role}</em>
        </div>
        <span className="fr__tag">{kindLabel[q.kind]}</span>
      </figcaption>
    </figure>
  );
}

export default function FacilityReviews() {
  const trackA = [...rowA, ...rowA];
  const trackB = [...rowB, ...rowB];

  return (
    <section className="fr section--tight">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">
            <span className="dot" />
            What partners say
          </div>
          <h2 className="h2">Trusted by clinics, pharmacies and labs across Hyderabad.</h2>
        </div>
      </div>

      <div className="fr__wall" aria-label="Partner testimonials">
        <div className="fr__row fr__row--left">
          <div className="fr__track">
            {trackA.map((q, i) => <Card q={q} key={`a-${i}`} />)}
          </div>
        </div>
        <div className="fr__row fr__row--right">
          <div className="fr__track">
            {trackB.map((q, i) => <Card q={q} key={`b-${i}`} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
