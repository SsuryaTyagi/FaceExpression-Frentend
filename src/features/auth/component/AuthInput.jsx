import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function AuthInput({ label, type = "text", placeholder, value, onChange }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="auth__field">
      <label>{label}</label>
      <div className="auth__field-wrap">
        <input
          className="auth__input"
          type={isPassword ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {isPassword && (
          <button type="button" className="auth__eye" onClick={() => setShow(p => !p)}>
            {show ? <AiOutlineEyeInvisible size={17} /> : <AiOutlineEye size={17} />}
          </button>
        )}
      </div>
    </div>
  );
}