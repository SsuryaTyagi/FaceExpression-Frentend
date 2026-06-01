import React, { useEffect, useRef, useState } from "react";
import { detectExpression, init } from "../utils/util";
import "../style/FaceExpression.css"

const EXPRESSION_META = {
  happy:     { emoji: "😄", label: "Happy",     color: "#fbbf24", bg: "rgba(251,191,36,0.12)"  },
  sad:       { emoji: "😢", label: "Sad",        color: "#60a5fa", bg: "rgba(96,165,250,0.12)"  },
  angry:     { emoji: "😠", label: "Angry",      color: "#f87171", bg: "rgba(248,113,113,0.12)" },
  surprised: { emoji: "😲", label: "Surprised",  color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
  fearful:   { emoji: "😨", label: "Fearful",    color: "#34d399", bg: "rgba(52,211,153,0.12)"  },
  disgusted: { emoji: "🤢", label: "Disgusted",  color: "#86efac", bg: "rgba(134,239,172,0.12)" },
  neutral:   { emoji: "😐", label: "Neutral",    color: "#94a3b8", bg: "rgba(148,163,184,0.12)" },
};

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);

  const [expression, setExpression] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    init({ landmarkerRef, videoRef });
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const handleClick = async () => {
    setScanning(true);
    setPulse(true);
    setTimeout(() => setPulse(false), 700);

    const detected = await detectExpression({ setExpression, videoRef, landmarkerRef });
    setScanning(false);
    onClick(detected);
  };

  const meta = EXPRESSION_META[expression?.toLowerCase?.()] ?? null;

  return (
    <div className="fe-root">
      {/* ── Video feed */}
      <div className={`fe-video-wrap ${pulse ? "fe-video-wrap--scan" : ""}`}>
        <video ref={videoRef} autoPlay playsInline className="fe-video" />

        {/* scan line animation */}
        {scanning && <div className="fe-scan-line" />}

        {/* corner brackets */}
        <span className="fe-corner fe-corner--tl" />
        <span className="fe-corner fe-corner--tr" />
        <span className="fe-corner fe-corner--bl" />
        <span className="fe-corner fe-corner--br" />
      </div>

      {/* ── Result chip */}
      <div className="fe-result" style={meta ? { background: meta.bg, borderColor: meta.color + "44" } : {}}>
        {meta ? (
          <>
            <span className="fe-result__emoji">{meta.emoji}</span>
            <span className="fe-result__label" style={{ color: meta.color }}>{meta.label}</span>
          </>
        ) : (
          <span className="fe-result__placeholder">
            {scanning ? "Scanning…" : "Point camera at your face"}
          </span>
        )}
      </div>

      {/* ── Detect button */}
      <button
        className={`fe-btn ${scanning ? "fe-btn--loading" : ""}`}
        onClick={handleClick}
        disabled={scanning}
        aria-label="Detect facial expression"
      >
        {scanning ? (
          <>
            <span className="fe-spinner" />
            Detecting…
          </>
        ) : (
          <>
            <svg className="fe-btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M2 12C2 12 5.5 5 12 5s10 7 10 7-3.5 7-10 7S2 12 2 12z" />
            </svg>
            Detect Expression
          </>
        )}
      </button>

    </div>
  );
}