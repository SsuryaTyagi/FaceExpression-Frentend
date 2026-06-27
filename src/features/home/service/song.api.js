import axios from "axios";

const api = axios.create({
  baseURL: "https://face-expression-backend.vercel.app",
  withCredentials: true,
});

export const getSong = async ( mood ) => {
  try {
    // console.log(mood);
    
    const res = await api.post("/getSong", { mood });
    // console.log(res.data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
