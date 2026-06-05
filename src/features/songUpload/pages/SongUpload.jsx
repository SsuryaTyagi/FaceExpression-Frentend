import React, { useState } from "react";
import "../style/Upload.scss";
import useSong from "../hooks/useSong";
import Navbar from "../../home/components/Navbar";

const MOODS = [
  { value: "happy",     label: "Happy",     icon: "ti-mood-smile" },
  { value: "sad",       label: "Sad",       icon: "ti-mood-sad" },
  { value: "normal",    label: "Normal",    icon: "ti-mood-neutral" },
  // { value: "angry",     label: "Angry",     icon: "ti-mood-angry" },
  // { value: "surprised", label: "Surprised", icon: "ti-mood-surprised" },
  // { value: "fearful",   label: "Fearful",   icon: "ti-mood-confuzed" },
];

export default function SongUpload() {
  const [song, setSong]   = useState(null);
  const [mood, setMood]   = useState("");
  const { loading, handleSongUpload } = useSong();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSongUpload(song, mood);
    setSong(null);
    setMood("");
  };

  return (
    <div className="upload-page">
      <Navbar />

      <div className="upload-wrap">
        <form className="upload-card" onSubmit={handleSubmit}>

          {/* Header */}
          <div className="upload-header">
            <div className="upload-icon">
              <i className="ti ti-music-plus" aria-hidden="true" />
            </div>
            <div>
              <h2>Upload song</h2>
              <p>Add a track to the mood library</p>
            </div>
          </div>

          {/* File drop zone */}
          <div className="input-group">
            <label>Audio file</label>
            <div className="file-zone">
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setSong(e.target.files[0])}
              />
              <i className="ti ti-cloud-upload" aria-hidden="true" />
              <p className="file-zone-text">Click to browse or drag &amp; drop</p>
              <p className="file-zone-hint">MP3, WAV, FLAC, AAC supported</p>
              {song && <p className="file-name">{song.name}</p>}
            </div>
          </div>

          {/* Mood chips */}
          <div className="input-group">
            <label>Select mood</label>
            <div className="mood-grid">
              {MOODS.map((m) => (
                <button
                  type="button"
                  key={m.value}
                  className={`mood-chip ${mood === m.value ? "active" : ""}`}
                  onClick={() => setMood(m.value)}
                >
                  <i className={`ti ${m.icon}`} aria-hidden="true" />
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="upload-divider" />

          <button
            type="submit"
            className="upload-btn"
            disabled={!song || !mood || loading}
          >
            <i className="ti ti-upload" aria-hidden="true" />
            {loading ? "Uploading..." : "Upload song"}
          </button>

        </form>
      </div>
    </div>
  );
}