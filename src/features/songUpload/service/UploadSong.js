import axios from "axios";

const api = axios.create({
  baseURL: "face-expression-backend.vercel.app",
  withCredentials: true,
});

export const UploadSong = async (song, mood) => {
  try {
    const form = new FormData();
    form.append("song", song);
    form.append("mood", mood);

    const res = await api.post("/song", form);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
