import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";

export default function EmailLoginForm({ roleLabel }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Enter your password.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 700);
  }

  if (done) {
    return (
      <div className="auth-done">
        <div className="auth-done__icon">
          <Icon name="check-circle" size={30} />
        </div>
        <h2 className="h3">Credentials verified</h2>
        <p className="body-text mt-8">
          This is a product preview of the {roleLabel.toLowerCase()} login flow — no account was
          actually accessed, since there's no backend behind this site yet. In production this is
          where you'd land in your facility dashboard.
        </p>
        <Link to="/" className="btn btn-primary btn-block mt-24">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="auth-phone">
      <div className="field">
        <label>Work email</label>
        <input
          className="input"
          type="email"
          required
          placeholder="you@facility.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="hint">The email your credentials were sent to after verification.</span>
      </div>

      <div className="field">
        <label>Password</label>
        <input
          className="input"
          type="password"
          required
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <p className="auth-error">{error}</p>}

      <button className="btn btn-primary btn-block btn-lg mt-16" disabled={loading}>
        {loading ? "Logging in…" : "Log in"}
      </button>
    </form>
  );
}
