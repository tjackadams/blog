import React from "react";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const SocialInfo = ({ color }) => {
  return (
    <div className="social-links">
      <a
        className="social-link"
        href="https://github.com/tjackadams"
        target="_blank"
        rel="noreferrer"
        title="GitHub Profile"
      >
        <FaGithub color={color} />
      </a>
      <a
        className="social-link"
        href="https://twitter.com/tjackadams"
        target="_blank"
        rel="noreferrer"
        title="Twitter Profile"
      >
        <FaTwitter color={color} />
      </a>
      <a
        className="social-link"
        href="https://www.linkedin.com/in/thomas-adams-84096a52/"
        target="_blank"
        rel="noreferrer"
        title="LinkedIn Profile"
      >
        <FaLinkedinIn color={color} />
      </a>
    </div>
  );
};

export default SocialInfo;
