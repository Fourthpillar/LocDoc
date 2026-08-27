# LocDoc — Product Website PRD

## Original problem statement
> Study the project and build a new UI which should be elegant, end-user captivating and it should tell what the web application is for, and should feel trustworthy. Don't change any tech stack or build services — just build the web pages, and don't change folder structure.

## Product summary (grounded in codebase README + page copy)
LocDoc is a marketing/product website for a SaaS healthcare platform designed to end **"appointment ghosting."** Core promise: *"the time you're given is the time that happens."*

**Core capabilities**
- Live doctor tracking with automatic rescheduling and delay alerts
- Verified doctor registry (NMC · ABDM NMR · state medical councils)
- Nearby marketplace: doctors, medicines (real-time stock), lab tests
- Facility onboarding: hospitals & clinics, pharmacies, labs, doctors
- Works over SMS / WhatsApp — an app is an upgrade, never a requirement

**Personas**: Users (patients — never labelled "patient" in UI), Doctors, Hospitals/Clinics (Platform Admin), Pharmacies, Labs & Diagnostics.

## Redesign — "Fresh Care" system (Jan 2026)
- **Style pillars**: Health-brand friendly (Practo/Apollo/Zocdoc vibe) × Startup-crisp (Stripe/Linear) × Playful & rounded — light-first, warm, one accent color.
- **Typography**: Plus Jakarta Sans (display + body) + JetBrains Mono (small labels only).
- **Palette (light default)**: Warm off-white `#f7f7f5` base · deep navy-ink text `#0f1b2c` · **Trust Blue `#2563eb`** primary · Warm Teal `#0891b2` secondary accent · soft blue `#dbeafe` chips · subtle blue ambient blob at page-top.
- **Palette (dark)**: Navy-slate `#0e1420` base · light-blue `#60a5fa` primary · electric cyan `#22d3ee` secondary.
- **Shape language**: Rounded (radii 10–32 px, pills everywhere), generous whitespace, big rounded search card, floating trust badges.

## What's been implemented (Jan 2026)
- ✅ Redesigned `index.html` (fonts, meta, description).
- ✅ Rebuilt `styles/global.css` — new design tokens, buttons, cards, forms, eyebrow chips, ambient blob, focus states.
- ✅ Rewrote `components/home/Hero.jsx` + `Hero.css` — big rounded search card with 3 tabs (Doctors / Medicines / Lab tests), Hyderabad location chip, trust-chip row (NMC · ABDM · Live · 12+ cities), floating "SMS alert" + "4.9 rating" badges, animated appointment mock with soft gradient status and big ETA number.
- ✅ Rewrote `components/Navbar.css` — cleaner rounded nav, pill dropdowns, brand-mark with soft blue glow, warm theme toggle.
- ✅ All existing per-component CSS (SpecialtiesGrid, TopClinics, DoctorCard, DoctorVerification, RegisterBusiness, CtaBanner, Auth, About, FindDoctors, RegisterForm, Footer) picks up the new tokens automatically.
- ✅ Light-first default (`ThemeContext` initial value = "light"). Dark theme retained and works via toggle.
- ✅ Existing routes untouched (`/`, `/doctors`, `/medicines`, `/lab-tests`, `/register/{hospital|pharmacy|labs|doctor}`, `/login`, `/about`, 404).
- ✅ No tech-stack changes (React 19 + Vite + react-router-dom preserved).
- ✅ Folder structure untouched.
- ✅ "Patient" label rule respected (used only as an auth role internally; not surfaced as marketing copy).

### Follow-up enhancements (Jan 2026, second pass)
- ✅ **Trust Metrics Band** (`components/home/TrustMetrics.jsx` + `.css`) — live-styled stats row inserted between the Hero and Service Pillars on Home. Four metrics (Appointments tracked, Cities live, Verified doctors, On-time rate) with count-up animation triggered by IntersectionObserver, alternating blue/teal accents, live pulse caption.
- ✅ **Distinct page-hero illustrations** (`components/PageHero.jsx` + `.css`) — inline SVG art per search variant: `doctors` (doctor card, stethoscope, verified shield), `medicines` (pill bottle, tilted capsule, in-stock chip, floating pills), `labs` (report card with pass/pending rows, flask with gradient liquid, "Report in 6 h" chip). Wired into `pages/FindDoctors.jsx`, `pages/Medicines.jsx`, `pages/LabTests.jsx`. Each page now has a unique first impression.
- ✅ **Animated How It Works diagram** (`components/HowItWorks.jsx` + `.css` rewritten) — horizontal step rail with a gradient fill line and a pulsing marker that auto-walks through the 4 steps every 2.4 s when the section is in the viewport; active node lifts, colours in brand, hover/focus lets user drive the animation. Falls back to a vertical timeline on mobile.

## Verified pages (via screenshots)
Home hero · Home services · Home specialties · Home clinics · Home verification · Home register · Doctors listing · Login · Register facility · About.

## Not built (out of scope of this task)
- Any backend or persistence.
- Real registry look-ups (kept as product previews).

## Prioritized backlog
- **P1** – Add subtle hero illustration/graphic for the medicines & lab-tests search pages so they don't feel identical to the doctors page.
- **P1** – Polish the About "The LocDoc Engine" and "How It Works" sections with a lightweight step-by-step visualisation.
- **P2** – Add a small trust-metrics band ("X appointments tracked this week / Y cities live") between hero and specialties.
- **P2** – Persona-specific dashboards preview (screenshots of doctor / clinic / pharmacy admin UI mocks).
- **P3** – Onboarding checklist visual for the facility register success page.
