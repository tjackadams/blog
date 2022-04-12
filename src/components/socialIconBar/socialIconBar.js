import { Location } from "@reach/router";
import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const SocialIconBar = ({ title }) => {
  return (
    <Location>
      {({ location }) => (
        <>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${location.href}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${location.href}&text=${title}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="twitter"
          >
            <FaTwitter />
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${location.href}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="linkedin"
          >
            <FaLinkedinIn />
          </a>
        </>
      )}
    </Location>
  );
};

export default SocialIconBar;
