import React from "react";
import "../style/Home.css";
import useSong from "../hooks/useSong";
import Navbar from "../components/Navbar";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";

export default function Home() {
  const { handleGetSong, song } = useSong();

  return (
    <div className="home-container">
      <div className="home-overlay" aria-hidden="true" />

      <Navbar />

      <main className="home-content">
        <LeftPanel onDetect={handleGetSong} />
        <RightPanel song={song} />
      </main>

      <footer className="home-footer">
        <div className="footer-hint">
          <i className="ti ti-keyboard" aria-hidden="true" />
          Press <kbd className="kbd">Space</kbd> to scan
          &nbsp;·&nbsp;
          <kbd className="kbd">L</kbd> to like
        </div>
        <nav className="footer-links" aria-label="Footer links">
          <a href="/privacy">Privacy</a>
          <a href="/docs">Docs</a>
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </footer>
    </div>
  );
}