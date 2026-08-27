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
