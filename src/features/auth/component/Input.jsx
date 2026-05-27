import React from "react";
import "../../shared/input.scss";

export default function Input({ type, placeholder, value, onChange,label }) {
  return (
        <div className="input-group">
      <label>{label}</label>
      <input
      className="input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      />
    </div>
    );
}