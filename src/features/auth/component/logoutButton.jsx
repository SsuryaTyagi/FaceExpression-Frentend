import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/LogoutButton.css";
import useAuth from "../hooks/useAuth";

export default function LogoutButton() {
  const navigate = useNavigate();

  const { user, loading, handleLogout } = useAuth();

  if (loading) {
    return <h1>Loading....</h1>;
  }

  const onLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <button
      className={`logout-btn ${loading ? "logout-btn--loading" : ""}`}
      onClick={handleLogout}
      disabled={loading}
      aria-label="Logout"
    >
      {loading ? (
        <span className="logout-spinner" />
      ) : (
        <>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="16 17 21 12 16 7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="21"
              y1="12"
              x2="9"
              y2="12"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <span>Logout</span>
        </>
      )}
    </button>
  );
}
