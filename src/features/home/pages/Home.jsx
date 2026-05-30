import React from "react";
import FaceExpression from "../../Expression/components/FaceExpression";
import PlaySong from "../components/PlaySong";
import useSong from "../hooks/useSong";
import "../style/Home.css";

export default function Home() {
  const { handleGetSong } = useSong();

  return (
    <div className="home-container">
      <div className="home-overlay" />

      <div className="home-content">
        {/* Left Section */}
        <div className="left-panel">
          <div className="hero-content">
            <h1>
              Music That
              <span> Understands </span>
              Your Mood
            </h1>

            <p>
              Detect your facial expression and instantly
              get music that matches your mood.
            </p>
          </div>

          <div className="camera-card">
            <FaceExpression
              onClick={(expression) => {
                handleGetSong(expression);
              }}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="right-panel">
          <div className="player-card">
            <PlaySong />
          </div>
        </div>
      </div>
    </div>
  );
}