import React from "react";
import "../style/style.scss";
import AuthLeft from "../component/AuthLeft";
import AuthCard from "../component/AuthCard";

export default function LoginPage() {
  return (
    <div className="auth">
      {/* Nav */}
      <div className="auth__nav">
        <div className="auth__logo">
          <div className="auth__logo-mark">
            <i className="ti ti-music" aria-hidden="true" />
          </div>
          <span className="auth__logo-name">MoodTune</span>
        </div>
        <div className="auth__nav-badge">
          <div className="auth__nav-badge-dot" />
          AI powered
        </div>
      </div>

      {/* Grid */}
      <div className="auth__main">
        <AuthLeft />
        <AuthCard />
      </div>
    </div>
  );
}