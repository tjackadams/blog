import React from "react";
import { Location } from "@reach/router";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const SocialIconBar = ({ title }) => {
  const currentUrl = Location.href;

  return (
    <Location>
      {({ location }) => (
        <>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=${title}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="twitter"
          >
            <FaTwitter />
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`}
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
