import React from "react";
import { FcGoogle } from "react-icons/fc";
import { googleLoginURL } from "../services/auth.api";
import "../Style/googleButton.css"
function GoogleLoginButton({
  text = "Continue with Google",
}) {
  return (
    <button
      type="button"
      className="google-btn"
      onClick={() => (window.location.href = googleLoginURL)}
    >
      <FcGoogle className="google-icon" />
      <span>{text}</span>
    </button>
  );
}

export default GoogleLoginButton;