import React from "react";
import { FcGoogle } from "react-icons/fc";
import { googleLoginURL } from "../services/auth.api";

export default function GoogleButton() {
  return (
    <button className="auth__social-btn"
      onClick={() => window.location.href = googleLoginURL}>
      <FcGoogle size={16} /> Google
    </button>
  );
}