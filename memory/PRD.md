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

### Follow-up enhancements (Jan 2026, third pass)
- ✅ **Login Illustration** (`pages/Login.jsx` + `pages/Auth.css`) — Illustrated split-panel matching PageHero art: phone-card mock with animated live-pulse row and schedule slots, plus two floating badges (Verified · NMC · ABDM shield card, SMS · WhatsApp delay-alert bubble) connected via dotted brand lines. Sits under the copy points on the left panel.
- ✅ **Live Waitlist Widget** (`components/home/LiveWaitlist.jsx` + `.css`) — "You'd be N people behind" headline that rotates through 4 real-looking clinics every 3.6 s (auto-pauses on hover). Right side is a live queue card with #-badges, doctor/specialty/clinic rows, and colour-coded status pills (On time · In transit · Delayed · Ready now). Inserted between ServicePillars and SpecialtiesGrid.
- ✅ **Facility Screenshot Preview** (`components/home/FacilityPreview.jsx` + `.css`) — Full "Platform Admin" console mock in a browser chrome (URL bar, Streaming indicator), with LocDoc Admin sidebar (facility name verified, Live queue / Appointments / Doctors / Pharmacy / Labs / Notifications), and a main pane showing today's live queue title, 94% on-time pill, 3 KPI cards (In queue / Delay alerts sent / Waitlist backfill), and a 4-doctor roster with coloured status pills and slot text. Sits between DoctorVerification and RegisterBusiness on Home.

### Follow-up enhancements (Jan 2026, fourth pass)
- ✅ **Onboarding Progress Tracker** (`components/OnboardingTracker.jsx` + `.css`) — Auto-advancing vertical stepper wired into both `pages/RegisterFacility.jsx` and `pages/RegisterDoctor.jsx` success screens. Steps go through `Submitted → Verifying → Credentials sent / Badge live`, with a pulsing brand-glow ring on the current node, animated spinner dots, per-state pills (Done / Running / Queued), a filling gradient rail between nodes, and copy that dynamically references the submitted facility name, registration council and email.
- ✅ **Facility Reviews Wall** (`components/home/FacilityReviews.jsx` + `.css`) — Dual-row scrolling testimonial wall (opposite directions, pauses on hover) with 8 real-sounding partner quotes across clinics, pharmacies, labs and doctors. Each card has an avatar, name + role, and a color-coded role tag. Inserted directly below the FacilityPreview mock on Home. Also added a new `quote` icon glyph to `Icon.jsx`.
- ✅ **Doctor Detail Page** (`pages/DoctorDetail.jsx` + `.css`) — New route `/doctors/:id`:
  - Hero with large gradient avatar, verified badge, specialty / qualifications / experience, facility, area and rating chips, and a sticky booking side-panel showing fee, punctuality with rolling 7-day % (pulse dot), and a "Book a visit" CTA.
  - **Punctuality history** section with a 14-day bar chart (color-coded on-time bands), 7-day average, and a legend.
  - **Registration checks** card (NMC · ABDM NMR · state council) plus a languages pane.
  - **Next available slots** across three days with NEXT 2H / POPULAR tags — clicking any slot opens the booking modal.
  - **Booking flow preview** as a 4-step card (Pick a slot → Confirm details → SMS + WhatsApp → Walk in on time).
  - Booking modal uses the shared `OnboardingTracker` component to run through Slot held → Sending OTP → Confirmed live.
- ✅ **DoctorCard link-through** — `components/DoctorCard.jsx` now wraps the avatar/name in a `Link` to `/doctors/:id` and adds a secondary "View profile" ghost button alongside "Book visit".
- ✅ **Icon additions** — Added `arrow-left`, `user` and `quote` glyphs to `components/Icon.jsx`.

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
