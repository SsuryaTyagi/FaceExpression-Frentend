import axios from "axios";

const api = axios.create({
  baseURL: "https://face-expression-backend.vercel.app",
  withCredentials: true,
});

export const register = async (username, email, password) => {
  try {
    const res = await api.post("/register", {
      username,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const login = async (email, password) => {
  try {
    const res = await api.post("/login", {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getMe = async () => {
  const res = await api.get("/getMe");
  return res.data;
};

export const logout = async () => {
  try {
    const res = await api.post("/logout");
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const googleLoginURL = `https://face-expression-backend.vercel.app/google`;

