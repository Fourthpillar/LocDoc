import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";

export default function OtpFlow({
  doneMessage = "In production you'd land straight in your appointments and reservations, whether you were new or returning.",
  doneCta = { to: "/doctors", label: "Explore doctors near you" },
}) {
  const [step, setStep] = useState("phone"); // phone | otp | done
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [consent, setConsent] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (step === "otp") inputsRef.current[0]?.focus();
  }, [step]);

  function sendOtp(e) {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 700);
  }

  function updateOtp(i, val) {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 3) inputsRef.current[i + 1]?.focus();
  }

  function verifyOtp(e) {
    e.preventDefault();
    if (otp.join("").length < 4) {
      setError("Enter the 4-digit code.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("done");
    }, 700);
  }

  if (step === "done") {
    return (
      <div className="auth-done">
        <div className="auth-done__icon">
          <Icon name="check-circle" size={30} />
        </div>
        <h2 className="h3">Number verified</h2>
        <p className="body-text mt-8">
          This is a product preview of LocDoc's OTP flow — no account was actually created, since
          there's no backend behind this site yet. {doneMessage}
        </p>
        <Link to={doneCta.to} className="btn btn-primary btn-block mt-24">
          {doneCta.label}
        </Link>
      </div>
    );
  }

  if (step === "otp") {
    return (
      <form onSubmit={verifyOtp} className="auth-otp">
        <p className="body-text">
          Enter the 4-digit code sent to <strong>+91 {phone}</strong>
        </p>
        <div className="auth-otp__boxes">
          {otp.map((v, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              className="auth-otp__box"
              value={v}
              onChange={(e) => updateOtp(i, e.target.value)}
              inputMode="numeric"
              maxLength={1}
            />
          ))}
        </div>
        {error && <p className="auth-error">{error}</p>}
        <button className="btn btn-primary btn-block mt-16" disabled={loading}>
          {loading ? "Verifying…" : "Verify & continue"}
        </button>
        <button type="button" className="btn btn-text btn-block" onClick={() => setStep("phone")}>
          Change number
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={sendOtp} className="auth-phone">
      <div className="field">
        <label>Mobile number</label>
        <div className="auth-phone__input">
          <span>+91</span>
          <input
            className="input"
            required
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          />
        </div>
      </div>

      <label className="checkbox-row">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>Send me appointment &amp; delay alerts over SMS/WhatsApp. You can change this anytime.</span>
      </label>

      {error && <p className="auth-error">{error}</p>}

      <button className="btn btn-primary btn-block btn-lg mt-16" disabled={loading}>
        {loading ? "Sending…" : "Send OTP"}
      </button>
    </form>
  );
}
