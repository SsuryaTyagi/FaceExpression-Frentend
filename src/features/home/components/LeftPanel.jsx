import React from "react";
import FaceExpression from "../../Expression/components/FaceExpression";

export default function LeftPanel({ onDetect }) {
  return (
    <section className="left-panel" aria-label="Face scan">
      <div className="hero-content">
        <div className="hero-badge">
          <span aria-hidden="true" />
          AI Mood Detection
        </div>
        <h1>
          Music that
          <span className="accent"> understands </span>
          your mood
        </h1>
        <p>
          Let your face do the talking — detect your expression
          and get music that matches how you actually feel.
        </p>
      </div>

      <div className="camera-card">
        <div className="camera-card-label">
          <i className="ti ti-scan" aria-hidden="true" />
          Face Scan
        </div>
        <FaceExpression onClick={(expression) => onDetect(expression)} />
      </div>
    </section>
  );
}