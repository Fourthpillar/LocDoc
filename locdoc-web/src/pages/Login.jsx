import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import OtpFlow from "../components/OtpFlow.jsx";
import EmailLoginForm from "../components/EmailLoginForm.jsx";
import { authRoles } from "../data/authRoles.js";
import "./Auth.css";

const methodLabels = { mobile: "Mobile number", email: "Email" };

export default function Login() {
  const [params, setParams] = useSearchParams();
  const roleKey = authRoles.some((r) => r.key === params.get("role")) ? params.get("role") : "patient";
  const role = authRoles.find((r) => r.key === roleKey);
  const [method, setMethod] = useState(role.methods[0]);

  // Patients are the one role where "log in" and "create an account" are
  // truly the same mobile+OTP flow — this just controls how the page
  // presents itself, so arriving via "Create your account" doesn't look
  // like it silently redirected you to a login screen.
  const isSignup = roleKey === "patient" && params.get("intent") === "signup";

  useEffect(() => {
    document.title = isSignup ? "Sign up — LocDoc" : "Log in — LocDoc";
  }, [isSignup]);

  // Reset to the role's first available method whenever the role changes,
  // so switching from a facility (mobile or email) to patient/doctor
  // (mobile only) never leaves "email" selected with nothing to show.
  useEffect(() => {
    setMethod(role.methods[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleKey]);

  const otpDoneProps = useMemo(() => {
    if (roleKey === "doctor") {
      return {
        doneMessage: "In production you'd land straight in your schedule, live status and punctuality score.",
        doneCta: { to: "/", label: "Back to home" },
      };
    }
    return {
      doneMessage: "In production you'd land straight in your appointments and reservations, whether you were new or returning.",
      doneCta: { to: "/doctors", label: "Explore doctors near you" },
    };
  }, [roleKey]);

  function selectRole(key) {
    const next = new URLSearchParams(params);
    next.set("role", key);
    setParams(next, { replace: true });
  }

  return (
    <div className="auth-page">
      <div className="auth-page__panel">
        <Link to="/" className="nav__brand auth-page__brand">
          <span className="nav__brand-mark">
            <Icon name="map-pin" size={18} strokeWidth={2.2} />
          </span>
          LocDoc
        </Link>
        <h1 className="h2 mt-24">{isSignup ? "Create your account" : role.heading}</h1>
        <p className="lede mt-16">{role.lede}</p>
        <ul className="auth-page__points">
          {role.points.map((p) => (
            <li key={p.text}>
              <Icon name={p.icon} size={15} /> {p.text}
            </li>
          ))}
        </ul>
        {roleKey === "patient" && (
          <p className="auth-page__fineprint">
            Already registered by a clinic's front desk? Verifying the same number links your
            existing records automatically — no duplicate account.
          </p>
        )}

        {/* Illustrated confidence mock — same visual language as PageHero */}
        <div className="auth-art" aria-hidden="true">
          <svg viewBox="0 0 340 220" className="auth-art__svg">
            <defs>
              <linearGradient id="auth-bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="var(--primary-soft)" />
                <stop offset="1" stopColor="var(--accent-soft)" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="340" height="220" rx="26" fill="url(#auth-bg)" />

            {/* phone frame */}
            <g transform="translate(30,22)">
              <rect x="0" y="0" width="160" height="176" rx="22" fill="var(--surface)" stroke="var(--border)" />
              <rect x="60" y="10" width="40" height="5" rx="2.5" fill="var(--border-strong)" />
              <rect x="14" y="28" width="80" height="6" rx="3" fill="var(--text)" opacity="0.85" />
              <rect x="14" y="42" width="52" height="4" rx="2" fill="var(--text-muted)" opacity="0.55" />
              {/* live pulse row */}
              <rect x="14" y="60" width="132" height="34" rx="12" fill="var(--primary-soft)" />
              <circle cx="30" cy="77" r="5" fill="var(--primary)">
                <animate attributeName="r" values="4;6;4" dur="1.6s" repeatCount="indefinite" />
              </circle>
              <rect x="44" y="70" width="70" height="6" rx="3" fill="var(--primary-2)" opacity="0.85" />
              <rect x="44" y="82" width="46" height="4" rx="2" fill="var(--primary-2)" opacity="0.5" />
              {/* schedule rows */}
              <rect x="14" y="106" width="132" height="20" rx="10" fill="var(--surface-2)" stroke="var(--border)" />
              <rect x="24" y="114" width="60" height="4" rx="2" fill="var(--text)" opacity="0.7" />
              <rect x="112" y="114" width="24" height="4" rx="2" fill="var(--primary-2)" opacity="0.8" />
              <rect x="14" y="132" width="132" height="20" rx="10" fill="var(--surface-2)" stroke="var(--border)" />
              <rect x="24" y="140" width="52" height="4" rx="2" fill="var(--text)" opacity="0.7" />
              <rect x="104" y="140" width="32" height="4" rx="2" fill="var(--accent)" opacity="0.85" />
            </g>

            {/* Verified badge card */}
            <g transform="translate(210,32)">
              <rect x="0" y="0" width="112" height="60" rx="16" fill="var(--surface)" stroke="var(--border)" />
              <g transform="translate(14,12)">
                <path d="M18 0 L34 8 V22 C34 32 26 38 18 40 C10 38 2 32 2 22 V8 Z"
                      fill="var(--primary-soft)" stroke="var(--primary)" strokeWidth="1.5" />
                <path d="M11 22 l5 5 l10 -10" stroke="var(--primary-2)" strokeWidth="2.2"
                      fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <text x="60" y="26" fontSize="10" fontWeight="700" fill="var(--text)"
                    fontFamily="Plus Jakarta Sans, sans-serif">Verified</text>
              <text x="60" y="42" fontSize="9" fontWeight="600" fill="var(--text-muted)"
                    fontFamily="Plus Jakarta Sans, sans-serif">NMC · ABDM</text>
            </g>

            {/* SMS ping bubble */}
            <g transform="translate(210,110)">
              <rect x="0" y="0" width="112" height="56" rx="16" fill="var(--surface)" stroke="var(--border)" />
              <circle cx="18" cy="18" r="12" fill="var(--accent-soft)" />
              <path d="M12 15 h12 v9 h-6 l-4 4 v-4 h-2 z" fill="var(--accent)" />
              <text x="36" y="16" fontSize="9.5" fontWeight="700" fill="var(--text)"
                    fontFamily="Plus Jakarta Sans, sans-serif">SMS · WhatsApp</text>
              <text x="36" y="30" fontSize="9" fontWeight="500" fill="var(--text-muted)"
                    fontFamily="Plus Jakarta Sans, sans-serif">You'll get delay</text>
              <text x="36" y="42" fontSize="9" fontWeight="500" fill="var(--text-muted)"
                    fontFamily="Plus Jakarta Sans, sans-serif">alerts even without</text>
              <text x="36" y="52" fontSize="9" fontWeight="500" fill="var(--text-muted)"
                    fontFamily="Plus Jakarta Sans, sans-serif">the app.</text>
            </g>

            {/* Dotted connector */}
            <path d="M190 68 C 200 68 200 62 210 62"
                  fill="none" stroke="var(--primary)" strokeWidth="1.5"
                  strokeDasharray="2 4" opacity="0.55" />
            <path d="M190 138 C 200 138 200 138 210 138"
                  fill="none" stroke="var(--accent)" strokeWidth="1.5"
                  strokeDasharray="2 4" opacity="0.55" />
          </svg>
        </div>
      </div>

      <div className="auth-page__form">
        <div className="card auth-card">
          <div className="auth-roles" role="tablist" aria-label="Log in as">
            {authRoles.map((r) => (
              <button
                key={r.key}
                type="button"
                role="tab"
                aria-selected={r.key === roleKey}
                className={`auth-roles__tab ${r.key === roleKey ? "is-active" : ""}`}
                onClick={() => selectRole(r.key)}
              >
                <Icon name={r.icon} size={14} />
                {r.label}
              </button>
            ))}
          </div>

          <h2 className="h3 mt-24">{isSignup ? "Create your account" : "Log in"}</h2>
          <p className="body-text mt-8">
            {isSignup
              ? "Enter your number and we'll text you a one-time code to get started."
              : role.methods.length > 1
              ? "Log in with your mobile number or your work email."
              : "No password to remember — just your number."}
          </p>

          {role.methods.length > 1 && (
            <div className="auth-method">
              {role.methods.map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`auth-method__tab ${method === m ? "is-active" : ""}`}
                  onClick={() => setMethod(m)}
                >
                  {methodLabels[m]}
                </button>
              ))}
            </div>
          )}

          <div className="mt-24">
            {method === "email" ? (
              <EmailLoginForm roleLabel={role.label} />
            ) : (
              <OtpFlow key={roleKey} {...otpDoneProps} />
            )}
          </div>

          {roleKey === "patient" && (
            <p className="auth-card__switch">
              {isSignup ? (
                <>
                  Already have an account? <Link to="/login?role=patient">Log in</Link>
                </>
              ) : (
                <>
                  New to LocDoc? <Link to="/login?role=patient&intent=signup">Create an account</Link>
                </>
              )}
            </p>
          )}

          {role.registerLink && (
            <p className="auth-card__switch">
              <Link to={role.registerLink.to}>{role.registerLink.label} →</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
