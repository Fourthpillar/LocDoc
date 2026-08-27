# LocDoc — Product Website

A single-page marketing/product site for **LocDoc**, a local-healthcare platform built to end
appointment ghosting. Built with **React 19 + Vite**, client-side routing via `react-router-dom`,
and hand-written CSS (no UI framework). There is no backend — every form (facility registration,
doctor verification, login/signup) is a working client-side demo that clearly labels itself as a
preview.

## Content source

Copy, modules, personas, metrics and compliance details are grounded in `D:\LockDoc\LocDoc_PRD.docx`
(Sections 1–12). Internal-only sections (Open Questions, Risks) were intentionally left out of the
public site.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run lint     # oxlint
```

## Structure

- `src/pages/` — routed pages: Home, FindDoctors, RegisterFacility (hospital/pharmacy/labs),
  RegisterDoctor, Login, Signup, About.
- `src/components/home/` — homepage-only sections (Hero, Ghosting USP, How it works, Modules,
  Register CTA, final CTA banner).
- `src/components/` — shared UI (Navbar, Footer, DoctorCard, SpecialtiesGrid, TopClinics,
  VerifiedBadge, Icon, Modal, OtpFlow).
- `src/data/` — static content (specialties, mock doctors/clinics, modules, team, metrics,
  registration type config).
- `src/context/ThemeContext.jsx` — light/dark theme, persisted to `localStorage`, defaults to the
  OS preference.
- `src/styles/global.css` — design tokens (light + dark), reset, layout & component utilities.

## Notes

- Doctor verification (NMC / ABDM NMR / state council) and facility onboarding are simulated —
  no real registry lookups or emails are sent.
- "Patient" is intentionally never used as a UI label for sign-up/login, per product direction.
