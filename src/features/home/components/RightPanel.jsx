import React from "react";
import {PlaySong} from "./PlaySong";

export default function RightPanel({ song }) {
  return (
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
    </section>
  );
}