import React from "react";
import { VscGithub } from "react-icons/vsc";

const githubLoginURL = `http://localhost:3000/github`;

export default function GithubButton() {
  return (
    <button className="auth__social-btn"
     onClick={() => window.location.href = githubLoginURL}
    >
      <VscGithub size={16} /> GitHub
    </button>
  );
}