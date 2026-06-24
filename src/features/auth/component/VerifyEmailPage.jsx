import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyEmailPage() {
  const { token }   = useParams();
  const navigate    = useNavigate();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    axios.get(`face-expression-backend.vercel.app/verify-email/${token}`)
      .then(() => { setStatus("success"); setTimeout(() => navigate("/login"), 2000); })
      .catch((err) => setStatus(err.response?.data?.message || "Invalid link"));
  }, [token]);

  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      {status === "verifying" && <p>Verifying your email...</p>}
      {status === "success"   && <p>✅ Email verified! Redirecting to login...</p>}
      {status !== "verifying" && status !== "success" && <p>❌ {status}</p>}
    </div>
  );
}