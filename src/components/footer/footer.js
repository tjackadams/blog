import React from "react";
import config from "../../../data/SiteConfig";

const Footer = () => {
  return (
    <footer className="footer footer-context">
      <div className="footer-base">
        <nav>
          <ul className="footer-links">
            <li>
              &copy;
              <a href="https://blog.itadams.co.uk">{config.userName}</a>{" "}
              {new Date().getFullYear()}
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
