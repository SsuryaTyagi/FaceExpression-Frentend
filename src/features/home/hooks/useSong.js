import React, { useContext } from "react";
import { HomeContext } from "../home.context";
import { getSong } from "../service/song.api";

export default function useSong() {
  const { song, loading, setSong, setLoading } = useContext(HomeContext);

  const handleGetSong = async (mood) => {
    setLoading(true);
    try {
          console.log("MOOD SENT TO API:", mood);
      const data = await getSong(mood);
      setSong(data.song);
      return data.song;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return{
    handleGetSong,
    song,
    loading
  } ;
}
