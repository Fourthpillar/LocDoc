import "./PageHero.css";

/* SVG illustrations dedicated to each search page.
   Kept inline & abstract — no photos, all built from geometric primitives + our brand tokens. */

function DoctorsArt() {
  return (
    <svg viewBox="0 0 320 240" className="page-hero__art" aria-hidden="true">
      <defs>
        <linearGradient id="doc-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--primary-soft)" />
          <stop offset="1" stopColor="var(--accent-soft)" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="320" height="240" rx="24" fill="url(#doc-bg)" />
      {/* doctor card */}
      <g transform="translate(30,32)">
        <rect x="0" y="0" width="180" height="128" rx="20" fill="var(--surface)" stroke="var(--border)" />
        <circle cx="28" cy="28" r="16" fill="var(--primary)" />
        <rect x="52" y="18" width="90" height="8" rx="4" fill="var(--text)" opacity="0.85" />
        <rect x="52" y="32" width="60" height="6" rx="3" fill="var(--text-muted)" opacity="0.6" />
        <rect x="16" y="58" width="148" height="4" rx="2" fill="var(--border-strong)" />
        <rect x="16" y="70" width="120" height="4" rx="2" fill="var(--border)" />
        <rect x="16" y="82" width="90" height="4" rx="2" fill="var(--border)" />
        <rect x="16" y="102" width="60" height="16" rx="8" fill="var(--primary)" />
        <rect x="86" y="102" width="60" height="16" rx="8" fill="var(--surface-2)" stroke="var(--border)" />
      </g>
      {/* live pulse chip */}
      <g transform="translate(212,44)">
        <rect x="0" y="0" width="82" height="26" rx="13" fill="var(--surface)" stroke="var(--border)" />
        <circle cx="14" cy="13" r="4" fill="var(--primary)" />
        <text x="26" y="17" fontSize="10" fontWeight="700" fill="var(--primary-2)" fontFamily="Plus Jakarta Sans, sans-serif">
          On time
        </text>
      </g>
      {/* verified badge */}
      <g transform="translate(220,110)">
        <rect x="0" y="0" width="70" height="70" rx="18" fill="var(--surface)" stroke="var(--border)" />
        <path d="M35 12 L52 22 V38 C52 50 43 58 35 60 C27 58 18 50 18 38 V22 Z"
              fill="var(--primary-soft)" stroke="var(--primary)" strokeWidth="1.6" />
        <path d="M27 36 l6 6 l12 -12" fill="none" stroke="var(--primary-2)" strokeWidth="2.4"
              strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* stethoscope motif */}
      <g transform="translate(38,180)" opacity="0.85">
        <circle cx="0" cy="0" r="10" fill="none" stroke="var(--primary-2)" strokeWidth="2" />
        <path d="M0,-10 v-20 c0,-8 -8,-14 -18,-14 M0,-10 v-20 c0,-8 8,-14 18,-14"
              fill="none" stroke="var(--primary-2)" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function MedicinesArt() {
  return (
    <svg viewBox="0 0 320 240" className="page-hero__art" aria-hidden="true">
      <defs>
        <linearGradient id="med-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--accent-soft)" />
          <stop offset="1" stopColor="var(--primary-soft)" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="320" height="240" rx="24" fill="url(#med-bg)" />

      {/* Pill bottle */}
      <g transform="translate(38,54)">
        <rect x="0" y="0" width="86" height="26" rx="8" fill="var(--surface)" stroke="var(--border)" />
        <rect x="6" y="26" width="74" height="110" rx="14" fill="var(--surface)" stroke="var(--border)" />
        <rect x="16" y="56" width="54" height="6" rx="3" fill="var(--text)" opacity="0.85" />
        <rect x="16" y="70" width="36" height="4" rx="2" fill="var(--text-muted)" opacity="0.6" />
        <rect x="16" y="100" width="54" height="24" rx="12" fill="var(--accent-soft)" />
        <text x="43" y="117" fontSize="11" fontWeight="700" fill="var(--accent)" textAnchor="middle"
              fontFamily="Plus Jakarta Sans, sans-serif">In stock</text>
      </g>

      {/* Capsule */}
      <g transform="translate(148,66) rotate(-24)">
        <rect x="0" y="0" width="120" height="42" rx="21" fill="var(--surface)" stroke="var(--border)" />
        <rect x="0" y="0" width="60" height="42" rx="21" fill="var(--primary)" />
        <rect x="0" y="0" width="60" height="42" rx="21" fill="var(--primary)" opacity="0.05" />
        <circle cx="14" cy="13" r="3" fill="var(--surface)" opacity="0.6" />
        <circle cx="22" cy="26" r="2" fill="var(--surface)" opacity="0.5" />
      </g>

      {/* Location + stock badge */}
      <g transform="translate(196,140)">
        <rect x="0" y="0" width="94" height="30" rx="15" fill="var(--surface)" stroke="var(--border)" />
        <path d="M14 8 c-4 0 -7 3 -7 7 c0 6 7 10 7 10 s7 -4 7 -10 c0 -4 -3 -7 -7 -7 z m0 5 a2 2 0 1 1 0 4 a2 2 0 1 1 0 -4 z"
              fill="var(--accent)" />
        <text x="28" y="20" fontSize="10.5" fontWeight="700" fill="var(--text)"
              fontFamily="Plus Jakarta Sans, sans-serif">0.4 km · 128 items</text>
      </g>

      {/* small pills */}
      <g>
        <circle cx="42" cy="200" r="8" fill="var(--primary)" opacity="0.85" />
        <circle cx="66" cy="212" r="5" fill="var(--accent)" opacity="0.85" />
        <circle cx="88" cy="196" r="4" fill="var(--primary-2)" opacity="0.6" />
      </g>
      <g transform="translate(266,32)">
        <circle cx="0" cy="0" r="10" fill="var(--accent)" opacity="0.9" />
        <circle cx="20" cy="14" r="5" fill="var(--primary)" opacity="0.8" />
      </g>
    </svg>
  );
}

function LabsArt() {
  return (
    <svg viewBox="0 0 320 240" className="page-hero__art" aria-hidden="true">
      <defs>
        <linearGradient id="lab-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--primary-soft)" />
          <stop offset="1" stopColor="var(--surface-2)" />
        </linearGradient>
        <linearGradient id="lab-liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--primary)" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="320" height="240" rx="24" fill="url(#lab-bg)" />

      {/* Report card */}
      <g transform="translate(28,32)">
        <rect x="0" y="0" width="170" height="176" rx="18" fill="var(--surface)" stroke="var(--border)" />
        <rect x="16" y="16" width="90" height="8" rx="4" fill="var(--text)" opacity="0.85" />
        <rect x="16" y="30" width="60" height="6" rx="3" fill="var(--text-muted)" opacity="0.6" />
        {/* pass row */}
        <rect x="16" y="52" width="138" height="26" rx="8" fill="var(--primary-soft)" />
        <circle cx="30" cy="65" r="6" fill="var(--primary)" />
        <path d="M27 65 l3 3 l6 -6" stroke="var(--surface)" strokeWidth="1.8" fill="none"
              strokeLinecap="round" strokeLinejoin="round" />
        <text x="44" y="69" fontSize="10" fontWeight="700" fill="var(--primary-2)"
              fontFamily="Plus Jakarta Sans, sans-serif">Haemoglobin · 14.2 g/dL</text>

        <rect x="16" y="86" width="138" height="26" rx="8" fill="var(--accent-soft)" />
        <circle cx="30" cy="99" r="6" fill="var(--accent)" />
        <path d="M27 99 l3 3 l6 -6" stroke="var(--surface)" strokeWidth="1.8" fill="none"
              strokeLinecap="round" strokeLinejoin="round" />
        <text x="44" y="103" fontSize="10" fontWeight="700" fill="var(--accent)"
              fontFamily="Plus Jakarta Sans, sans-serif">Vitamin D · 32 ng/mL</text>

        <rect x="16" y="120" width="138" height="26" rx="8" fill="var(--surface-2)" stroke="var(--border)" />
        <circle cx="30" cy="133" r="6" fill="var(--border-strong)" />
        <text x="44" y="137" fontSize="10" fontWeight="700" fill="var(--text-muted)"
              fontFamily="Plus Jakarta Sans, sans-serif">Awaiting sample</text>

        <rect x="16" y="156" width="70" height="8" rx="4" fill="var(--border-strong)" />
      </g>

      {/* Flask / test tube */}
      <g transform="translate(216,44)">
        <path d="M22 0 h20 v22 l20 46 c4 10 -3 22 -14 22 h-32 c-11 0 -18 -12 -14 -22 l20 -46 z"
              fill="var(--surface)" stroke="var(--border)" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M12 62 l40 0 l14 30 c2 6 -2 10 -8 10 h-52 c-6 0 -10 -4 -8 -10 z"
              fill="url(#lab-liquid)" />
        <circle cx="22" cy="82" r="2.5" fill="var(--surface)" opacity="0.7" />
        <circle cx="42" cy="76" r="1.6" fill="var(--surface)" opacity="0.7" />
        <rect x="18" y="0" width="28" height="6" rx="3" fill="var(--border-strong)" />
      </g>

      {/* Turnaround chip */}
      <g transform="translate(210,168)">
        <rect x="0" y="0" width="94" height="30" rx="15" fill="var(--surface)" stroke="var(--border)" />
        <circle cx="16" cy="15" r="7" fill="none" stroke="var(--primary-2)" strokeWidth="1.6" />
        <path d="M16 11 v4 l3 2" stroke="var(--primary-2)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <text x="30" y="19" fontSize="10.5" fontWeight="700" fill="var(--text)"
              fontFamily="Plus Jakarta Sans, sans-serif">Report in 6 h</text>
      </g>
    </svg>
  );
}

const ART = { doctors: DoctorsArt, medicines: MedicinesArt, labs: LabsArt };

export default function PageHero({ variant = "doctors", eyebrow, title, lede, children }) {
  const Art = ART[variant] || DoctorsArt;
  return (
    <div className={`page-hero page-hero--${variant}`}>
      <div className="container page-hero__grid">
        <div className="page-hero__copy">
          {eyebrow && (
            <div className="eyebrow">
              <span className="dot" />
              {eyebrow}
            </div>
          )}
          {title && <h1 className="h2 page-hero__title">{title}</h1>}
          {lede && <p className="lede mt-16 page-hero__lede">{lede}</p>}
          {children && <div className="page-hero__extra">{children}</div>}
        </div>
        <div className="page-hero__visual">
          <Art />
        </div>
      </div>
    </div>
  );
}
