import React from "react";
import FaceExpression from "../../Expression/components/FaceExpression";
import PlaySong from "../components/PlaySong";
import useSong from "../hooks/useSong";
import "../style/Home.css";

export default function Home() {
  const { handleGetSong, song } = useSong();

  return (
    <div className="home-container">
      <div className="home-overlay" />

      <div className="home-content">
        {/* ── Left Panel ── */}
        <div className="left-panel">
          <div className="hero-content">
            <div className="hero-badge">
              <span />
              AI Mood Detection
            </div>

            <h1>
              Music That
              <span className="accent"> Understands </span>
              Your Mood
            </h1>

            <p>
              Let your face do the talking — detect your expression
              and get music that matches how you actually feel.
            </p>
          </div>

          <div className="camera-card">
            <div className="camera-card-label">
              <i className="ti ti-camera" />
              Face Scan
            </div>
            <FaceExpression
              onClick={(expression) => handleGetSong(expression)}
            />
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="right-panel">
          <div className={`player-card ${song ? "has-song" : ""}`}>
            {song ? (
              <PlaySong />
            ) : (
              <div className="player-empty">
                <div className="player-empty-icon">
                  <i className="ti ti-music" />
                </div>
                <p>Scan your face to get a song that matches your vibe</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}