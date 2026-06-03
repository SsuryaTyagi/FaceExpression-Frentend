import React from "react";
import { useContext } from "react";
import { authContext } from "../auth.context";
import { getMe, login, logout, register } from "../services/auth.api";
import { useEffect } from "react";

export default function useAuth() {
  const { user, loading, setUser, setLoading } = useContext(authContext);

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const res = await login(email, password);
      setUser(res);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const res = await register(username, email, password);
      setUser(res.data);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetMe = async () => {
    setLoading(true);
    try {
      const res = await getMe();
      setUser(res);
      return res;
    } catch (error) {
      setUser(null);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await logout();
      setUser(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      if (user) return; 

    setLoading(true);
    getMe()
      .then((res) => setUser(res))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);
  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleGetMe,
    handleLogout,
  };
}
