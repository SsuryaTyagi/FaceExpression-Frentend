import React, { useState } from "react";
import "../style/Upload.scss";
import useSong from "../hooks/useSong";

export default function SongUpload() {
  const [song, setSong] = useState(null);
  const [mood, setMood] = useState("");

  const { loading, handleSongUpload } = useSong();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Upload = await handleSongUpload(song, mood);
    console.log(Upload);
    setMood("")
  };

  return (
    <div className="upload-container">
      <form className="upload-card" onSubmit={handleSubmit}>
        <h2>Upload Song</h2>

        <div className="input-group">
          <label>Select Song</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setSong(e.target.files[0])}
          />
        </div>

        <div className="input-group">
          <label>Select Mood</label>
          <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}>
            <option value="">Choose mood</option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="normal">normal</option>
          </select>
        </div>

        <button type="submit">{loading ? "uploading..." : "upload"}</button>

        {/* {error && <p className="error">{error}</p>} */}
      </form>
    </div>
  );
}
