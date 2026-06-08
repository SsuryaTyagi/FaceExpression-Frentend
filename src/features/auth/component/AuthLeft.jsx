import React from "react";

const FEATURES = [
  { icon: "ti-scan",  title: "Real-time face scan",     sub: "Detects your mood in seconds using your camera" },
  { icon: "ti-music", title: "Mood-matched songs",      sub: "Curated tracks for every emotional state" },
  { icon: "ti-brain", title: "AI that understands you", sub: "Gets smarter with every listen" },
];

export default function AuthLeft() {
  return (
    <div>
      <div className="auth__badge">
        <i className="ti ti-sparkles" aria-hidden="true" />
        Face expression AI
      </div>
      <h1 className="auth__heading">
        Music that matches your <span>mood</span>
      </h1>
      <p className="auth__desc">
        MoodTune scans your face expression in real time and plays songs
        that perfectly match how you feel — happy, sad, calm, or anything
        in between.
      </p>
      <div className="auth__features">
        {FEATURES.map((f) => (
          <div className="auth__feat" key={f.title}>
            <div className="auth__feat-icon">
              <i className={`ti ${f.icon}`} aria-hidden="true" />
            </div>
            <div>
              <p className="auth__feat-title">{f.title}</p>
              <span className="auth__feat-sub">{f.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}