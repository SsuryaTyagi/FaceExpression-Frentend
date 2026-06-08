import React from "react";
import { VscGithub } from "react-icons/vsc";

export default function GithubButton() {
  return (
    <button className="auth__social-btn">
      <VscGithub size={16} /> GitHub
    </button>
  );
}