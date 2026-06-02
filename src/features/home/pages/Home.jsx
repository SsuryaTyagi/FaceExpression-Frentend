import React from "react";
import FaceExpression from "../../Expression/components/FaceExpression";
import PlaySong from "../components/PlaySong";
import useSong from "../hooks/useSong";
import "../style/Home.css";
import LogoutButton from "../../auth/component/logoutButton";

export default function Home() {
  const { handleGetSong, song } = useSong();

  return (
    <div className="home-container">
      {/* Atmospheric background glow */}
      <div className="home-overlay" aria-hidden="true" />

      {/* ── NAV ── */}
      <nav className="home-nav">
        <div className="nav-logo">
          <div className="nav-logo-mark" aria-hidden="true">
            <i className="ti ti-music" />
          </div> 
          <span className="nav-logo-name">MoodTune</span>
        </div>

        <div className="nav-badge" aria-label="AI is active">
          <div className="nav-badge-dot" aria-hidden="true" />
          AI active
        </div>
         <LogoutButton />
      </nav>

      {/* ── MAIN GRID ── */}
      <main className="home-content">

        {/* ── LEFT PANEL ── */}
        <section className="left-panel" aria-label="Face scan">

          {/* Hero copy */}
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

          {/* Camera card */}
          <div className="camera-card">
            <div className="camera-card-label">
              <i className="ti ti-scan" aria-hidden="true" />
              Face Scan
            </div>

            {/* FaceExpression renders the video feed, scan UI, and detect button */}
            <FaceExpression
              onClick={(expression) => handleGetSong(expression)}
            />
          </div>

        </section>

        {/* ── RIGHT PANEL ── */}
        <section className="right-panel" aria-label="Music player">

          <div className="right-panel__header">
            <span className="right-panel__title">Now playing</span>
            {song && (
              <span className="right-panel__mood-tag">
                {song.moodEmoji} {song.mood}
              </span>
            )}
          </div>

          <div className={`player-card${song ? " has-song" : ""}`}>
            {song ? (
              <PlaySong />
            ) : (
              <div className="player-empty">
                <div className="player-empty-icon">
                  <i className="ti ti-player-play" aria-hidden="true" />
                </div>
                <p>Scan your face to get a song that matches your vibe</p>
              </div>
            )}
          </div>

          {/* Mood history chips — populated by useSong */}
          <MoodHistory song={song} />

        </section>

      </main>

      {/* ── FOOTER ── */}
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

/* ── Mood History ───────────────────────────────────────
   Keeps a rolling list of the last 5 detected moods.
   Purely local state — no prop drilling needed.
─────────────────────────────────────────────────────── */
function MoodHistory({ song }) {
  const [history, setHistory] = React.useState([]);

  React.useEffect(() => {
    if (!song) return;
    setHistory((prev) => {
      const next = [{ mood: song.mood, emoji: song.moodEmoji ?? "🎵" }, ...prev];
      return next.slice(0, 5);
    });
  }, [song]);

  if (!history.length) return null;

  return (
    <div className="mood-history" aria-label="Recent moods">
      <div className="mood-history__label">Recent moods</div>
      <div className="mood-history__row">
        {history.map((item, i) => (
          <div key={i} className={`mood-chip${i === 0 ? " mood-chip--new" : ""}`}>
            <span className="mood-chip__emoji" aria-hidden="true">{item.emoji}</span>
            {item.mood}
          </div>
        ))}
      </div>
    </div>
  );
}