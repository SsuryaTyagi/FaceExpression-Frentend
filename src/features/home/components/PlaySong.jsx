import React, { useRef, useState, useEffect } from "react";
import useSong from "../hooks/useSong";
import "../style/PlaySong.css";   // <-- CSS not SCSS

// Simple inline SVG icons
const IconPlay = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M8 5.14v14l11-7-11-7z" />
  </svg>
);

const IconPause = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const IconHeart = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"}
    stroke="currentColor" strokeWidth="1.8" width="16" height="16">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const IconShuffle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <polyline points="16 3 21 3 21 8" />
    <line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21 16 21 21 16 21" />
    <line x1="15" y1="15" x2="21" y2="21" />
  </svg>
);

const IconSkipBack = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <polygon points="19 20 9 12 19 4 19 20" />
    <rect x="4" y="5" width="2" height="14" rx="1" />
  </svg>
);

const IconSkipForward = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <polygon points="5 4 15 12 5 20 5 4" />
    <rect x="18" y="5" width="2" height="14" rx="1" />
  </svg>
);

const IconRepeat = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
);

const IconVolume = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

function fmt(s) {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function PlaySong() {
  const { song } = useSong();
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked]         = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]   = useState(0);
  const [volume, setVolume]       = useState(80);

  // Auto-play on new song
  useEffect(() => {
    if (!song || !audioRef.current) return;
    setCurrentTime(0);
    setDuration(0);
    audioRef.current.load();
    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [song?.url]);

  // Volume sync
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audioRef.current.currentTime = ratio * duration;
  };

  if (!song) return null;

  const progress = duration ? (currentTime / duration) * 100 : 0;

 return (
    <div className="spotify-player">
      <audio
        ref={audioRef}
        src={song.url}
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* ── FULL IMAGE ── */}
      <div className="spotify-player__art">
        {song.posterUrl ? (
          <img src={song.posterUrl} alt={song.title} />
        ) : (
          <div className="spotify-player__art--no-image">
            <div className="spotify-player__waveform">
              {[...Array(18)].map((_, i) => (
                <div key={i} className="spotify-player__waveform-bar"
                  style={{ height: `${20 + Math.random() * 28}px`, animationDelay: `${i * 0.07}s` }} />
              ))}
            </div>
          </div>
        )}
        <div className="spotify-player__now-badge">
          <div className="spotify-player__now-dot" />
          Now playing
        </div>
      </div>

      {/* ── META ROW ── */}
      <div className="spotify-player__meta">
        <div className="spotify-player__info">
          <h4>{song.title}</h4>
          <p>{song.mood}</p>
        </div>
        <button
          className={`spotify-player__heart${liked ? " liked" : ""}`}
          onClick={() => setLiked(v => !v)}
          aria-label={liked ? "Unlike" : "Like"}
        >
          <IconHeart filled={liked} />
        </button>
      </div>

      {/* ── PROGRESS ── */}
      <div className="spotify-player__progress">
        <span>{fmt(currentTime)}</span>
        <div className="spotify-player__bar" onClick={handleSeek}
          role="slider" aria-label="Seek" aria-valuenow={Math.round(progress)}>
          <div className="spotify-player__bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <span>{fmt(duration)}</span>
      </div>

      {/* ── CONTROLS ── */}
      <div className="spotify-player__controls">
        <button className="spotify-player__icon-btn" aria-label="Shuffle"><IconShuffle /></button>
        <button className="spotify-player__icon-btn" aria-label="Previous"><IconSkipBack /></button>
        <button className="spotify-player__play-btn" onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <IconPause /> : <IconPlay />}
        </button>
        <button className="spotify-player__icon-btn" aria-label="Next"><IconSkipForward /></button>
        <button className="spotify-player__icon-btn" aria-label="Repeat"><IconRepeat /></button>
      </div>

      {/* ── VOLUME ── */}
      <div className="spotify-player__footer">
        <div className="vol-icon"><IconVolume /></div>
        <input type="range" min="0" max="100" step="1" value={volume}
          onChange={(e) => setVolume(Number(e.target.value))} aria-label="Volume" />
      </div>
    </div>
  );
}