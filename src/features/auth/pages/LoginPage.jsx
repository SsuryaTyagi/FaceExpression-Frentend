import React, { useState } from "react";
import Input from "../component/Input";
import "../../auth/Style/style.scss";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { user, loading, handleLogin } = useAuth();

  if (loading) {
    return <h1>Loading....</h1>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await handleLogin(email, password);
      console.log(data);
      navigate("/")
    } catch (error) {
      console.log(error);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          label="Email"
        />

        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label="Password"
        />

        <Button text="Login" type="submit" />
        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </form>
    </div>
  );
}
