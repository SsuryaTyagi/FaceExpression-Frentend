import React, { useRef, useState } from "react";
import useSong from "../hooks/useSong";
import "../style/PlaySong.scss";
import { FaHeart, FaPause, FaPlay } from "react-icons/fa";
import { MdDevices } from "react-icons/md";

export default function PlaySong() {
  const { song } = useSong();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();

    setIsPlaying(!isPlaying);
  };

  if (!song) return null;

  return (
    <div className="spotify-player">
      <audio ref={audioRef} src={song.url} />

      {/* LEFT */}
      <div className="spotify-player__left">
        <img src={song.posterUrl} alt="cover" />
        <div className="info">
          <h4>{song.title}</h4>
          <p>{song.mood}</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="spotify-player__right">
        <MdDevices className="icon" />
        <FaHeart className="icon heart" />
        <button onClick={togglePlay} className="play-btn">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>
    </div>
  );
}