import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import GoogleButton from "./GoogleLoginButton";
import GithubButton from "./GithubButton";
import AuthInput from "./AuthInput";

export default function AuthCard() {
  const [tab, setTab] = useState("login");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");

  const navigate = useNavigate();
  const { loading, handleLogin, handleRegister } = useAuth();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await handleLogin(loginEmail, loginPass);
    if (data) navigate("/");
    setLoginEmail("");
    setLoginPass("");
  };

  const onRegister = async (e) => {
    e.preventDefault();
    const data = await handleRegister(regName, regEmail, regPass);
    if (data) navigate("/");
    setRegName("");
    setRegEmail("");
    setRegPass("");
  };

  return (
    <div className="auth__card">
      {/* Tabs */}
      <div className="auth__tabs">
        {["login", "reg"].map((t) => (
          <button
            key={t}
            className={`auth__tab ${tab === t ? "auth__tab--active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t === "login" ? "Login" : "Register"}
          </button>
        ))}
      </div>

      {/* Login panel */}
      <div
        className={`auth__panel ${tab === "login" ? "auth__panel--show" : ""}`}
      >
        <div className="auth__social">
          <GoogleButton />
          <GithubButton />
        </div>
        <div className="auth__divider">
          <span>or continue with email</span>
        </div>
        <form onSubmit={onLogin}>
          <AuthInput
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <AuthInput
            label="Password"
            type="password"
            placeholder="••••••••"
            value={loginPass}
            onChange={(e) => setLoginPass(e.target.value)}
          />
          <button className="auth__submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="auth__footer-text">
          No account? <span onClick={() => setTab("reg")}>Register free</span>
        </p>
      </div>

      {/* Register panel */}
      <div
        className={`auth__panel ${tab === "reg" ? "auth__panel--show" : ""}`}
      >
        <div className="auth__social">
          <GoogleButton />
          <GithubButton />
        </div>
        <div className="auth__divider">
          <span>or continue with email</span>
        </div>
        <form onSubmit={onRegister}>
          <AuthInput
            label="Username"
            type="text"
            placeholder="yourname"
            value={regName}
            onChange={(e) => setRegName(e.target.value)}
          />
          <AuthInput
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
          />
          <AuthInput
            label="Password"
            type="password"
            placeholder="••••••••"
            value={regPass}
            onChange={(e) => setRegPass(e.target.value)}
          />
          <button className="auth__submit" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>
        <p className="auth__footer-text">
          Have an account? <span onClick={() => setTab("login")}>Login</span>
        </p>
      </div>
    </div>
  );
}
