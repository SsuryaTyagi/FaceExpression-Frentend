import React, { useContext } from "react";
import { SongContext } from "../song.context";
import { UploadSong } from "../service/UploadSong";

export default function useSong() {
  const { song, loading, setLoading, setSong } = useContext(SongContext);

  const handleSongUpload = async(song, mood)=>{
    try {
        setLoading(true)
        const data = await UploadSong(song, mood)
        setSong(data)
        return data
    } catch (error) {
        console.log(error)    
    }finally{
        setLoading(false)
    }
  }
  return {handleSongUpload,song,loading}
}
