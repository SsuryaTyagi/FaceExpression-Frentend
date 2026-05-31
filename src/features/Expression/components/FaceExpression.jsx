import React, { useEffect, useRef, useState } from "react";
import { detectExpression, init } from "../utils/util";

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

      {/* ── Styles */}
      <style>{`
        .fe-root {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          width: 100%;
          font-family: 'DM Sans', sans-serif;
        }

        /* VIDEO */
        .fe-video-wrap {
          position: relative;
          width: 100%;
          max-width: 420px;
          border-radius: 16px;
          overflow: hidden;
          border: 1.5px solid rgba(255,255,255,0.09);
          background: #0a0d18;
          aspect-ratio: 4/3;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .fe-video-wrap--scan {
          border-color: rgba(124,58,237,0.6);
          box-shadow: 0 0 24px rgba(124,58,237,0.25);
        }

        .fe-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 16px;
          transform: scaleX(-1); /* mirror */
        }

        /* SCAN LINE */
        .fe-scan-line {
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(167,139,250,0.8), transparent);
          animation: fe-scan 1.2s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes fe-scan {
          0%   { top: 10%; opacity: 1; }
          50%  { top: 90%; opacity: 0.7; }
          100% { top: 10%; opacity: 1; }
        }

        /* CORNER BRACKETS */
        .fe-corner {
          position: absolute;
          width: 18px; height: 18px;
          border-color: rgba(167,139,250,0.6);
          border-style: solid;
          pointer-events: none;
        }
        .fe-corner--tl { top: 10px; left: 10px;  border-width: 2px 0 0 2px; border-radius: 4px 0 0 0; }
        .fe-corner--tr { top: 10px; right: 10px; border-width: 2px 2px 0 0; border-radius: 0 4px 0 0; }
        .fe-corner--bl { bottom: 10px; left: 10px;  border-width: 0 0 2px 2px; border-radius: 0 0 0 4px; }
        .fe-corner--br { bottom: 10px; right: 10px; border-width: 0 2px 2px 0; border-radius: 0 0 4px 0; }

        /* RESULT CHIP */
        .fe-result {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          min-height: 44px;
          min-width: 180px;
          justify-content: center;
          transition: background 0.4s ease, border-color 0.4s ease;
        }

        .fe-result__emoji {
          font-size: 1.4rem;
          line-height: 1;
        }

        .fe-result__label {
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          font-family: 'Syne', sans-serif;
        }

        .fe-result__placeholder {
          font-size: 0.82rem;
          color: #64748b;
          font-weight: 400;
        }

        /* BUTTON */
        .fe-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          border-radius: 12px;
          background: #7c3aed;
          border: none;
          color: white;
          font-size: 0.9rem;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 20px rgba(124,58,237,0.35);
          letter-spacing: 0.01em;
          min-width: 180px;
          justify-content: center;
        }

        .fe-btn:hover:not(:disabled) {
          background: #6d28d9;
          box-shadow: 0 4px 28px rgba(124,58,237,0.55);
          transform: translateY(-1px);
        }

        .fe-btn:active:not(:disabled) {
          transform: scale(0.97);
        }

        .fe-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .fe-btn__icon {
          width: 17px; height: 17px;
          flex-shrink: 0;
        }

        /* SPINNER */
        .fe-spinner {
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: fe-spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes fe-spin {
          to { transform: rotate(360deg); }
        }

        /* RESPONSIVE */
        @media (max-width: 480px) {
          .fe-video-wrap { border-radius: 14px; }
          .fe-btn { width: 100%; max-width: 360px; padding: 13px 20px; }
          .fe-result { width: 100%; max-width: 360px; border-radius: 14px; justify-content: center; }
        }
      `}</style>
    </div>
  );
}