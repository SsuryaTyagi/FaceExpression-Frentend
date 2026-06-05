import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../../auth/component/logoutButton";
import "../style/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="home-nav">
      {/* Logo */}
      <div className="nav-logo">
        <div className="nav-logo-mark" aria-hidden="true">
          <i className="ti ti-music" />
        </div>
        <span className="nav-logo-name">MoodTune</span>
      </div>

      {/* Center badge */}
      <div className="nav-badge" aria-label="AI is active">
        <div className="nav-badge-dot" aria-hidden="true" />
        AI active
      </div>

      {/* Right side actions */}
      <div className="nav-actions">
        <button
          className="nav-upload-btn"
          onClick={() => navigate("/")}
          aria-label="Go to home"
        >
          <i className="ti ti-home" aria-hidden="true" />
          <span>Home</span>
        </button>
        <button
          className="nav-upload-btn"
          onClick={() => navigate("/upload")}
          aria-label="Upload song"
        >
          <i className="ti ti-upload" aria-hidden="true" />
          <span>Upload Song</span>
        </button>

        <LogoutButton />
      </div>
    </nav>
  );
}
