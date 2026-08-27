import { useEffect, useState } from "react";
import Icon from "./Icon.jsx";
import "./OnboardingTracker.css";

/**
 * OnboardingTracker
 * ------------------------------------------------------------------
 * A live 3-step tracker for post-submit onboarding.
 * Auto-advances so the waiting screen feels transparent, not dead.
 *
 * Props:
 *  - steps: [{ icon, title, done, doing }]
 *  - stepDurations: [ms, ms, ms] — how long each step "stays doing"
 *    before advancing. Last step never advances (terminal).
 */
export default function OnboardingTracker({
  steps,
  stepDurations = [1200, 3200, 0],
  onComplete,
}) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (phase >= steps.length - 1) {
      onComplete?.();
      return undefined;
    }
    const d = stepDurations[phase] ?? 2000;
    const t = setTimeout(() => setPhase((p) => Math.min(steps.length - 1, p + 1)), d);
    return () => clearTimeout(t);
  }, [phase, steps.length, stepDurations, onComplete]);

  const progress = (phase / (steps.length - 1)) * 100;

  return (
    <div className="ob" role="status" aria-live="polite">
      <div className="ob__rail" aria-hidden="true">
        <div className="ob__rail-fill" style={{ height: `${progress}%` }} />
      </div>

      {steps.map((s, i) => {
        const isDone = i < phase;
        const isDoing = i === phase;
        const state = isDone ? "done" : isDoing ? "doing" : "pending";
        return (
          <div className={`ob__step is-${state}`} key={s.title}>
            <div className="ob__node">
              {isDone && <Icon name="check" size={16} strokeWidth={2.6} />}
              {isDoing && (
                <span className="ob__spinner" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              )}
              {!isDone && !isDoing && <Icon name={s.icon} size={16} />}
            </div>

            <div className="ob__body">
              <div className="ob__title-row">
                <span className="ob__title">{s.title}</span>
                <span className={`ob__pill ob__pill--${state}`}>
                  {isDone && (<><Icon name="check" size={10} strokeWidth={2.4} /> Done</>)}
                  {isDoing && (<><span className="ob__pill-dot" /> Running</>)}
                  {!isDone && !isDoing && (<>Queued</>)}
                </span>
              </div>
              <p className="ob__desc">{s.desc}</p>
              {isDoing && s.doingHint && <p className="ob__hint">{s.doingHint}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
